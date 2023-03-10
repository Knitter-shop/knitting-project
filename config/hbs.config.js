const hbs = require("hbs");
const path = require("path");

hbs.registerPartials(path.join(__dirname, "../views/partials"));

hbs.registerHelper('isOwner', function (options) {
  const { currentUser, product } = options.hash;
  if (currentUser && product && product.user && currentUser.id === String(product.user._id)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

hbs.registerHelper("hasLike", function (options) {
  const { currentUser, product } = options.hash;
  if (
    currentUser.likes.some((like) => like.product.toString() === product.id)
  ) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("hasSave", function (options) {
  const { currentUser, product } = options.hash;
  if (
    currentUser.saves.some((save) => save.product.id.toString() === product.id)
  ) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("hasPurchase", function (options) {
  const { currentUser, product } = options.hash;
  if (
    currentUser.purchases.some((purchase) => purchase.product.id.toString() === product.id)
  ) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});