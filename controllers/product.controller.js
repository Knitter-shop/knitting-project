const Product = require("../models/Product.model");
const mongoose = require("mongoose");

module.exports.create = (req, res, next) => {
  res.render("product/form-product");
};

module.exports.doCreate = (req, res, next) => {
  console.log(req.body);
  const newProduct = {
    ...req.body,
    user: req.user.id,
    image: req.file.path,
  };

  Product.create(newProduct)
    .then((product) => {
      res.redirect("/products");
    })
    .catch((err) => {
      if (mongoose.Error.ValidationError) {
        res.render("product/form-product", {
          product: req.body.body,
          errors: err.errors,
        });
      }
      next(err);
    });
};

module.exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => next(err));
};

module.exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.render("product/product-detail", { product });
    })
    .catch((err) => console.error(err));
};

module.exports.edit = (req, res, next) => {
  Product.findById(req.params.id)

    .then((product) => {
      res.render(`product/form-product`, { product });
    })
    .catch((err) => next(err));
};

module.exports.doEdit = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body)

    .then((product) => {
      res.redirect(`/product/${product.id}/detail`);
    })
    .catch((err) => next(err));
};