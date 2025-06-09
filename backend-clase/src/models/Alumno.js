const mongoose = require('mongoose');

const Alumno = mongoose.models.Alumno || mongoose.model('Alumno', new mongoose.Schema({
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
    carrera: {
        type: String,
        required: true,
        enum: [
            'Ingeniería en Sistemas Computacionales',
            'Ingeniería en Informática',
            'Ingeniería en Bioquímica',
            'Contador Público',
            'Ingeniería Civil',
            'Ingeniería en Gestión Empresarial'
        ]
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    }
}, {
    timestamps: true
}));

module.exports = Alumno; 