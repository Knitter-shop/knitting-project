const router = require("express").Router();
const upload = require("../config/cloudinary.config");
const passport = require("passport");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

/* Main route */
router.get("/", (req, res, next) => res.send("Hello world"));

//SignUp
router.get("/signup", authMiddleware.isNotAuthenticated, authController.signup);
router.post(
  "/signup",
  authMiddleware.isNotAuthenticated,
  authController.doSignup
);

//Login
router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post(
  "/login",
  authMiddleware.isNotAuthenticated,
  authController.doLogin
);

router.get(
  "/login/google",
  passport.authenticate("google-auth", {
    scope: GOOGLE_SCOPES,
    prompt: "select_account",
  })
);
router.get("/auth/google/callback", authController.doLoginGoogle);

router.get("/logout", authMiddleware.isAuthenticated, authController.doLogout);

//User
router.get("/profile", authMiddleware.isAuthenticated, userController.profile);
router.get(
  "/profile/:id/edit",
  authMiddleware.isAuthenticated,
  userController.edit
);
router.post(
  "/profile/:id/edit",
  authMiddleware.isAuthenticated,
  userController.doEdit
);

router.get("/products", userController.products);

//Create products
router.get(
  "/products/new-product",
  authMiddleware.isAuthenticated,
  productController.create
);
router.post(
  "/products/new-product",
  authMiddleware.isAuthenticated,
  upload.single("image"),
  productController.doCreate
);

router.post(
  "/products/:id/delete",
  authMiddleware.isAuthenticated,
  productController.delete
);

//Edit products

router.get(
  "/product/:id/edit",
  authMiddleware.isAuthenticated,
  productController.edit
);
router.post(
  "/product/:id/edit",
  authMiddleware.isAuthenticated,
  upload.single("image"),
  productController.doEdit
);

//Likes
router.post(
  "/products/:id/like",
  authMiddleware.isAuthenticated,
  userController.like
);

//Saves
router.post("/products/:id/save", authMiddleware.isAuthenticated, userController.save)



router.get("/products/:id/detail", productController.detail);

module.exports = router;
