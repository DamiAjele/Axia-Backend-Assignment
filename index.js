const express = require("express");
const userRoute = require("./Routes/user.route");
const kycRoute = require("./Routes/kyc.route");
const postRoute = require("./Routes/post.route");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config()

const app = express();

//Create connection
mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("connection was successful"))
.catch((error) => console.log(error))

app.use(express.json());
app.use(cookieParser);

//Creating endpoints
app.use(userRoute);
app.use(kycRoute);
app.use(postRoute);

app.listen(5000, () => {
    console.log("app is running on port 5000")
});