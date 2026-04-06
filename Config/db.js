const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);   // conectamos a la base de datos
        console.log('Conectado a MongoDB');
    }catch(err){
        console.log(err);
        process.exit(1);   // si no se puede conectar, terminamos el programa
    }
}

module.exports = connectDB;