const Product = require("../models/Product.model");
const Purchase = require("../models/Purchase.model")
const mongoose = require("mongoose");
const { sendPurchaseEmail } = require("../config/mailer.config");

module.exports.create = (req, res, next) => {
  res.render(`product/purchase-confirmation`);
};

module.exports.doCreate = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId)
    .then((product) => {
      const newPurchase = {
        product,
        user: req.user,
      };

      Purchase.create(newPurchase)
        .then((purchase) => {
          // res.send(200, purchase)
          
          res.render(`product/purchase-confirmation`, {purchase});
        })
        .catch((err) => {
          console.log(err)
          res.render(`product/product-detail`, {
            product,
            errors: err.errors,
          });
        });
    })
    .catch(next)
};


module.exports.confirmation = (req, res, next) => {
  Purchase.findById(req.params.id)

    .then((purchase) => {
      res.render(`products/purchase-confirmation`, { purchase });
    })
    .catch((err) => next(err));
};

module.exports.doConfirmation = (req, res, next) => {
  const updates = req.body 

  Purchase.findByIdAndUpdate(req.params.id, { location: updates }, { new: true }) //{ location: updates, confirmed: true }
    .then((purchase) => {
      return Purchase.findById(purchase.id)
        .populate('product')
        .then(purchaseFound => {
          sendPurchaseEmail(req.user, purchaseFound.product)
          res.redirect(`/products/${purchase.id}/purchase-confirmed`);
        })
    })
    .catch((err) =>{
      console.log(err)
      next(err)
    });
};

module.exports.confirmed = (req, res, next) => {
  Purchase.findById(req.params.id)
    .populate('product')
    .populate('user')

    .then((purchase) => {
      console.log ('aquíiiiiiiii', purchase)
      res.render(`product/purchase-confirmed`, { purchase });
    })
    .catch((err) => next(err));
};
