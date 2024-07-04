const promoModel = require("../models/promoModel");
const studentModel = require("../models/studdentModel")
const schoolModel = require("../models/schoolModel")
exports.createStudent = async(req,res)=>{
    try {
        const student = new studentModel(req.body);
        await student.validate();
        await student.save();
        await promoModel.updateOne({ _id: req.params.promoId }, { $push: { students: student._id } });
        res.status(201).json({ message: 'Created with success' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json(error);
        } else {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

exports.updateStuddent = async (req, res) => {
    try {
        const existingPromo = await schoolModel.findOne({ _id: req.school, promos: { $in: [req.params.promoId] } });
        const existingStuddent = await promoModel.findOne({ _id: req.params.promoId, students: { $in: [req.params.studdentId] } });
        if (!existingPromo || !existingStuddent) {
            res.status(404).json({ message: "Cette ressource n'appartiens pas a votre école" });
        } else {
            const result = await studentModel.updateOne({ _id: req.params.studdentId }, { $set: req.body });
            if (result.modifiedCount > 0) {
                res.status(200).json({ message: 'Updated with success' });
            } else {
                res.status(404).json({ message: "Can't Update" });
            }
        }
    } catch (error) {
        res.status(500).send(error.message || 'Internal Server Error');
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const existingPromo = await schoolModel.findOne({ _id: req.school, promos: { $in: [req.params.promoId] } });
        const existingStuddent = await promoModel.findOne({ _id: req.params.promoId, students: { $in: [req.params.studdentId] } });
        if (!existingPromo || !existingStuddent) {
            res.status(404).json({ message: "Cette ressource n'appartiens pas a votre école" });
        } else {
            const result = await studentModel.deleteOne({ _id: req.params.studdentId })
            await promoModel.updateOne({ _id: req.params.promoId }, { $pull: { students: req.params.studdentId } });

            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'deleted with success' });
            } else {
                res.status(404).json({ message: "Can't Delete" });
            }
        }
    } catch (error) {
        res.status(500).send(error.message || 'Internal Server Error');
    }
};