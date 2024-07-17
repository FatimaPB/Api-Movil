const mongoose = require('mongoose');

const PreguntaDosSchema = mongoose.Schema({
  categoria: {
    type: String,
    required: true
  },
  nivel: {
    type: String,
    required: true
  },
  imagen1: {
    type: String, // Ruta de la primera imagen
    required: true
  },
  imagen2: {
    type: String, // Ruta de la segunda imagen
    required: true
  },
  respuestaNumerica: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('PreguntaDos', PreguntaDosSchema);
