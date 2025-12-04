import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  asientos: { type: Number, required: true },
  fecha: { type: String, required: true }
});

export default mongoose.model('Reserva', reservaSchema);
