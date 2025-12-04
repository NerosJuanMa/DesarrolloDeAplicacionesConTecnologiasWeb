const mongoose = require('mongoose');

// 📝 MANUAL: ¿Qué es un Schema?
// Un Schema define la estructura de los documentos en MongoDB
// Es como un "molde" que especifica qué campos debe tener cada documento

const cancionSchema = new mongoose.Schema({
  // 📋 Campo título - obligatorio
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true, // Elimina espacios al inicio y final
    maxlength: [100, 'El título no puede exceder 100 caracteres']
  },
  
  // 👨‍🎤 Campo artista - obligatorio  
  artista: {
    type: String,
    required: [true, 'El artista es obligatorio'],
    trim: true,
    maxlength: [50, 'El nombre del artista no puede exceder 50 caracteres']
  },
  
  // 💿 Campo álbum - opcional
  album: {
    type: String,
    trim: true,
    maxlength: [100, 'El nombre del álbum no puede exceder 100 caracteres']
  },
  
  // 📅 Campo año - con validación de rango
  año: {
    type: Number,
    min: [1900, 'El año debe ser mayor a 1900'],
    max: [new Date().getFullYear(), 'El año no puede ser futuro']
  },
  
  // 🎵 Campo género - con opciones limitadas
  genero: {
    type: String,
    enum: {
      values: ['Rock', 'Pop', 'Jazz', 'Blues', 'Clásica', 'Reggaeton', 'Hip-hop', 'Electrónica', 'Country', 'Folk'],
      message: 'Género no válido'
    }
  },
  
  // ⏱️ Campo duración - formato mm:ss
  duracion: {
    type: String,
    match: [/^[0-9]{1,2}:[0-5][0-9]$/, 'Formato de duración inválido (usar mm:ss)']
  },
  
  // 📅 Timestamps automáticos
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

// 📝 MANUAL: ¿Qué hace mongoose.model()?
// Crea un modelo basado en el schema
// El modelo nos permite interactuar con la colección en MongoDB
// Primer parámetro: nombre del modelo (se convertirá en 'canciones' en la BD)
// Segundo parámetro: el schema que acabamos de definir

const Cancion = mongoose.model('Cancion', cancionSchema);

module.exports = Cancion;
