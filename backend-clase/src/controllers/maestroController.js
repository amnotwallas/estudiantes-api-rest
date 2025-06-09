const Maestro = require('../models/Maestro');

const maestroController = {
    // Crear un nuevo maestro
    async createMaestro(req, res) {
        try {
            const nuevoMaestro = new Maestro(req.body);
            const maestroGuardado = await nuevoMaestro.save();
            res.status(201).json(maestroGuardado);
        } catch (error) {
            if (error.code === 11000) { // Error de duplicado
                res.status(400).json({ message: 'El email ya está registrado' });
            } else {
                res.status(500).json({ message: 'Error al crear el maestro', error: error.message });
            }
        }
    },

    // Obtener todos los maestros
    async getAllMaestros(req, res) {
        try {
            const maestros = await Maestro.find();
            res.status(200).json(maestros);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los maestros' });
        }
    },

    // Obtener un maestro por ID
    async getMaestroById(req, res) {
        try {
            const maestro = await Maestro.findById(req.params.id);
            if (!maestro) {
                return res.status(404).json({ message: 'Maestro no encontrado' });
            }
            res.status(200).json(maestro);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el maestro' });
        }
    },

    // Actualizar un maestro
    async updateMaestro(req, res) {
        try {
            const maestro = await Maestro.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!maestro) {
                return res.status(404).json({ message: 'Maestro no encontrado' });
            }
            res.status(200).json(maestro);
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({ message: 'El email ya está registrado' });
            } else {
                res.status(500).json({ message: 'Error al actualizar el maestro' });
            }
        }
    },

    // Eliminar un maestro
    async deleteMaestro(req, res) {
        try {
            const maestro = await Maestro.findByIdAndDelete(req.params.id);
            if (!maestro) {
                return res.status(404).json({ message: 'Maestro no encontrado' });
            }
            res.status(200).json({ message: 'Maestro eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el maestro' });
        }
    }
};

module.exports = maestroController; 