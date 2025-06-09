const Carrera = require('../models/Carrera');

// Obtener todas las carreras
const obtenerCarreras = async (req, res) => {
  try {
    const carreras = await Carrera.find();
    res.json(carreras);
  } catch (error) {
    console.error('Error al obtener carreras:', error);
    res.status(500).json({ message: 'Error al obtener carreras' });
  }
};

// Crear una nueva carrera
const crearCarrera = async (req, res) => {
  try {
    const nuevaCarrera = new Carrera(req.body);
    await nuevaCarrera.save();
    res.status(201).json(nuevaCarrera);
  } catch (error) {
    console.error('Error al crear carrera:', error);
    res.status(400).json({ message: 'Error al crear carrera' });
  }
};

// Actualizar una carrera existente
const actualizarCarrera = async (req, res) => {
  const { id } = req.params;
  try {
    const carreraActualizada = await Carrera.findByIdAndUpdate(id, req.body, { new: true });
    if (!carreraActualizada) {
      return res.status(404).json({ message: 'Carrera no encontrada' });
    }
    res.json(carreraActualizada);
  } catch (error) {
    console.error('Error al actualizar carrera:', error);
    res.status(400).json({ message: 'Error al actualizar carrera' });
  }
};

// Eliminar una carrera
const eliminarCarrera = async (req, res) => {
  const { id } = req.params;
  try {
    const carreraEliminada = await Carrera.findByIdAndDelete(id);
    if (!carreraEliminada) {
      return res.status(404).json({ message: 'Carrera no encontrada' });
    }
    res.json({ message: 'Carrera eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar carrera:', error);
    res.status(400).json({ message: 'Error al eliminar carrera' });
  }
};

module.exports = {
  obtenerCarreras,
  crearCarrera,
  actualizarCarrera,
  eliminarCarrera
};
