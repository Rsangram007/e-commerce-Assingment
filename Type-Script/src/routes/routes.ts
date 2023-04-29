import express from "express";
const router = express.Router();
import userController from "../controller/user";
import productController from "../controller/Product";
import upload from "../libs/multer";
import wishlistController from "../controller/Wishlist";
router.post("/register", userController.register);
router.post("/login", userController.login);

router
  .route("/createProduct")
  .get(productController.read)  
  .post(upload.single("image"), productController.create);

router.route("/createProduct/:id")
      .get(productController.getPhotobyid)
      .put(productController.update)
      .delete(productController.delete)

router.route("/Whishlist")
      .post(wishlistController.addProduct)
      .get(wishlistController.getWishlist)

export { router };
