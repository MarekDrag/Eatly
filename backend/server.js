const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const Goal = require('./models/goalModel');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port: ${port}`));


//test
async function main(){

    const goal = new Goal({
        text: 'hej'
    })

    await goal.save();
};

main();