const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // limpio y actualizado
        console.log("Conectado a MongoDB Atlas");
    } catch (err) {
        console.error("Error conectando a MongoDB:", err);
        process.exit(1);
    }
};

connectDB();

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');
const maestroRoutes = require('./routes/maestroRoutes');
const reinscripcionRoutes = require('./routes/reinscripcionRoutes');
const carrerasRoutes = require('./routes/carreras');

// Usar rutas
app.use('/api', authRoutes);           // /api/login y /api/register
app.use('/api/users', userRoutes);     // /api/users (rutas protegidas CRUD)
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/maestros', maestroRoutes);
app.use('/api/reinscripciones', reinscripcionRoutes);
app.use('/api/carreras', carrerasRoutes);

// Ruta principal (opcional)
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
