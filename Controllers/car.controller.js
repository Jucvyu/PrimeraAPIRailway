const Car = require('../Models/car.model');

const createCar = async (req, res) => {
    try {
        const { marca, modelo, placa, userId } = req.body;

        const vehiculo = new Car({
            marca,
            modelo,
            placa,
            user: userId
        });

        const saved = await vehiculo.save();

        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCar = async (req, res) => {
    try {
        const vehiculos = await Car.find()
            .populate('user'); // 🔥 trae datos del usuario

        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCar,
    getCar
}