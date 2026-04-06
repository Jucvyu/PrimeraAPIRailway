require("dotenv").config();    // cargamos el archivo .env

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;    // obtenemos el token de autorización de la cabecera de la petición

    if (!token || token !== process.env.JWT_SECRET) {    // si el token no es igual al token en el .env, devolvemos un mensaje de error
        return res.status(401).json({ message: 'No autorizado.' });
    }

    next();
};

module.exports = authMiddleware;