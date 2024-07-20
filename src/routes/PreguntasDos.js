const express = require('express');
const PreguntaDosSchema = require('../models/PreguntasDos');
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
router.post('/preguntasDos', upload.fields([{ name: 'imagen1', maxCount: 1 }, { name: 'imagen2', maxCount: 1 }]), (req, res) => {
  const { categoria, nivel, respuestaNumerica } = req.body;
  const imagen1 = req.files.imagen1 ? req.files.imagen1[0].path : null;
  const imagen2 = req.files.imagen2 ? req.files.imagen2[0].path : null;

  const nuevaPreguntaDos = new PreguntaDosSchema({
    categoria,
    nivel,
    imagen1,
    imagen2,
    respuestaNumerica
  });

  nuevaPreguntaDos
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener todas las preguntas
router.get('/preguntasDos', (req, res) => {
  PreguntaDosSchema
  .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener pregunta por su ID
router.get('/preguntasDos/:id', (req, res) => {
  const { id } = req.params;
  PreguntaDosSchema
  .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener preguntas por categoría y nivel
router.get('/preguntasDos/:categoria/:nivel', (req, res) => {
  const { categoria, nivel } = req.params;
  
  PreguntaDosSchema
    .find({ categoria, nivel })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Editar pregunta
router.put('/preguntasDos/:id', upload.fields([{ name: 'imagen1', maxCount: 1 }, { name: 'imagen2', maxCount: 1 }]), (req, res) => {
  const { id } = req.params;
  const { categoria, nivel, respuestaNumerica } = req.body;
  const imagen1 = req.files.imagen1 ? req.files.imagen1[0].path : null;
  const imagen2 = req.files.imagen2 ? req.files.imagen2[0].path : null;

  const updateData = { categoria, nivel, respuestaNumerica };
  if (imagen1) updateData.imagen1 = imagen1;
  if (imagen2) updateData.imagen2 = imagen2;

  PreguntaDosSchema
  .updateOne({ _id: id }, { $set: updateData })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar una pregunta
router.delete('/preguntasDos/:id', (req, res) => {
  const { id } = req.params;

  PreguntaDosSchema
  .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
