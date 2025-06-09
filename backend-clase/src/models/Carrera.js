const mongoose = require('mongoose');

const carreraSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  duracion: Number,
  modalidad: String
});

module.exports = mongoose.model('Carrera', carreraSchema);
