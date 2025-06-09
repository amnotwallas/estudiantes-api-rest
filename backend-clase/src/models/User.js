const mongoose = require('mongoose');

// Verificar si el modelo ya existe
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ['admin', 'alumno', 'maestro'],
        default: 'alumno' // Por defecto, si no se especifica, se registrará como alumno
    },
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    email: {
        type: String
    },
    genero: {
        type: String,
        enum: ['masculino', 'femenino', 'otro']
    },
    alumnoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno',
        default: null
    },
    maestroId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Maestro',
        default: null
    }
}));

module.exports = User;
