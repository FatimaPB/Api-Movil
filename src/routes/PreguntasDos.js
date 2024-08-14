const express = require('express');
const PreguntaDosSchema = require('../models/PreguntasDos');
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

// Crear preguntaDos
router.post('/preguntasDos', upload.fields([{ name: 'imagen1', maxCount: 1 }, { name: 'imagen2', maxCount: 1 }]), async (req, res) => {
  try {
    const { categoria, nivel, respuestaNumerica } = req.body;

    let imagen1Url = null;
    let imagen2Url = null;

    if (req.files.imagen1) {
      imagen1Url = await uploadToCloudinary(req.files.imagen1[0].buffer);
    }

    if (req.files.imagen2) {
      imagen2Url = await uploadToCloudinary(req.files.imagen2[0].buffer);
    }

    const nuevaPreguntaDos = new PreguntaDosSchema({
      categoria,
      nivel,
      respuestaNumerica,
      imagen1: imagen1Url,
      imagen2: imagen2Url,
    });

    const savedPreguntaDos = await nuevaPreguntaDos.save();
    res.json(savedPreguntaDos);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Error creating question', error: error.message });
  }
});

// Editar preguntaDos
router.put('/preguntasDos/:id', upload.fields([{ name: 'imagen1', maxCount: 1 }, { name: 'imagen2', maxCount: 1 }]), async (req, res) => {
  try {
    const { id } = req.params;
    const { categoria, nivel, respuestaNumerica } = req.body;

    let imagen1Url = null;
    let imagen2Url = null;

    if (req.files.imagen1) {
      imagen1Url = await uploadToCloudinary(req.files.imagen1[0].buffer);
    }

    if (req.files.imagen2) {
      imagen2Url = await uploadToCloudinary(req.files.imagen2[0].buffer);
    }

    const updateData = {
      categoria,
      nivel,
      respuestaNumerica,
      ...(imagen1Url && { imagen1: imagen1Url }),
      ...(imagen2Url && { imagen2: imagen2Url }),
    };

    const updatedPreguntaDos = await PreguntaDosSchema.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPreguntaDos) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }

    res.json(updatedPreguntaDos);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Error updating question', error: error.message });
  }
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
// Eliminar una pregunta
router.delete('/preguntasDos/:id', (req, res) => {
  const { id } = req.params;

  PreguntaDosSchema
  .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
