const express = require("express");
const { createKyc, getOneKyc } = require("../Controller/kyc.controller");
const authentication = require("../Middlewares/auth.middleware");
const kycRoute = express.Router();

kycRoute.post("/kyc", authentication, createKyc);
kycRoute.get("/kyc", authentication, getOneKyc);

module.exports = kycRoute;
