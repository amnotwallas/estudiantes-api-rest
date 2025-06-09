const express = require('express');
const router = express.Router();
const reinscripcionController = require('../controllers/reinscripcionController');
const { verificarToken } = require('../middleware/auth');

// Aplicar middleware de autenticación a todas las rutas
router.use(verificarToken);

// Rutas para reinscripciones
router.post('/', reinscripcionController.createReinscripcion);
router.get('/', reinscripcionController.getAllReinscripciones);
router.get('/alumno/:alumnoId', reinscripcionController.getReinscripcionesByAlumno);
router.get('/:id', reinscripcionController.getReinscripcionById);

module.exports = router; 