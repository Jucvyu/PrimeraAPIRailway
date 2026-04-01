const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    marca: String,
    modelo: String,
    placa: String,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);