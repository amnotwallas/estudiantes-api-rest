# estudiantes-api-rest

🌟 **API REST para gestionar estudiantes** desarrollada en JavaScript.

---

## 📋 Índice

- [Descripción](#descripción)
- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Variables de entorno](#variables-de-entorno)
- [Ejecución](#ejecución)

---

## 📌 Descripción

API para crear, leer, actualizar y eliminar (CRUD) registros de estudiantes. Nació como proyecto para uso en clases/prácticas sencillas.

---

## 🚀 Funcionalidades

- ✅ Crear un nuevo estudiante
- ✅ Listar todos los estudiantes
- ✅ Obtener datos de un estudiante por su ID
- ✅ Actualizar un estudiante existente
- ✅ Eliminar un estudiante

---

## 🛠️ Tecnologías

- Node.js
- Express.js
- Base de datos (p. ej. MongoDB o similar) — *configurable*
- Otras según tu implementación: Mongoose, body-parser, dotenv…

---

## 📦 Instalación

```bash
git clone https://github.com/amnotwallas/estudiantes-api-rest.git
cd estudiantes-api-rest
npm install
```

---

## ⚙️ Uso

1. Renombra `.env.example` a `.env`
2. Define las variables de entorno necesarias (consulta más abajo)
3. Ejecuta la API:

```bash
npm start
```

La API queda disponible en `http://localhost:3000` (o el puerto que configures).

---

## 🔗 Endpoints

| Método  | Ruta                     | Descripción                     |
|:-------:|:-------------------------|:--------------------------------|
| POST    | `/estudiantes`           | Crear un nuevo estudiante       |
| GET     | `/estudiantes`           | Listar todos los estudiantes    |
| GET     | `/estudiantes/:id`       | Obtener un estudiante por ID    |
| PUT     | `/estudiantes/:id`       | Actualizar un estudiante        |
| DELETE  | `/estudiantes/:id`       | Eliminar un estudiante          |

> 🔧 Ajusta rutas si tu proyecto usa `api/estudiantes`, `students`, etc.

---

## 🔐 Variables de entorno

```env
# Puerto en el que correrá tu servidor
PORT=3000
JWT_SECRET=Tu_clave
MONGODB_URI=Tu_Uri_De_Mongo
```

*Agrega otros como `JWT_SECRET`, `API_KEY`, si usas autenticación u otros servicios*

---

## 🏃‍♂️ Ejecución

### En desarrollo

```bash
npm run dev
```

### En producción

```bash
npm start
```

---


