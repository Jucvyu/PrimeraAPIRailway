const mongoose = require('mongoose');    // cargamos mongoose que es una librería de Node.js para trabajar con MongoDB

// Creamos un esquema para el modelo Car
const carSchema = new mongoose.Schema({
    marca: String,
    modelo: String,
    placa: String,

    // Campo de referencia a User
    user: {
        type: mongoose.Schema.Types.ObjectId,    // type es un parámetro de Mongoose que nos permite especificar el tipo de dato del campo
        ref: 'User',    // ref es un parámetro de Mongoose que nos permite especificar la referencia al modelo User
        required: true
    }

}, { timestamps: true });    // timestamps es un parámetro de Mongoose que nos permite agregar automáticamente campos de fecha y hora a nuestros modelos

module.exports = mongoose.model('Car', carSchema);    // exportamos el modelo Car para que pueda ser utilizado en otros archivos, como Controllers/car.controller.js