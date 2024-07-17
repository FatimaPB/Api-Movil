const mongoose = require('mongoose');

const PreguntaTresSchema = mongoose.Schema({
  categoria: {
    type: String,
    required: true
  },
  nivel: {
    type: String,
    required: true
  },
  pregunta: {
    type: String,
    required: true
  },
  numeroUno: {
    type: Number,
    required: true
  },
  imagen1: {
    type: String, // Ruta de la imagen asociada a numeroUno
    required: true
  },
  numeroDos: {
    type: Number,
    required: true
  },
  imagen2: {
    type: String, // Ruta de la imagen asociada a numeroDos
    required: true
  },
  resultado: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('PreguntaTres', PreguntaTresSchema);
