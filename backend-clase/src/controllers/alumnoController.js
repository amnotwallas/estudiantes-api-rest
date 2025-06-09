const Alumno = require('../models/Alumno');

const alumnoController = {
    // Crear un nuevo alumno
    async createAlumno(req, res) {
        try {
            // Solo los administradores pueden crear alumnos
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden crear alumnos.' });
            }
            const nuevoAlumno = new Alumno(req.body);
            const alumnoGuardado = await nuevoAlumno.save();
            res.status(201).json(alumnoGuardado);
        } catch (error) {
            if (error.code === 11000) { // Error de duplicado
                res.status(400).json({ message: 'El email ya está registrado' });
            } else {
                res.status(500).json({ message: 'Error al crear el alumno', error: error.message });
            }
        }
    },

    // Obtener todos los alumnos o filtrar por carrera para alumnos
    async getAllAlumnos(req, res) {
        try {
            let query = {};
            // Si el usuario no es admin, solo puede ver alumnos de su misma carrera
            if (req.user.role === 'alumno') {
                // Primero, obtenemos los datos completos del alumno asociado al usuario
                const alumnoAsociado = await Alumno.findById(req.user.alumnoId);
                if (!alumnoAsociado) {
                    return res.status(404).json({ message: 'Perfil de alumno no encontrado para el usuario actual.' });
                }
                query.carrera = alumnoAsociado.carrera;
            } else if (req.user.role !== 'admin') {
                // Si no es admin ni alumno, no tiene permiso para ver la lista completa
                return res.status(403).json({ message: 'Acceso denegado. Solo administradores y alumnos (filtrado por carrera) pueden ver esta información.' });
            }

            const alumnos = await Alumno.find(query);
            res.status(200).json(alumnos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los alumnos', error: error.message });
        }
    },

    // Obtener un alumno por ID
    async getAlumnoById(req, res) {
        try {
            const alumno = await Alumno.findById(req.params.id);
            if (!alumno) {
                return res.status(404).json({ message: 'Alumno no encontrado' });
            }

            // Si el usuario no es admin, solo puede ver su propio perfil
            if (req.user.role === 'alumno') {
                if (req.user.alumnoId.toString() !== alumno._id.toString()) {
                    return res.status(403).json({ message: 'Acceso denegado. Solo puedes ver tu propio perfil de alumno.' });
                }
            } else if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Acceso denegado. Solo administradores y alumnos (su propio perfil) pueden ver esta información.' });
            }

            res.status(200).json(alumno);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el alumno', error: error.message });
        }
    },

    // Actualizar un alumno
    async updateAlumno(req, res) {
        try {
            console.log('Datos recibidos para actualizar alumno:', req.body);
            console.log('ID del alumno a actualizar:', req.params.id);
            // Solo los administradores pueden actualizar alumnos
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden actualizar alumnos.' });
            }
            const alumno = await Alumno.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!alumno) {
                return res.status(404).json({ message: 'Alumno no encontrado' });
            }
            res.status(200).json(alumno);
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({ message: 'El email ya está registrado' });
            } else {
                res.status(500).json({ message: 'Error al actualizar el alumno', error: error.message });
            }
        }
    },

    // Eliminar un alumno
    async deleteAlumno(req, res) {
        try {
            // Solo los administradores pueden eliminar alumnos
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden eliminar alumnos.' });
            }
            const alumno = await Alumno.findByIdAndDelete(req.params.id);
            if (!alumno) {
                return res.status(404).json({ message: 'Alumno no encontrado' });
            }
            res.status(200).json({ message: 'Alumno eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el alumno', error: error.message });
        }
    },

    // Obtener alumnos por carrera
    async getAlumnosByCarrera(req, res) {
        try {
            const { carrera } = req.params;
            const alumnos = await Alumno.find({ carrera });
            res.status(200).json(alumnos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los alumnos de la carrera' });
        }
    }
};

module.exports = alumnoController; 