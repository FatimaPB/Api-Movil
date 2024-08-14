const express = require('express');
const PreguntaSchema = require('../models/Preguntas');
const router = express.Router();
const multer = require('multer'); // Importar multer
const cloudinary = require('../config/cloudinaryConfig');
const path = require('path');
const fs = require('fs');

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


router.post('/preguntas', upload.single('imagenPregunta'), async (req, res) => {
  try {

    let imagenUrl = null;
    if (req.file) {
      imagenUrl = await uploadToCloudinary(req.file.buffer);
    }

    const { 
      categoria,
       nivel, 
       pregunta,
       respuestaNumerica } = req.body;

    const nuevaPregunta = new PreguntaSchema({
      categoria,
      nivel,
      pregunta,
      respuestaNumerica,
      imagenPregunta : imagenUrl,
    });

    const savedPregunta = await nuevaPregunta.save();
    res.json(savedPregunta);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Error creating question', error: error.message });
  }
});

router.put('/preguntas/:id', upload.single('imagenPregunta'), async (req, res) => {
  try {
    const { categoria,
       nivel, 
       pregunta, 
       respuestaNumerica 
      } = req.body;
 
      let imagenUrl = null;
      if (req.file) {
        imagenUrl = await uploadToCloudinary(req.file.buffer);
      }
  
    const updateData = await PreguntaSchema.findByIdAndUpdate( 
      req.params.id,
      {
         categoria, 
        nivel,
        pregunta, 
        respuestaNumerica ,
        imagenPregunta : imagenUrl || undefined,
      },
      {new : true}
    );

    if (!updateData) {
      return res.status(404).json({ message: 'pregunta no encontrada' });
    }
    res.json(updateData);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Error updating question', error: error.message });
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
