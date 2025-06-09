const express = require('express');
const router = express.Router();
const maestroController = require('../controllers/maestroController');
const { verificarToken } = require('../middleware/auth');

// Aplicar middleware de autenticación a todas las rutas
router.use(verificarToken);

// Rutas CRUD para maestros
router.post('/', maestroController.createMaestro);
router.get('/', maestroController.getAllMaestros);
router.get('/:id', maestroController.getMaestroById);
router.put('/:id', maestroController.updateMaestro);
router.delete('/:id', maestroController.deleteMaestro);

module.exports = router; 