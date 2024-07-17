const mongoose = require('mongoose');

const PreguntaSchema = mongoose.Schema({
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
  respuestaNumerica: {
    type: Number,
    required: true
  },
  imagenPregunta: {
    type: String  // Opcional: si hay una imagen asociada a la pregunta
  }
});

module.exports = mongoose.model('Pregunta', PreguntaSchema);
