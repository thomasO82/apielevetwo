const { json } = require("express")
const schoolController = require("../../controllers/schoolController")
const mailer = require('../../helper/mailer')
const schoolModel = require('../../models/schoolModel')

jest.mock('../../models/schoolModel.js')
jest.mock('../../helper/mailer.js')

describe('School controller tests unitaires', ()=>{
    let mockReq
    let mockRes

    beforeEach(()=>{
        mockReq = {
            body: {},
            school : "mock school id"
        }
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    })
    describe('create school', ()=>{
        const mockSchoolData = {
            email: 'coucou@live.fr',
            encryptedApiKey: 'monapikey',
            validate: jest.fn(),
            save: jest.fn()
        }

        beforeEach(()=>{
            schoolModel.mockImplementation(()=> mockSchoolData)
        })
        it('devrait creer une ecole sans erreur', async ()=>{
            mockReq.body = {email: 'lala@live.fr'}
            await schoolController.createSchool(mockReq, mockRes)
            expect(mockSchoolData.validate).toHaveBeenCalled()
            expect(mockSchoolData.save).toHaveBeenCalled()
            expect(mailer.sendMail).toHaveBeenCalledWith({
                from: process.env.LOG_MAILER,
                to: mockSchoolData.email,
                subject: "Votre clef d'api",
                 html: `Bonjour, Voici votre clef secrete a utiliser pour vous connecter a mon api : ${mockSchoolData.encryptedApiKey}`
            })
            expect(mockRes.status).toHaveBeenCalledWith(201)
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Created with success' })
        })
        it('devrait gerer les erreur de validation', async ()=>{
            const validationError = new Error('validation error')
            validationError.name = 'ValidationError';
            mockSchoolData.validate.mockRejectedValue(validationError)

            await schoolController.createSchool(mockReq, mockRes)
            expect(mockRes.status).toHaveBeenCalledWith(400)
            expect(mockRes.json).toHaveBeenCalledWith(validationError)
        })
        it('devrait gerer les erreurs serveurs', async()=>{
            const serverError = new Error("server error")
            mockSchoolData.validate.mockRejectedValue(serverError)
            await schoolController.createSchool(mockReq, mockRes)
            expect(mockRes.status).toHaveBeenCalledWith(500)
            expect(mockRes.json).toHaveBeenCalledWith(serverError)
        }) 

    })

    describe('patch school' , ()=>{
        beforeEach(()=>{
            schoolModel.updateOne = jest.fn()
    
        })

        it("devrait modifier ecole", async ()=>{
            mockReq.body = {name: "blabla"}
            schoolModel.updateOne.mockResolvedValue({modifiedCount : 1})

            await schoolController.patchSchool(mockReq,mockRes)
            expect(mockRes.json).toHaveBeenCalledWith("la modification a reussie")
        })
        
    })

   
})







