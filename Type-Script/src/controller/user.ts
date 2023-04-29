import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/usermodel";

const userController = {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({ message: "Email already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user: IUser = new User({ name, email, password: hashedPassword });
      await user.save();

    //   const token = jwt.sign({ email: user.email }, "secret", {
    //     expiresIn: "1h",
    //   });
      res.status(201).json({ message: "User created", data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ message: "Authentication failed" });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ message: "Authentication failed" });
        return;
      }

      const token = jwt.sign({ email: user.email }, "secret", {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Authentication successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
export default userController;
