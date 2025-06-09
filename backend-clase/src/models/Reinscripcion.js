const mongoose = require('mongoose');

const Reinscripcion = mongoose.models.Reinscripcion || mongoose.model('Reinscripcion', new mongoose.Schema({
    alumnoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno',
        required: true
    },
    semestre: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    fechaReinscripcion: {
        type: Date,
        required: true,
        default: Date.now
    },
    estado: {
        type: String,
        enum: ['activo', 'baja', 'egresado'],
        required: true,
        default: 'activo'
    },
    observaciones: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
}));

module.exports = Reinscripcion; 