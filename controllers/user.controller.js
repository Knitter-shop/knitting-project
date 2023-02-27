const Product = require("../models/Product.model");
const Like = require("../models/Like.model");
const User = require("../models/User.model");
const Save = require("../models/Save.model");
const Purchase = require("../models/Purchase.model");

module.exports.profile = (req, res, next) => {
  console.log(res.locals)
  res.render("user/profile");
};

module.exports.products = (req, res, next) => {
  Product.find()
    .populate("user")
    .populate("likes")
    .populate("saves")
    .populate("purchase")
    .then((products) => {
      const shuffledProducts = shuffle(products);
      res.render("product/all-products", { products: shuffledProducts });
    })
    .catch((err) => next(err));
};

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

module.exports.like = (req, res, next) => {
  const user = req.user.id;
  const product = req.params.id;

  const like = {
    user,
    product,
  };

  Like.findOne({ user, product })
    .then((dbLike) => {
      if (dbLike) {
        return Like.findByIdAndDelete(dbLike.id).then((createdLike) => {
          res.status(204).json({ like: createdLike });
        });
      } else {
        return Like.create(like).then(() => {
          res.status(201).json({ ok: true });
        });
      }
    })
    .catch((err) => next(err));
};

module.exports.edit = (req, res, next) => {
  User.findById(req.params.id)

    .then((user) => {
      res.render("user/edit-profile", { user });
    })
    .catch((err) => next(err));
};

module.exports.doEdit = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body)

    .then((user) => {
      res.redirect(`/profile/${user.id}/edit`);
    })
    .catch((err) => next(err));
};

module.exports.save = (req, res, next) => {
  const user = req.user.id;
  const product = req.params.id;

  const save = {
    user,
    product,
  };

  Save.findOne({ user, product })
    .then((dbSave) => {
      if (dbSave) {
        return Save.findByIdAndDelete(dbSave.id).then((createdSave) => {
          res.status(204).json({ save: createdSave });
        });
      } else {
        return Save.create(save).then(() => {
          res.status(201).json({ ok: true });
        });
      }
    })
    .catch((err) => next(err));
};

module.exports.purchase = (req, res, next) => {
  const user = req.user.id;
  const product = req.params.id;

  const purchase = {
    user,
    product,
  };

  Purchase.findOne({ user, product })
    .then((Purchase) => {
        return Purchase.create(purchase).then(() => {
          res.status(201).json({ ok: true });
        });
      }
    )
    .catch((err) => next(err));
};

