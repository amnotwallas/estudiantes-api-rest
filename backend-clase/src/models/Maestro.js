const mongoose = require('mongoose');

const Maestro = mongoose.models.Maestro || mongoose.model('Maestro', new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        enum: ['masculino', 'femenino', 'otro'],
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    especialidad: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    }
}, {
    timestamps: true
}));

module.exports = Maestro; 