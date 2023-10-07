import express from "express";
import apiRoute, { apiProtected } from "./routes/api.js";
import mongoose from "mongoose";

import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from "cors"
import path from "path";
import dotenv from 'dotenv';
import { fileURLToPath } from "url";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path:path.join(__dirname,"config/config.env")})

const app = express();
mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    // Start your server or perform other operations
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    // Handle the connection error
  });



app.use(cors());
app.use(express.json());
app.use('/api/', apiRoute);
app.use('/api/', AuthMiddleware,apiProtected);

console.log(process.env.NODE_ENV === "production")
console.log('__dirname:', __dirname);
console.log('Resolved path:', path.resolve( 'client/build/index.html'));


if (process.env.NODE_ENV === "production") {
 app.use( express.static(path.join(__dirname,'../client/build')));
 app.get('*',(req, res) => {
   res.sendFile(path.resolve(__dirname,'../client/build/index.html'))
 })
  
}

app.listen(process.env.PORT,()=>console.log('server is running'))
