const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Obtener el token del header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Agregar el usuario decodificado a la request
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

const esAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Se requieren privilegios de administrador' });
    }
};

const esAlumno = (req, res, next) => {
    if (req.user && req.user.role === 'alumno') {
        next();
    } else {
        res.status(403).json({ message: 'Se requieren privilegios de alumno' });
    }
};

module.exports = {
    verificarToken,
    esAdmin,
    esAlumno
}; 