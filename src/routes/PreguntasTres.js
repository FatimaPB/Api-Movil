const express = require('express');
const PreguntaTresSchema = require('../models/PreguntasTres');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('../config/cloudinaryConfig');

// Configuración de almacenamiento de Multer en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Función para subir imágenes a Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result.secure_url);
    }).end(fileBuffer);
  });
};

// Crear pregunta
router.post('/preguntasTres', upload.fields([{ name: 'imagen1', maxCount: 1 }, { name: 'imagen2', maxCount: 1 }]),async (req, res) => {
  const { categoria, nivel, pregunta, numeroUno, numeroDos, resultado } = req.body;

  let imagen1Url = null;
  let imagen2Url = null;

  
  if (req.files.imagen1) {
    imagen1Url = await uploadToCloudinary(req.files.imagen1[0].buffer);
  }

  if (req.files.imagen2) {
    imagen2Url = await uploadToCloudinary(req.files.imagen2[0].buffer);
  }


  const nuevaPreguntaTres = new PreguntaTresSchema({
    categoria,
    nivel,
    pregunta,
    numeroUno,
    numeroDos,
    resultado,
    imagen1: imagen1Url,
    imagen2: imagen2Url,
  });

  nuevaPreguntaTres
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// editar pregunta
router.put('/preguntasTres/:id', upload.fields([{ name: 'imagen1', maxCount: 1 }, { name: 'imagen2', maxCount: 1 }]),async (req, res) => {

  const {id} = req.params;
  const { categoria, nivel, pregunta, numeroUno, numeroDos, resultado } = req.body;

  let imagen1Url = null;
  let imagen2Url = null;

  
  if (req.files.imagen1) {
    imagen1Url = await uploadToCloudinary(req.files.imagen1[0].buffer);
  }

  if (req.files.imagen2) {
    imagen2Url = await uploadToCloudinary(req.files.imagen2[0].buffer);
  }


  const  updateData = {
    categoria,
    nivel,
    pregunta,
    numeroUno,
    numeroDos,
    resultado,
    ...(imagen1Url && { imagen1: imagen1Url }),
    ...(imagen2Url && { imagen2: imagen2Url }),
  };

  const updatedPreguntaTres = await PreguntaTresSchema.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedPreguntaTres) {
    return res.status(404).json({ message: 'Pregunta no encontrada' });
  }

  res.json(updatedPreguntaTres);
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

// Obtener preguntas por categoría y nivel
router.get('/preguntasTres/:categoria/:nivel', (req, res) => {
  const { categoria, nivel } = req.params;
  
  PreguntaTresSchema
    .find({ categoria, nivel })
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
