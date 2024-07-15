const mongoose = require('mongoose');

const RespuestaSchema = mongoose.Schema({
  texto: {
    type: String,
    required: true
  },
  imagen: {
    type: String
  }
});

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
  respuestas: [RespuestaSchema],
  respuestaCorrecta: {
    type: String,
    required: true
  },
  imagenCorrecta: {
    type: String
  }
});

module.exports = mongoose.model('Pregunta', PreguntaSchema);
