const mongoose = require("mongoose");

const appoinmentSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PatientDetails"
    },
    reason: {
        type: String,
        required: true
    },
    appoinment_date: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    app_status: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
});

const Appoinment = mongoose.model("Appoinment", appoinmentSchema);

module.exports = Appoinment;