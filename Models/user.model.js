const mongoose = require('mongoose');   // cargamos mongoose que es una librería de Node.js para trabajar con MongoDB

// Creamos un esquema para el modelo User
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

// Exportamos el modelo User para que pueda ser utilizado en otros archivos, como Controllers/user.controller.js
module.exports = mongoose.model('User', userSchema);