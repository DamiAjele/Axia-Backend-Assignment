const express = require("express");
const {createUser, loginUser, getUsers, updateUsers, deleteUser} = require("../Controller/user.controller");

const userRoute = express.Router()

userRoute.post("/", createUser);
userRoute.post("/user-login", loginUser)
userRoute.get("/", getUsers);
userRoute.put("/", updateUsers);
userRoute.delete("/", deleteUser);

module.exports = userRoute;