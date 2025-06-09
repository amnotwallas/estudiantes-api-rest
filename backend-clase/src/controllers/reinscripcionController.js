const Reinscripcion = require('../models/Reinscripcion');
const Alumno = require('../models/Alumno');

const reinscripcionController = {
    // Crear una nueva reinscripción
    async createReinscripcion(req, res) {
        try {
            const { alumnoId, semestre, fechaReinscripcion, estado, observaciones } = req.body;

            // Verificar si el alumno existe
            const alumno = await Alumno.findById(alumnoId);
            if (!alumno) {
                return res.status(404).json({ message: 'Alumno no encontrado' });
            }

            // Crear la reinscripción
            const nuevaReinscripcion = new Reinscripcion({
                alumnoId,
                semestre,
                fechaReinscripcion,
                estado,
                observaciones
            });

            // Guardar la reinscripción
            const reinscripcionGuardada = await nuevaReinscripcion.save();

            // Actualizar el estado del alumno
            alumno.estado = estado;
            await alumno.save();

            res.status(201).json(reinscripcionGuardada);
        } catch (error) {
            res.status(500).json({ 
                message: 'Error al procesar la reinscripción', 
                error: error.message 
            });
        }
    },

    // Obtener todas las reinscripciones
    async getAllReinscripciones(req, res) {
        try {
            const reinscripciones = await Reinscripcion.find()
                .populate('alumnoId', 'nombre apellido email carrera')
                .sort({ fechaReinscripcion: -1 });
            res.status(200).json(reinscripciones);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las reinscripciones' });
        }
    },

    // Obtener reinscripciones por alumno
    async getReinscripcionesByAlumno(req, res) {
        try {
            const { alumnoId } = req.params;
            const reinscripciones = await Reinscripcion.find({ alumnoId })
                .populate('alumnoId', 'nombre apellido email carrera')
                .sort({ fechaReinscripcion: -1 });
            res.status(200).json(reinscripciones);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las reinscripciones del alumno' });
        }
    },

    // Obtener una reinscripción por ID
    async getReinscripcionById(req, res) {
        try {
            const reinscripcion = await Reinscripcion.findById(req.params.id)
                .populate('alumnoId', 'nombre apellido email carrera');
            if (!reinscripcion) {
                return res.status(404).json({ message: 'Reinscripción no encontrada' });
            }
            res.status(200).json(reinscripcion);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la reinscripción' });
        }
    }
};

module.exports = reinscripcionController; 