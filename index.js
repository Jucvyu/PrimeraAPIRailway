const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');
const userRoutes = require('./Routes/user.routes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8080;

console.log("PORT:", PORT);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});