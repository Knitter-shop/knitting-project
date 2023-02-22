const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'No puedes guardar un producto si no estás registrado']
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtual: true
    }
  }
);

const Save = mongoose.model('Save', saveSchema);

module.exports = Save;