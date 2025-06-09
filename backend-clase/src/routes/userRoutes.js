const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verificarToken } = require('../middleware/auth');

// Rutas protegidas con JWT
router.use(verificarToken);

// Rutas CRUD para usuarios
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
