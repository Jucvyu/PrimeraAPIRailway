const User = require('../Models/user.model');

// Obtenemos todos los usuarios
const getUsers = async (req, res) => {
    try{
        const users = await User.find();   // buscamos todos los usuarios en la base de datos
        res.json(users);    // si todo salió bien, devolvemos los usuarios encontrados
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

// Obtenemos un usuario por su id
const getUserByID = async (req, res) => {
    const { id } = req.params;    // req.params es el objeto que contiene los parámetros de la ruta, en este caso el id del usuario que queremos obtener

    try{
        const user = await User.findById(id);   // buscamos el usuario en la base de datos por su id y esperamos a que se complete la operación
        // si el usuario no existe, devolvemos un mensaje de error
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.json(user);    // si todo salió bien, devolvemos el usuario encontrado
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

// Creamos un nuevo usuario
const createUser = async (req, res) => {
    const { name, email, password } = req.body;   // creamos un objeto con los datos del nuevo usuario y los pasamos a req.body

    try{
        const newUser = new User({ name, email, password });   // creamos un nuevo objeto User con los datos del nuevo usuario
        await newUser.save();   // guardamos el nuevo usuario en la base de datos y esperamos a que se complete la operación
        res.status(201).json(newUser);    // si todo salió bien, devolvemos el usuario creado
    } catch(err){
        res.status(400).json({ message: err.message });
    }
}

// Actualizar un usuario
const updateUser = async (req, res) => {
    const { id } = req.params;    // obtenemos el id del usuario que queremos actualizar mediante req.params
    const { name, email, password } = req.body;    // obtenemos los datos del usuario que queremos actualizar mediante req.body

    try{
        const updatedUser = await User.findByIdAndUpdate(    // buscamos el usuario en la base de datos por su id y actualizamos sus datos
            id,    // id es el parámetro que pasamos a req.params, este es el id del usuario que queremos buscar y actualizar
            { name, email, password },    // actualizamos los datos del usuario
            { new: true }     // new: true es un parámetro de Mongoose que nos permite actualizar el objeto sin guardarlo en la base de datos
        );

        // si el usuario no existe, devolvemos un mensaje de error
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json(updatedUser);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

// Eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;    // obtenemos el id del usuario que queremos eliminar mediante req.params

    try{
        const deletedUser = await User.findByIdAndDelete(id);   // buscamos el usuario en la base de datos por su id y lo eliminamos

        // si el usuario no existe, devolvemos un mensaje de error
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json({ message: 'Usuario eliminado.' });
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
};

// Exportamos las funciones de la ruta para que puedan ser utilizadas en Routes/user.routes.js
module.exports = {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
}