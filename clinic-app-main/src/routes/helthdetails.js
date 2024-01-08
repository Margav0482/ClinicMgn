const express = require('express');
const router = express.Router();
const masterAuth = require('../middleware/masterAuth');

const PatientDetails = require('../models/PatientDetails');
const PatientHelth = require('../models/PatientHelth');

// Existing Patient Helth

router.post('/newPatienthelth', masterAuth, async (req, res) => {
    const id = req.body.patientId;
    try {
        if (id != "") {
            const isMatch = await PatientDetails.findOne({ _id: id });
            if (!isMatch) return res.status(404).status({ message: "Patient Does Not found" });
            const due_days = req.body.due_days;
            const due_date = new Date(Date.now() + due_days * 24 * 60 * 60 * 1000);
            const data = { ...req.body, due_date };
            const patientHelth = new PatientHelth(data);
            const saveData = await patientHelth.save();
            if (!saveData) {
                return res.status(400).send({ message: "No Data Insert" });
            }
            return res.status(201).send(saveData);
        } else {
            return res.status(400).send({ message: "Please Enter PatientId" });
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})


// get all patient details

router.get('/allpatienthelth', masterAuth, async (req, res) => {
    try {
        const data = await PatientHelth.find().populate("patientId").exec();
        if (!data) return res.status(404).send({ messsage: "No Data Found" });
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

router.patch('/update/patienthelth', masterAuth, async (req, res) => {
    const id = req.body.id;
    try {
        await PatientHelth.findById(id).then(async (data) => {
            if (!data) {
                return res.status(404).send({ message: "Patient Not Found" });
            }
            const due_days = req.body.due_days;
            const due_date = new Date(Date.now() + due_days * 24 * 60 * 60 * 1000);
            data.reason = req?.body?.reason;
            data.medicines = req?.body?.medicines
            data.date = req?.body?.date;
            data.due_days = req?.body?.due_days;
            data.due_date = due_date;
            data.suggestion = req?.body?.suggestion;
            data.description = req?.body?.description;
            data.report_image = req?.body?.report_image;
            await data.save().then((newData) => {
                res.status(200).send(newData);
            }).catch((error) => {
                res.status(400).send({ message: error.message })
            })
        })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

// delete patienthelth details

router.delete('/delete/patienthelth/:id', masterAuth, async (req, res) => {
    const id = req.params.id;
    try {
        await PatientHelth.findById(id).then(async (data) => {
            if (!data) {
                return res.status(404).send({ message: "Details Not Found" });
            }
            await PatientHelth.findByIdAndDelete(id)
                .then(() => res.status(200).send({ message: "delete Data" }))
                .catch((error) => res.status(400).send({ message: error.message }))
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// get specifice user details

//userId
router.get('/getSinglePatientDetails/:id', masterAuth, async (req, res) => {
    const id = req.params.id;
    try {
        await PatientHelth.find({ patientId: id }).populate('patientId').exec()
            .then((data) => res.status(200).send(data))
            .catch((error) => res.status(400).send({ message: error.message }));
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

module.exports = router;