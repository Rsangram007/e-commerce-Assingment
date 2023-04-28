const express = require('express');
const route = require('./routes/router.js');
const mongoose = require('mongoose');
const app = express();
const dotenv = require("dotenv")
const multer = require("multer")
const PORT = process.env.PORT || 3000
dotenv.config()
app.use(express.json());

app.use(multer().any())

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, {
   
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"), err => console.log(err))

   
app.use('/', route);


app.listen(PORT, function () {
    console.log('Express app running on port ' + PORT)
});