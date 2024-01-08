const express = require('express');
const masterAuth = require('../middleware/masterAuth');
const router = express.Router();

const Appoinment = require('../models/Appoinment');

router.post('/bookAppoinment', masterAuth, async (req, res) => {
    const id = req.body.patientId;
    try {
        if (id === "") {
            return res.status(404).send({ message: "Please Enter Id" });
        }
        const newAppoinment = Appoinment(req.body);
        await newAppoinment.save()
            .then((data) => res.status(201).send(data))
            .catch((error) => res.status(400).send({ message: error.message }))
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

router.get('/allAppoinment', masterAuth, async (req, res) => {
    try {
        await Appoinment.find().populate('patientId')
            .then((data) => res.status(200).send(data))
            .catch((error) => res.status(400).send({ message: error.message }))
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

router.patch('/approveAppoinment/:id', masterAuth, async (req, res) => {
    const id = req.params.id;
    try {
        if (id === "") {
            return res.status(404).send({ message: "Please Eneter Id" });
        }
        await Appoinment.findById(id).then(async (data) => {
            data.status = !data.status
            data.app_status = "Approved"
            await data.save()
                .then((updateData) => res.status(200).send(updateData))
                .catch((error) => res.status(400).send({ message: error.message }))
        })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

router.patch('/declineAppoinment/:id', masterAuth, async (req, res) => {
    const id = req.params.id;
    console.log(`Appoinment.js: (Server) (router.patch) req.params.id: ${id}`);
    try {
        if (id === "") {
            return res.status(404).send({ message: "Please Eneter Id" });
        }
        await Appoinment.findById(id).then(async (data) => {
            data.app_status = "Declined"
            data.status = !data.status
            await data.save()
                .then((updateData) => res.status(200).send(updateData))
                .catch((error) => res.status(400).send({ message: error.message }))
        })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

router.delete('/deleteAppoinment/:id', masterAuth, async (req, res) => {
    const id = req.params.id;
    try {
        if (id === "") {
            return res.status(404).send({ message: "Please Enter Id" });
        }
        await Appoinment.findByIdAndDelete(id)
            .then(() => res.status(200).send({ message: "delete Appoinment" }))
            .catch((error) => res.status(400).send({ message: error.message }))
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

module.exports = router;