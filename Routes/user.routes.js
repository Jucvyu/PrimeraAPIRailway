const express = require('express');
const router = express.Router();

const {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
} = require('../Controllers/user.controller');

// Obtemos todos los usuarios
router.get('/', getUsers);

router.get('/:id', getUserByID);

// Creamos un nuevo usuario
router.post('/', createUser);

// Actualizamos un usuario
router.put('/:id', updateUser);

// Eliminamos un usuario
router.delete('/:id', deleteUser);

module.exports = router;