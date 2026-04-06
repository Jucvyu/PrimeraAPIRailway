const Car = require('../Models/car.model');

// Creamos un nuevo vehículo
const createCar = async (req, res) => {
    try {
        const { marca, modelo, placa, userId } = req.body;   // req.body es el objeto que envía el cliente con los datos del nuevo vehículo (marca, modelo, placa, id del usuario)

        const vehiculo = new Car({
            marca,
            modelo,
            placa,
            user: userId   // userId es el id del usuario que crea el vehículo
        });

        const saved = await vehiculo.save();    // guardamos el nuevo vehículo en la base de datos y esperamos a que se complete la operación

        res.status(201).json(saved);   // si todo salió bien, devolvemos el objeto creado
    } catch (error) {
        res.status(500).json({ error: error.message });    // si algo salió mal, devolvemos el mensaje de error
    }
};

// Obtenemos todos los vehículos
const getCar = async (req, res) => {
    try {
        const vehiculos = await Car.find()      // buscamos todos los vehículos en la base de datos
            .populate('user'); // .populate('user') es un método de Mongoose que nos permite obtener los datos del usuario asociado a cada vehículo, en lugar de solo su id

        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenemos un vehículo por su id
const getCarByID = async (req, res) => {
    const { id } = req.params;    // req.params es el objeto que contiene los parámetros de la ruta, en este caso el id del vehículo que queremos obtener

    try {
        const vehiculo = await Car.findById(id);   // buscamos el vehículo en la base de datos por su id y esperamos a que se complete la operación
        // si el vehículo no existe, devolvemos un mensaje de error
        if (!vehiculo) {
            return res.status(404).json({ message: 'Vehículo no encontrado.' });
        }
        res.json(vehiculo);    // si todo salió bien, devolvemos el vehículo encontrado
    } catch (error) {
        res.status(500).json({ error: error.message });    // si algo salió mal, devolvemos el mensaje de error
    }
};

// Actualizar un vehículo
const updateCar = async (req, res) => {
    const { id } = req.params;    // obtenemos el id del vehículo que queremos actualizar mediante req.params
    const { marca, modelo, placa, userId } = req.body;    // obtenemos los datos del vehículo que queremos actualizar mediante req.body

    try{
        const updatedVehiculo = await Car.findByIdAndUpdate(    // buscamos el vehículo en la base de datos por su id y actualizamos sus datos
            id,    // id es el parámetro que pasamos a req.params, este es el id del vehículo que queremos buscar y actualizar
            { marca, modelo, placa, userId },    // actualizamos los datos del vehículo
            { new: true }     // new: true es un parámetro de Mongoose que nos permite actualizar el objeto sin guardarlo en la base de datos
        );

        // si el vehículo no existe, devolvemos un mensaje de error
        if (!updatedVehiculo) {
            return res.status(404).json({ message: 'Vehículo no encontrado.' });
        }

        res.json(updatedVehiculo);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

// Eliminar un vehículo
const deleteCar = async (req, res) => {
    const { id } = req.params;    // obtenemos el id del vehículo que queremos eliminar mediante req.params

    try{
        const deletedVehiculo = await Car.findByIdAndDelete(id);   // buscamos el vehículo en la base de datos por su id y lo eliminamos

        // si el vehículo no existe, devolvemos un mensaje de error
        if (!deletedVehiculo) {
            return res.status(404).json({ message: 'Vehículo no encontrado.' });
        }

        res.json({ message: 'Vehículo eliminado.' });
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
};

// Exportamos las funciones de la ruta para que puedan ser utilizadas en Routes/car.routes.js
module.exports = {
    createCar,
    getCar,
    getCarByID,
    updateCar,
    deleteCar
}