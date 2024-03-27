import mongoose from "mongoose"

const ContactForm = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true })
mongoose.models = {}
module.exports = mongoose.model('ContactForm', ContactForm)