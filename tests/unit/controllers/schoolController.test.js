const schoolController = require('../../../controllers/schoolController');
const schoolModel = require('../../../models/schoolModel');
const mailer = require('../../../helper/mailer');

// Mock des dépendances
jest.mock('../../../models/schoolModel');
jest.mock('../../../helper/mailer');

describe('School Controller - Tests Unitaires', () => {
    // Variables pour les mocks
    let mockReq;
    let mockRes;

    beforeEach(() => {
        // Réinitialisation des mocks
        jest.clearAllMocks();
        
        // Mock de l'objet response
        mockRes = {
            // status() retourne l'objet mockRes lui-même (this) pour permettre d'écrire res.status(200).json()
            // comme on le fait avec Express. Sans cela, on ne pourrait pas enchaîner les méthodes
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        // Mock de l'objet request
        mockReq = {
            body: {},
            school: 'mockSchoolId'
        };
    });

    describe('createSchool', () => {
        const mockSchoolData = {
            email: 'test@test.com',
            encryptedApiKey: 'mockApiKey',
            validate: jest.fn(),
            save: jest.fn()
        };

        beforeEach(() => {
            schoolModel.mockImplementation(() => mockSchoolData);
        });

        it('devrait créer une école avec succès', async () => {
            mockReq.body = { email: 'test@test.com' };

            await schoolController.createSchool(mockReq, mockRes);

            expect(mockSchoolData.validate).toHaveBeenCalled();
            expect(mockSchoolData.save).toHaveBeenCalled();
            expect(mailer.sendMail).toHaveBeenCalledWith({
                from: process.env.LOG_MAILER,
                to: 'test@test.com',
                subject: "Votre clef d'api",
                html: expect.stringContaining('mockApiKey')
            });
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Created with success' });
        });

        it('devrait gérer les erreurs de validation', async () => {
            const validationError = new Error('Validation error');
            validationError.name = 'ValidationError';
            mockSchoolData.validate.mockRejectedValue(validationError);

            await schoolController.createSchool(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(validationError);
        });

        it('devrait gérer les erreurs serveur', async () => {
            const serverError = new Error('Server error');
            mockSchoolData.validate.mockRejectedValue(serverError);

            await schoolController.createSchool(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(serverError);
        });
    });

    describe('patchSchool', () => {
        beforeEach(() => {
            schoolModel.updateOne = jest.fn();
        });

        it('devrait mettre à jour une école avec succès', async () => {
            mockReq.body = { name: 'Nouvelle École' };
            schoolModel.updateOne.mockResolvedValue({ modifiedCount: 1 });

            await schoolController.patchSchool(mockReq, mockRes);

            expect(schoolModel.updateOne).toHaveBeenCalledWith(
                { _id: 'mockSchoolId' },
                { name: 'Nouvelle École' }
            );
            expect(mockRes.json).toHaveBeenCalledWith('la modification a reussie');
        });

        it('devrait gérer l\'échec de la mise à jour', async () => {
            mockReq.body = { name: 'Nouvelle École' };
            schoolModel.updateOne.mockResolvedValue({ modifiedCount: 0 });

            await schoolController.patchSchool(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('getMe', () => {
        it('devrait récupérer les informations de l\'école avec succès', async () => {
            const mockSchool = { name: 'Mon École' };
            schoolModel.findOne.mockResolvedValue(mockSchool);

            await schoolController.getMe(mockReq, mockRes);

            expect(schoolModel.findOne).toHaveBeenCalledWith({ _id: 'mockSchoolId' });
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockSchool);
        });

        it('devrait gérer les erreurs lors de la récupération', async () => {
            const error = new Error('Erreur de récupération');
            schoolModel.findOne.mockRejectedValue(error);

            await schoolController.getMe(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(error);
        });
    });
}); 