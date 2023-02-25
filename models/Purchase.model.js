const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'No puedes comprar un producto si no estás registrado']
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    location: {
      address: String,
      number: Number,
      additionalInfo: String,
      city: String,
      zip: Number,
      country: String
    },
  },
  {
    timestamps: true,
    toObject: {
      virtual: true
    }
  }
);


const Purchase = mongoose.model('Purchase', saveSchema);

module.exports = Purchase;