const User = require('../Models/user.model');

const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

const getUserByID = async (req, res) => {
    const { id } = req.params;

    try{
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.json(user);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch(err){
        res.status(400).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try{
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { name, email, password },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json(updatedUser);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try{
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json({ message: 'Usuario eliminado.' });
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
}