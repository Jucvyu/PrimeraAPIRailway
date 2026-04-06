const express = require('express');
const router = express.Router();   // creamos un router para nuestra API de cars que es una instancia de express.Router() que nos permite definir rutas para nuestra API de cars

const { createCar,
    getCar,
    getCarByID,
    updateCar,
    deleteCar  } = require('../Controllers/car.controller');   // importamos las funciones de la ruta de cars desde Controllers/car.controller.js

router.get('/', getCar);   // definimos una ruta GET para obtener todos los vehículos
router.get('/:id', getCarByID);   // definimos una ruta GET para obtener un vehículo por su id
router.put('/:id', updateCar);   // definimos una ruta PUT para actualizar un vehículo
router.delete('/:id', deleteCar);   // definimos una ruta DELETE para eliminar un vehículo
router.post('/', createCar);   // definimos una ruta POST para crear un nuevo vehículo

module.exports = router;