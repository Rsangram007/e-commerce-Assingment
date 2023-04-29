import { Request, Response } from "express";
import User, { IUser } from "../models/usermodel";
import Product from "../models/ProductModel";

const wishlistController = {
  async addProduct(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      let { user } = req.body;

      const users = await User.findOne({ user });
      if (!users) {
        res.status(404).json({ message: "User not found" });
        return 
      }

      const product = await Product.findById(productId);
      if (!product) {
         res.status(404).json({ message: "Product not found" });
         return
      }

      if (user.wishlist.includes(productId)) {
         res.status(400).json({ message: "Product already in wishlist" });
         return
      }

      user.wishlist.push(productId);
      await user.save();

      res.status(201).json({ message: "Product added to wishlist", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getWishlist(req: Request, res: Response): Promise<void> {
    try {
      const { user } = req.params;

      const users = await User.findOne({ user }).populate("wishlist");
      if (!users) {
         res.status(404).json({ message: "User not found" });
         return 
      }

      const products = users;

      res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default wishlistController;
