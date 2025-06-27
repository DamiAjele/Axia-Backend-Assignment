const express = require("express");
const {createUser, loginUser, getOneUser, getUsers, updateUsers, deleteUser} = require("../Controller/user.controller");
const authentication = require("../Middlewares/auth.middleware");

const userRoute = express.Router()

userRoute.post("/", createUser);
userRoute.post("/user-login", loginUser);
userRoute.get("/single-user",authentication, getOneUser);
userRoute.get("/", getUsers);
userRoute.put("/", updateUsers);
userRoute.delete("/", deleteUser);

module.exports = userRoute;