import { Request, Response } from "express";
import Product, { IProduct } from "../models/ProductModel";

const productController = {
  async create(req: Request, res: Response): Promise<Response> {
    let { title, description } = req.body;

    const newPhoto = { title, description, image: req.file!.path };
    const photo = new Product(newPhoto);
    await photo.save();
    return res.json({
      message: "Photo Saved Successfully",
      photo,
    });
  },

  async getPhotobyid(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Product.findById(id);
    return res.json(photo);
  },

  async read(req: Request, res: Response): Promise<void> {
    try {
      const products = await Product.find();

      res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, image } = req.body;

      const product = await Product.findByIdAndUpdate(
        id,
        { title, description, image },
        { new: true }
      );
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.status(200).json({ message: "Product updated", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.status(200).json({ message: "Product deleted", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default productController;
