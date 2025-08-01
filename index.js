const express = require("express");
const userRoute = require("./Routes/user.route");
const kycRoute = require("./Routes/kyc.route");
const postRoute = require("./Routes/post.route");
const fileRoute = require("./Routes/file.route");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config()

const app = express();

const port = process.env.PORT || 5000;

//Create connection
mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("connection was successful"))
.catch((error) => console.log(error))

app.use(express.json());
app.use(cookieParser);
app.use((error, req, res, next) => {
    return res.status(error.status || 501).json({message: error.message || "Something went wrong"})
});

//Creating endpoints
app.use(userRoute);
app.use(kycRoute);
app.use(postRoute);
app.use(fileRoute);

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
});