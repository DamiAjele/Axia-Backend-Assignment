const express = require("express");
const userRoute = require("./Routes/user.route");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

const app = express();

//Create connection
mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("connection was successful"))
.catch(() => console.log("oopa something went wrong!!!"))

app.use(express.json());
app.use(userRoute)

app.listen(5000, () => {
    console.log("app is running on port 5000")
});