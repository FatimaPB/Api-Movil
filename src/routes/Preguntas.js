const express = require('express');
const PreguntaSchema = require('../models/Preguntas');
const router = express.Router();
const multer = require('multer'); // Importar multer
const path = require('path');

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + Date.now() + extension); // Nombre del archivo guardado
    }
  });

const upload = multer({ storage: storage });

// Crear pregunta
router.post('/preguntas', upload.single('imagenPregunta'), (req, res) => {
  const { categoria, nivel, pregunta, respuestaNumerica } = req.body;
  const imagenPregunta = req.file ? req.file.path : null;

  const nuevaPregunta = new PreguntaSchema({
    categoria,
    nivel,
    pregunta,
    respuestaNumerica,
    imagenPregunta
  });

  nuevaPregunta
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener todas las preguntas
router.get('/preguntas', (req, res) => {
  PreguntaSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener pregunta por su ID
router.get('/preguntas/:id', (req, res) => {
  const { id } = req.params;
  PreguntaSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Editar pregunta
router.put('/preguntas/:id', upload.single('imagenPregunta'), (req, res) => {
  const { id } = req.params;
  const { categoria, nivel, pregunta, respuestaNumerica } = req.body;
  const imagenPregunta = req.file ? req.file.path : null;

  const updateData = { categoria, nivel, pregunta, respuestaNumerica };
  if (imagenPregunta) {
    updateData.imagenPregunta = imagenPregunta;
  }

  PreguntaSchema
    .updateOne({ _id: id }, { $set: updateData })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar una pregunta
router.delete('/preguntas/:id', (req, res) => {
  const { id } = req.params;

  PreguntaSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
