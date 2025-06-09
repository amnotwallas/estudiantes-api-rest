const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    try {
        // El token debe venir en el encabezado Authorization
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const token = authHeader.split(' ')[1]; // Esperamos formato "Bearer <token>"

        if (!token) {
            return res.status(401).json({ message: 'Token inválido o ausente' });
        }

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Almacenar el usuario decodificado en la request
        req.user = decoded;

        // Solo verificar rol de admin para operaciones POST, PUT, DELETE
        if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
            if (decoded.role !== 'admin') {
                return res.status(403).json({ 
                    message: 'Acceso denegado. Se requieren privilegios de administrador para esta operación' 
                });
            }
        }
        
        // Pasar al siguiente middleware
        next();
    } catch (error) {
        console.error('Error en autenticación:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token inválido' });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado' });
        }
        
        return res.status(500).json({ message: 'Error en la autenticación' });
    }
};

module.exports = authMiddleware;
