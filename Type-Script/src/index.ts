import express, { request, response } from "express";
import { router } from "./routes/routes";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
const PORT = 3000;
mongoose
  .connect(
    "mongodb+srv://Rsangram890:hPZbgpmJvegZil8Q@cluster0.osqcdhn.mongodb.net/SearchingYArd?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: any) => {
    console.log(err);
  });
 // app.use(multer().any())
app.use("/", router);

app.use("/*", (req, res) => {
  res
    .status(400)
    .send({
      status: false,
      message: "Endpoint is not correct plese provide a proper end-point",
    });
});

app.listen(PORT, (): void => {
  console.log("Backend Server Is Running " + PORT);
});
