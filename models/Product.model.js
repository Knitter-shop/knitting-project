const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    productName: {
      type: String,
      required: [true, 'Product name is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    image: {
      type: String,
      required: [true, 'File format is not supported'],
    },
    patternPrice: {
      type: Number
    },
    videoTutorial: {
      type: String
    },
    kitPrice: {
      type: Number
    },
    productPrice: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

productSchema.virtual('likes', {
  ref: 'Like',
  foreignField: 'product',
  localField: '_id',
  justOne: false
})

productSchema.virtual('saves', {
  ref: 'Save',
  foreignField: 'product',
  localField: '_id',
  justOne: false
})

productSchema.virtual('purchase', {
  ref: 'Purchase',
  foreignField: 'product',
  localField: '_id',
  justOne: false
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;