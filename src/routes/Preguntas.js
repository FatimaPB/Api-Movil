const express = require('express');
const PreguntaSchema = require('../models/Preguntas');
const router = express.Router();
const multer = require('multer'); // Importar multer
const cloudinary = require('../config/cloudinaryConfig');
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
router.post('/preguntas', upload.single('imagenPregunta'), async (req, res) => {
  try {
    const { categoria, nivel, pregunta, respuestaNumerica } = req.body;
    let imagenPregunta = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path); // Subir imagen a Cloudinary
      imagenPregunta = result.secure_url; // Obtener la URL de la imagen desde Cloudinary
    }

    const nuevaPregunta = new PreguntaSchema({
      categoria,
      nivel,
      pregunta,
      respuestaNumerica,
      imagenPregunta
    });

    const savedPregunta = await nuevaPregunta.save();
    res.json(savedPregunta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Editar pregunta
router.put('/preguntas/:id', upload.single('imagenPregunta'), async (req, res) => {
  try {
    const { id } = req.params;
    const { categoria, nivel, pregunta, respuestaNumerica } = req.body;
    let imagenPregunta = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path); // Subir imagen a Cloudinary
      imagenPregunta = result.secure_url; // Obtener la URL de la imagen desde Cloudinary
    }

    const updateData = { categoria, nivel, pregunta, respuestaNumerica };
    if (imagenPregunta) {
      updateData.imagenPregunta = imagenPregunta;
    }

    const updatedPregunta = await PreguntaSchema.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedPregunta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

// Obtener preguntas por categoría y nivel
router.get('/preguntas/:categoria/:nivel', (req, res) => {
  const { categoria, nivel } = req.params;
  
  PreguntaSchema
    .find({ categoria, nivel })
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
