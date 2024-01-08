require('dotenv').config();
const express = require('express');
const router = express.Router();
const masterAuth = require('../middleware/masterAuth');

const PatientDetails = require('../models/PatientDetails');

//create new patient details

router.post('/newpatient', masterAuth, async (req, res) => {
    const email = req.body.email;
    try {
        if (email === "") {
            const data = { ...req.body }
            const newPatient = new PatientDetails(data);
            const saveData = await newPatient.save();
            if (!saveData) {
                return res.status(400).send({ message: "No Data Insert" });
            }
            return res.status(201).send(saveData);
        } else {
            const data = { ...req.body, password: process.env.DEFAULT_PASSWORD }
            const newPatient = new PatientDetails(data);
            const saveData = await newPatient.save();
            if (!saveData) {
                return res.status(400).send({ message: "No Data Insert" });
            }
            return res.status(201).send(saveData);
        }
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// get all patient details

router.get('/allpatients', masterAuth, async (req, res) => {
    try {
        const allpatients = await PatientDetails.find();
        if (!allpatients) return res.status(404).send({ message: "No Data Found" });
        res.status(200).send(allpatients);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

// Update patient details

router.patch('/update/patientdetails', masterAuth, async (req, res) => {
    const id = req.body.id;
    try {
        await PatientDetails.findById(id).then(async (details) => {
            if (!details) {
                return res.status(404).send({ message: 'Patient Not Found' });
            } else {
                if (details.email === "" && req.body.email !== "") {
                    details.name = req.body.name;
                    details.age = req.body.age;
                    details.phone = req.body.phone;
                    details.email = req.body.email;
                    details.address = req.body.address;
                    details.gender = req.body.gender;
                    details.weight = req.body.weight;
                    details.date = req.body.date;
                    details.password = process.env.DEFAULT_PASSWORD
                    await details.save();
                    return res.status(200).send(details);
                } else {
                    details.name = req.body.name;
                    details.age = req.body.age;
                    details.phone = req.body.phone;
                    details.email = req.body.email;
                    details.address = req.body.address;
                    details.gender = req.body.gender;
                    details.weight = req.body.weight;
                    details.date = req.body.date;
                    await details.save();
                    return res.status(200).send(details);
                }
            }
        }).catch((errro) => {
            res.status(400).send({ message: error.message });
        })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

// Delete Patient Details

router.delete('/delete/patientdetail/:id', masterAuth, async (req, res) => {
    const id = req.params.id;
    try {
        await PatientDetails.findById(id).then(async (details) => {
            if (!details) {
                return res.status(404).send({ message: "Patient Not Found" });
            }
            await PatientDetails.findByIdAndDelete(id).then(() => res.status(200).send({ message: "Delete Patient Detail" }))
        }).catch((error) => res.status(400).send({ message: error.message }))
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})



module.exports = router;