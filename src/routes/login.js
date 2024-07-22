// routes/login.js
const express = require("express");
const Administrador = require("../models/Administradores"); // Asegúrate de importar el modelo correcto
const router = express.Router();

// Ruta para login de administrador
router.post("/login", (req, res) => {
    const { nombre, password } = req.body;

    // Buscar al administrador por nombre y contraseña
    Administrador.findOne({ nombre, password })
        .then(administrador => {
            if (!administrador) {
                return res.status(404).json({ error: "Administrador no encontrado" });
            }
            // Aquí podrías implementar la lógica para manejar la sesión del administrador, como generar un token JWT
            res.json(administrador); // En este caso, solo devolvemos el administrador encontrado
        })
        .catch(error => res.status(500).json({ error }));
});

module.exports = router;
