const express = require('express');
const router = express.Router();
const Carrera = require('../models/Carrera');
const { verificarToken, esAdmin } = require('../middleware/auth');

// Obtener todas las carreras
router.get('/', verificarToken, async (req, res) => {
  try {
    const carreras = await Carrera.find();
    res.json(carreras);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener carreras' });
  }
});

// Crear una nueva carrera (solo admin)
router.post('/', verificarToken, esAdmin, async (req, res) => {
  try {
    const carrera = new Carrera(req.body);
    await carrera.save();
    res.status(201).json(carrera);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear carrera' });
  }
});

// Actualizar una carrera (solo admin)
router.put('/:id', verificarToken, esAdmin, async (req, res) => {
  try {
    const carrera = await Carrera.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!carrera) return res.status(404).json({ message: 'Carrera no encontrada' });
    res.json(carrera);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar carrera' });
  }
});

// Eliminar una carrera (solo admin)
router.delete('/:id', verificarToken, esAdmin, async (req, res) => {
  try {
    const carrera = await Carrera.findByIdAndDelete(req.params.id);
    if (!carrera) return res.status(404).json({ message: 'Carrera no encontrada' });
    res.json({ message: 'Carrera eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar carrera' });
  }
});

module.exports = router;
