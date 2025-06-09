const User = require('../models/User');

const userController = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find({}, '-password'); // Excluye la contraseña
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los usuarios' });
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id, '-password');
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el usuario' });
        }
    },

    async updateUser(req, res) {
        try {
            const { username } = req.body;
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { username },
                { new: true, runValidators: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario actualizado', user });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el usuario' });
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el usuario' });
        }
    }
};

module.exports = userController;
