const promoModel = require('../models/promoModel');
const schoolModel = require('../models/schoolModel');

exports.getPromos = async (req, res) => {
    try {
        const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
        const school = await schoolModel.findById(req.school).populate({
            path: 'promos',
            match: filter,
        });
        res.status(200).json(school.promos)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getOnePromo = async (req, res) => {
    try {
        const existingPromo = await schoolModel.findOne({ _id: req.school, promos: { $in: [req.params.id] } });
        if (!existingPromo) {
            res.status(404).json({ message: "Cette ressource n'appartiens pas a votre école" });
        } else {
            const promo = await promoModel.findById(req.params.id).populate('students')
            res.status(200).json(promo)
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.postPromo = async (req, res) => {
    try {
        const promo = new promoModel(req.body);
        await promo.validate();
        await promo.save();
        await schoolModel.updateOne({ _id: req.school }, { $push: { promos: promo._id } });
        res.status(201).json({ message: 'Created with success', data : promo });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json(error);
        } else {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
};

exports.updatePromo = async (req, res) => {
    try {
        const existingPromo = await schoolModel.findOne({ _id: req.school, promos: { $in: [req.params.id] } });
        if (!existingPromo) {
            res.status(404).json({ message: "Cette ressource n'appartiens pas a votre école" });
        } else {
            const result = await promoModel.findByIdAndUpdate(req.params.id, { $set: req.body },{runValidators:true, new:true});
            if (result) {
                res.status(200).json({ message: 'Updated with success' , data: result });
            } else {
                res.status(404).json({ message: "Can't Update" });
            }
        }
    } catch (error) {
        res.status(500).send(error.message || 'Internal Server Error');
    }
};

exports.deletePromo = async (req, res) => {
    try {
        const existingPromo = await schoolModel.findOne({ _id: req.school, promos: { $in: [req.params.id] } });
        if (!existingPromo) {
            res.status(404).json({ message: "Cette ressource n'appartiens pas a votre école" });
        } else {
            const result = await promoModel.deleteOne({ _id: req.params.id })
            await schoolModel.updateOne({ _id: req.school }, { $pull: { promos: req.params.id } });

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
