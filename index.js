const dotenv = require('dotenv');    // cargamos dotenv que es una librería de Node.js para cargar variables de entorno desde un archivo .env
const express = require('express');   
const cors = require('cors');    // cargamos cors que es una librería de Node.js para permitir las peticiones de origen cruzado
const connectDB = require('./Config/db');    // importamos la función connectDB desde Config/db.js
const userRoutes = require('./Routes/user.routes');    // importamos las rutas de usuarios desde Routes/user.routes.js
const carRoutes = require('./Routes/car.routes');    // importamos las rutas de cars desde Routes/car.routes.js

dotenv.config();    // cargamos el archivo .env
connectDB();   // conectamos a la base de datos

const app = express();

app.use(cors());    // usamos cors para permitir las peticiones de origen cruzado
app.use(express.json());    // usamos express.json para parsear los datos enviados por la petición

// ENDPOINT PRINCIPAL
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// ENDPOINT DE USUARIOS
app.use('/api/users', userRoutes);

// ENDPOINT DE AUTOS
app.use('/api/cars', carRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3000;

// Escuchamos las peticiones en el puerto definido y mostramos un mensaje en la consola cuando el servidor esté corriendo
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});