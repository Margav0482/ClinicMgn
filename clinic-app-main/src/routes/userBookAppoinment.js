const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appoinment = require('../models/Appoinment');

router.get('/user/allAppoinment', auth, async (req, res) => {
    try {
        await Appoinment.find({ patientId: req.user._id }).then((data) => {
            res.status(200).send(data)
        }).catch((error) => {
            res.status(400).send({ message: error.message });
        })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

router.post('/user/bookAppoinment', auth, async (req, res) => {
    const body = { ...req.body, patientId: req.user._id };
    try {
        await Appoinment.find({ patientId: req.user._id, status: false }).then(async (data) => {
            if (data.length > 0) {
                return res.status(200).send({ message: "you are already book appoinment" });
            }
            const newAppoinment = new Appoinment(body);
            await newAppoinment.save()
                .then((data) => {
                    res.status(200).send(data);
                }).catch((error) => {
                    res.status(400).send({ message: error.message });
                })
        })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

router.patch('/user/updateAppoinment', auth, async (req, res) => {
    const id = req.body.id;
    const reason = req.body.reason;
    const appoinment_date = req.body.appoinment_date;
    try {
        if (id === "") {
            return res.status(404).send({ message: "Please Enter value" });
        }
        await Appoinment.findOne({ _id: id, status: false }).then(async (data) => {
            if (data.length === 0) {
                return res.status(400).send({ message: "You Can't Change In Appoinment" });
            }
            data.reason = reason;
            data.appoinment_date = appoinment_date;
            await data.save()
                .then((data) => {
                    res.status(200).send(data);
                }).catch((error) => {
                    res.status(400).send({ message: error.message });
                })
        })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

router.delete('/user/deleteappoinment/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        if (id === "") {
            return res.status(404).send("Please Enter Value");
        }
        await Appoinment.findByIdAndDelete(id)
            .then((data) => {
                res.status(200).send(data)
            }).catch((error) => {
                res.status(404).send({ message: error.message });
            })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

module.exports = router;