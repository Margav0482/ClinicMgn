const mongoose = require('mongoose');

const patientSchema = mongoose.Schema(
    {
        patientId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"PatientDetails"
        },
        reason:{
            type:String,
            required:true
        },
        medicines:[
            {
                type:String
            }
        ],
        date:{
            type:String,
            required:true
        },
        due_days:{
            type:Number
        },
        due_date:{
            type:Date
        },
        suggestion:{
            type:String
        },
        description:{
            type:String
        },
        report_image:{
            type:String
        }
    },{
        timestamps:true
    }
);

const PatientHelth = mongoose.model("PatientHelth",patientSchema);

module.exports = PatientHelth;