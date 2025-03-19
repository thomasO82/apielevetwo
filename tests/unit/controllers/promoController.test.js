const promoController = require('../../../controllers/promoController');
const promoModel = require('../../../models/promoModel');
const schoolModel = require('../../../models/schoolModel');

// Mock des dépendances
jest.mock('../../../models/promoModel');
jest.mock('../../../models/schoolModel');

describe('Promo Controller - Tests Unitaires', () => {
    let mockReq;
    let mockRes;

    beforeEach(() => {
        jest.clearAllMocks();

        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };

        mockReq = {
            body: {},
            school: 'mockSchoolId',
        };
    });

    describe('postPromo', () => {
        const mockPromoData = {
            name: 'Promo 2023',
            startDate: '2024-01-15',
            endDate: '2024-12-15',
            formationDescription: 'Développeur web et web mobile',
            validate: jest.fn(),
            save: jest.fn(),
        };

        beforeEach(() => {
            promoModel.mockImplementation(() => mockPromoData);
        });

        it('devrait créer une promo avec succès', async () => {
            mockReq.body = {
                name: 'Promo 2023',
                startDate: '2024-01-15',
                endDate: '2024-12-15',
                formationDescription: 'Développeur web et web mobile',
            };

            schoolModel.updateOne.mockResolvedValue({ modifiedCount: 1 });

            mockPromoData.save.mockImplementationOnce(() => {
                mockPromoData._id = 'mockPromoId'; // Ajout d'un ID simulé
                return Promise.resolve();
            });

            await promoController.postPromo(mockReq, mockRes);

            expect(mockPromoData.validate).toHaveBeenCalled();
            expect(mockPromoData.save).toHaveBeenCalled();
            expect(schoolModel.updateOne).toHaveBeenCalledWith(
                { _id: 'mockSchoolId' },
                { $push: { promos: 'mockPromoId' } } // Vérification avec l'ID simulé
            );
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Created with success',
                data: mockPromoData,
            });
        });

        it('devrait gérer les erreurs de validation', async () => {
            const validationError = new Error('Validation error');
            validationError.name = 'ValidationError';
            mockPromoData.validate.mockRejectedValue(validationError);

            await promoController.postPromo(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(validationError);
        });

        it('devrait gérer les erreurs serveur', async () => {
            const serverError = new Error('Server error');
            mockPromoData.validate.mockRejectedValue(serverError); // Simule une erreur lors de la validation

            await promoController.postPromo(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500); // Vérifie que le statut 500 est renvoyé
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Server error' }); // Vérifie que l'erreur est renvoyée sous forme d'objet
        });
    });
});
