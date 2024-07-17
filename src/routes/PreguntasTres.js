const express = require('express');
const PreguntaTresSchema = require('../models/PreguntasTres');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + extension);
  }
});

const upload = multer({ storage: storage });

// Crear pregunta
router.post('/preguntasTres', upload.fields([{ name: 'imagen1', maxCount: 1 }, { name: 'imagen2', maxCount: 1 }]), (req, res) => {
  const { categoria, nivel, pregunta, numeroUno, numeroDos, resultado } = req.body;
  const imagen1 = req.files.imagen1 ? req.files.imagen1[0].path : null;
  const imagen2 = req.files.imagen2 ? req.files.imagen2[0].path : null;

  const nuevaPreguntaTres = new PreguntaTresSchema({
    categoria,
    nivel,
    pregunta,
    numeroUno,
    imagen1,
    numeroDos,
    imagen2,
    resultado
  });

  nuevaPreguntaTres
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener todas las preguntas
router.get('/preguntasTres', (req, res) => {
  PreguntaTresSchema
  .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener pregunta por su ID
router.get('/preguntasTres/:id', (req, res) => {
  const { id } = req.params;
  PreguntaTres.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Editar pregunta
router.put('/preguntasTres/:id', upload.fields([{ name: 'imagen1', maxCount: 1 }, { name: 'imagen2', maxCount: 1 }]), (req, res) => {
  const { id } = req.params;
  const { categoria, nivel, pregunta, numeroUno, numeroDos, resultado } = req.body;
  const imagen1 = req.files.imagen1 ? req.files.imagen1[0].path : null;
  const imagen2 = req.files.imagen2 ? req.files.imagen2[0].path : null;

  const updateData = { categoria, nivel, pregunta, numeroUno, numeroDos, resultado };
  if (imagen1) updateData.imagen1 = imagen1;
  if (imagen2) updateData.imagen2 = imagen2;

  PreguntaTresSchema
  .updateOne({ _id: id }, { $set: updateData })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar una pregunta
router.delete('/preguntasTres/:id', (req, res) => {
  const { id } = req.params;

  PreguntaTresSchema
  .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
