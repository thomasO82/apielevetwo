const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../../server.js');
const schoolModel = require('../../../models/schoolModel');
const mailer = require('../../../helper/mailer');
const helperCrypto = require('../../../helper/uid');
const { v4: uuidv4 } = require('uuid');

/**
 * Tests d'intégration pour le contrôleur School
 * Ces tests vérifient le bon fonctionnement des routes et leur interaction avec la base de données
 */

// Mock du service d'envoi d'emails pour éviter l'envoi réel pendant les tests
jest.mock('../../../helper/mailer');

describe('School Controller - Tests d\'Intégration', () => {
    // Variables globales pour les tests
    let mongoServer; // Instance de la base de données en mémoire
    let testSchool; // École de test créée pour les tests
    let testApiKey; // Clé API pour l'authentification

    // Configuration initiale avant tous les tests
    beforeAll(async () => {
        try {
            // Déconnexion de toute instance MongoDB existante
            await mongoose.disconnect();
            
            // Création d'une nouvelle instance MongoDB en mémoire pour les tests
            mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();
            
            // Connexion à la base de données de test
            await mongoose.connect(mongoUri);

            // Configuration du mock du mailer pour simuler l'envoi d'emails
            mailer.sendMail.mockResolvedValue({ messageId: 'test-message-id' });
        } catch (error) {
            console.error('Erreur lors de l\'initialisation des tests:', error);
            // Nettoyage en cas d'erreur
            if (mongoServer) {
                await mongoServer.stop();
            }
            throw error;
        }
    });

    // Nettoyage final après tous les tests
    afterAll(async () => {
        try {
            // Suppression de toutes les collections de la base de données
            if (mongoose.connection.readyState !== 0) {
                const collections = await mongoose.connection.db.collections();
                for (let collection of collections) {
                    await collection.deleteMany({});
                }
                await mongoose.disconnect();
            }
            
            // Arrêt forcé du serveur MongoDB en mémoire
            if (mongoServer) {
                await mongoServer.stop({ force: true });
            }
        } catch (error) {
            console.error('Erreur lors du nettoyage final:', error);
            throw error;
        }
    });

    // Nettoyage de la base de données après chaque test
    afterEach(async () => {
        try {
            await schoolModel.deleteMany({});
        } catch (error) {
            console.error('Erreur lors du nettoyage après test:', error);
            throw error;
        }
    });

    /**
     * Tests pour la route POST /schools
     * Vérifie la création d'une nouvelle école
     */
    describe('POST /schools - Création d\'une école', () => {
        // Données valides pour la création d'une école
        const validSchoolData = {
            name: 'École Test',
            email: 'test@ecole.fr',
            password: 'password123',
            confirmPassword: 'password123'
        };

        // Test de création avec des données valides
        it('devrait créer une nouvelle école avec des données valides', async () => {
            const response = await request(app)
                .post('/schools')
                .send(validSchoolData)
                .expect(201); // Vérifie le code de statut 201 (Created)

            // Vérifie que la réponse contient le message de succès
            expect(response.body).toHaveProperty('message', 'Created with success');

            // Vérifie que l'école a bien été créée en base de données
            const school = await schoolModel.findOne({ email: validSchoolData.email });
            expect(school).toBeTruthy();
            expect(school.name).toBe(validSchoolData.name);
            
            // Vérifie que l'email de confirmation a été envoyé
            expect(mailer.sendMail).toHaveBeenCalled();
        });

        // Test de validation de l'email
        it('devrait rejeter une création avec un email invalide', async () => {
            const invalidData = {
                ...validSchoolData,
                email: 'invalid-email'
            };

            const response = await request(app)
                .post('/schools')
                .send(invalidData)
                .expect(400); // Vérifie le code de statut 400 (Bad Request)

            // Vérifie que l'erreur concerne l'email
            expect(response.body).toHaveProperty('errors.email');
        });

        // Test de validation du mot de passe
        it('devrait rejeter une création avec un mot de passe non conforme', async () => {
            const invalidData = {
                ...validSchoolData,
                password: 'short',
                confirmPassword: 'short'
            };

            const response = await request(app)
                .post('/schools')
                .send(invalidData)
                .expect(400); // Vérifie le code de statut 400 (Bad Request)

            // Vérifie que l'erreur concerne le mot de passe
            expect(response.body).toHaveProperty('errors.password');
        });
    });

    /**
     * Tests pour la route PATCH /schools
     * Vérifie la modification des informations d'une école
     */
    describe('PATCH /schools - Modification d\'une école', () => {
        // Création d'une école de test avant chaque test
        beforeEach(async () => {
            testApiKey = uuidv4();
            testSchool = await schoolModel.create({
                name: 'École Initiale',
                email: 'test@ecole.fr',
                password: 'password123',
                confirmPassword: 'password123',
                encryptedApiKey: testApiKey
            });
        });

        // Test de modification avec authentification valide
        it('devrait modifier le nom d\'une école avec succès', async () => {
            const newName = 'École Modifiée';
            
            const response = await request(app)
                .patch('/schools')
                .set('Authorization', `Bearer ${testSchool.encryptedApiKey}`) // Ajout du token d'authentification
                .send({ name: newName })
                .expect(200); // Vérifie le code de statut 200 (OK)

            expect(response.body).toBe('la modification a reussie');

            // Vérifie que le nom a bien été modifié en base de données
            const updatedSchool = await schoolModel.findById(testSchool._id);
            expect(updatedSchool.name).toBe(newName);
        });

        // Test de modification sans authentification
        it('devrait rejeter la modification sans authentification', async () => {
            await request(app)
                .patch('/schools')
                .send({ name: 'Nouvelle École' })
                .expect(401); // Vérifie le code de statut 401 (Unauthorized)
        });
    });

    /**
     * Tests pour la route GET /schools/me
     * Vérifie la récupération des informations d'une école
     */
    describe('GET /schools/me - Récupération des informations d\'une école', () => {
        // Création d'une école de test avant chaque test
        beforeEach(async () => {
            testApiKey = uuidv4();
            testSchool = await schoolModel.create({
                name: 'École Test',
                email: 'test@ecole.fr',
                password: 'password123',
                confirmPassword: 'password123',
                encryptedApiKey: testApiKey
            });
        });

        // Test de récupération avec authentification valide
        it('devrait récupérer les informations de l\'école connectée', async () => {
            const response = await request(app)
                .get('/schools/me')
                .set('Authorization', `Bearer ${testSchool.encryptedApiKey}`) // Ajout du token d'authentification
                .expect(200); // Vérifie le code de statut 200 (OK)

            // Vérifie que les informations retournées sont correctes
            expect(response.body).toHaveProperty('name', 'École Test');
            expect(response.body).toHaveProperty('email', 'test@ecole.fr');
            // Vérifie que le mot de passe n'est pas retourné
            expect(response.body).not.toHaveProperty('password');
        });

        // Test de récupération sans authentification
        it('devrait rejeter la requête sans authentification', async () => {
            await request(app)
                .get('/schools/me')
                .expect(401); // Vérifie le code de statut 401 (Unauthorized)
        });
    });
}); 