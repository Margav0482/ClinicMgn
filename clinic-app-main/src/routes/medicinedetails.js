const express = require('express');
const router = express.Router();
const masterAuth = require('../middleware/masterAuth');

const Medicines = require('../models/Medicines');

// create new medicine
router.post('/newMedicine', masterAuth, async (req, res) => {
    const body = req.body;
    try {
        await Medicines.findOne({ medicine_name: req.body.medicine_name }).then((medicine) => {
            if (medicine) {
                return res.status(400).send({ message: "Medicine Already Exists" });
            }
            const newMedicine = new Medicines(body);
            newMedicine.save().then((medicine) => res.status(201).send(newMedicine)).catch((error) => res.status(400).send({ message: error.message }));
        })
            .catch((error) => res.status(400).send({ message: error.message }))
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


// get all medicines
router.get('/allmedicines', masterAuth, async (req, res) => {
    await Medicines.find().then((medicines) => res.status(200).send(medicines))
        .catch((error) => res.status(400).send({ message: error.message }));
});

// update existing medicine
router.patch('/update/medicine', masterAuth, async (req, res) => {
    const id = req.body.id;
    try {
        await Medicines.findById(id)
            .then(async (medicine) => {
                if (!medicine) {
                    return res.status(404).send({ message: "Medicine Not Found" });
                }
                medicine.medicine_name = req.body.medicine_name;
                medicine.medicine_description = req.body.medicine_description;
                await medicine.save()
                    .then((medicine) => res.status(200).send(medicine))
                    .catch((error) => res.status(400).send({ message: error.message }))
            })
            .catch((error) => res.status(400).send({ message: error.message }))
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
});

// delete existing medicine
router.delete('/delete/medicine/:id', masterAuth, async (req, res) => {
    const id = req.params.id;
    try {
        await Medicines.findById(id)
            .then(async (medicine) => {
                if (!medicine) {
                    return res.status(404).send({ message: "Medicine Not Found" });
                }
                await Medicines.findByIdAndDelete(id)
                    .then(() => res.status(200).send({ message: "Delete Successfully" }))
                    .catch((error) => res.status(400).send({ message: error.message }))
            })
            .catch((error) => res.status(400).send({ message: error.message }))
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


module.exports = router;