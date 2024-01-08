const mongoose = require('mongoose');

const medicinesSchema = mongoose.Schema({
    medicine_name:{
        type:String,
        required:true
    },
    medicine_description:{
        type:String
    }
},
{
    timestamps:true
}
);

const Medicines = mongoose.model('Medicines',medicinesSchema);

module.exports = Medicines;