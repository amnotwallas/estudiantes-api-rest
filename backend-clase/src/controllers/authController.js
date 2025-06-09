const User = require('../models/User');
const Alumno = require('../models/Alumno');
const Maestro = require('../models/Maestro');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    async register(req, res) {
        try {
            const { username, password, role, nombre, apellido, email, genero, carrera, especialidad } = req.body;
            console.log('Intentando registrar usuario:', { username, role, nombre, apellido, email, genero, carrera, especialidad });

            const existingUser = await User.findOne({ username });
            if (existingUser) {
                console.log('Usuario ya existe:', username);
                return res.status(400).json({ message: "El usuario ya existe" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            let assignedRole = 'alumno';
            if (role === 'admin') {
                assignedRole = 'admin';
            } else if (role === 'maestro') {
                assignedRole = 'maestro';
            } else if (role === 'alumno') {
                assignedRole = 'alumno';
            }

            let newAlumno = null;
            let newMaestro = null;

            if (assignedRole === 'alumno') {
                newAlumno = new Alumno({
                    nombre,
                    apellido,
                    email,
                    genero,
                    carrera,
                    telefono: req.body.telefono,
                    estado: 'activo'
                });
                await newAlumno.save();
            } else if (assignedRole === 'maestro') {
                newMaestro = new Maestro({
                    nombre,
                    apellido,
                    email,
                    genero,
                    especialidad,
                    telefono: req.body.telefono,
                    estado: 'activo'
                });
                await newMaestro.save();
            }

            const user = new User({
                username,
                password: hashedPassword,
                role: assignedRole,
                nombre,
                apellido,
                email,
                genero,
                alumnoId: newAlumno ? newAlumno._id : null,
                maestroId: newMaestro ? newMaestro._id : null
            });

            await user.save();
            console.log('Usuario creado exitosamente:', username);

            const token = jwt.sign(
                { 
                    id: user._id, 
                    username: user.username, 
                    role: user.role 
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(201).json({ 
                message: "Usuario creado exitosamente",
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    email: user.email,
                    genero: user.genero,
                    alumnoId: user.alumnoId,
                    maestroId: user.maestroId
                }
            });
        } catch (error) {
            console.error("Error en registro:", error);
            if (error.code === 11000 && error.message.includes('email_1 dup key')) {
                res.status(400).json({ message: "El email ya está registrado." });
            } else {
                res.status(500).json({ message: "Error al crear el usuario y/o perfil asociado." });
            }
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;
            console.log('Intentando login para usuario:', username);

            const user = await User.findOne({ username });
            if (!user) {
                console.log('Usuario no encontrado:', username);
                return res.status(401).json({ message: "Credenciales inválidas" });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                console.log('Contraseña inválida para usuario:', username);
                return res.status(401).json({ message: "Credenciales inválidas" });
            }

            console.log('Login exitoso para usuario:', username, 'Rol:', user.role);

            const token = jwt.sign(
                { 
                    id: user._id, 
                    username: user.username, 
                    role: user.role 
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ 
                message: "Login exitoso",
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
            });
        } catch (error) {
            console.error("Error en login:", error);
            res.status(500).json({ message: "Error en el servidor" });
        }
    }
};

module.exports = authController;
