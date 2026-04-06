const express = require('express');
const router = express.Router();   // creamos un router para nuestra API de users que es una instancia de express.Router() que nos permite definir rutas para nuestra API de users

// Importamos las funciones de la ruta de users desde Controllers/user.controller.js
const {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
} = require('../Controllers/user.controller');

// Obtemos todos los usuarios
router.get('/', getUsers);
// Obtenemos un usuario por su id
router.get('/:id', getUserByID);

// Creamos un nuevo usuario
router.post('/', createUser);

// Actualizamos un usuario
router.put('/:id', updateUser);

// Eliminamos un usuario
router.delete('/:id', deleteUser);

module.exports = router;