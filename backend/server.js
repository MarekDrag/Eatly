import express from "express";
import dotenv from "dotenv";
dotenv.config();
import errorHandler from "./middleware/errorMiddleware";
import connectDB from "./config/db";
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/api/goals', require('./routes/goalRoutes.js'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port: ${port}`));