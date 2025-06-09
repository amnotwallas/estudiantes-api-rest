const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');
const { verificarToken } = require('../middleware/auth');

// Aplicar middleware de autenticación a todas las rutas
router.use(verificarToken);

// Rutas CRUD para alumnos
router.post('/', alumnoController.createAlumno);
router.get('/', alumnoController.getAllAlumnos);
router.get('/:id', alumnoController.getAlumnoById);
router.put('/:id', alumnoController.updateAlumno);
router.delete('/:id', alumnoController.deleteAlumno);
router.get('/carrera/:carrera', alumnoController.getAlumnosByCarrera);

module.exports = router; 