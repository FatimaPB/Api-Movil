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
router.post('/preguntas', upload.fields([
  { name: 'imagen1', maxCount: 1 },
  { name: 'imagen2', maxCount: 1 },
  { name: 'imagen3', maxCount: 1 },
  { name: 'imagen4', maxCount: 1 },
  { name: 'imagenCorrecta', maxCount: 1 }
]), (req, res) => {
  const {
    categoria,
    nivel,
    pregunta,
    respuesta1,
    respuesta2,
    respuesta3,
    respuesta4,
    respuestaCorrecta
  } = req.body;

  const imagen1 = req.files.imagen1 ? req.files.imagen1[0].path : null;
  const imagen2 = req.files.imagen2 ? req.files.imagen2[0].path : null;
  const imagen3 = req.files.imagen3 ? req.files.imagen3[0].path : null;
  const imagen4 = req.files.imagen4 ? req.files.imagen4[0].path : null;
  const imagenCorrecta = req.files.imagenCorrecta ? req.files.imagenCorrecta[0].path : null;

  const nuevaPregunta = PreguntaSchema({
    categoria,
    nivel,
    pregunta,
    respuestas: [
      { texto: respuesta1, imagen: imagen1 },
      { texto: respuesta2, imagen: imagen2 },
      { texto: respuesta3, imagen: imagen3 },
      { texto: respuesta4, imagen: imagen4 }
    ],
    respuestaCorrecta,
    imagenCorrecta
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
router.put('/preguntas/:id', upload.fields([
  { name: 'imagen1', maxCount: 1 },
  { name: 'imagen2', maxCount: 1 },
  { name: 'imagen3', maxCount: 1 },
  { name: 'imagen4', maxCount: 1 },
  { name: 'imagenCorrecta', maxCount: 1 }
]), (req, res) => {
  const { id } = req.params;
  const {
    categoria,
    nivel,
    pregunta,
    respuesta1,
    respuesta2,
    respuesta3,
    respuesta4,
    respuestaCorrecta
  } = req.body;

  const imagen1 = req.files.imagen1 ? req.files.imagen1[0].path : null;
  const imagen2 = req.files.imagen2 ? req.files.imagen2[0].path : null;
  const imagen3 = req.files.imagen3 ? req.files.imagen3[0].path : null;
  const imagen4 = req.files.imagen4 ? req.files.imagen4[0].path : null;
  const imagenCorrecta = req.files.imagenCorrecta ? req.files.imagenCorrecta[0].path : null;

  PreguntaSchema
    .updateOne(
      { _id: id },
      {
        $set: {
          categoria,
          nivel,
          pregunta,
          respuestas: [
            { texto: respuesta1, imagen: imagen1 },
            { texto: respuesta2, imagen: imagen2 },
            { texto: respuesta3, imagen: imagen3 },
            { texto: respuesta4, imagen: imagen4 }
          ],
          respuestaCorrecta,
          imagenCorrecta
        }
      }
    )
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
