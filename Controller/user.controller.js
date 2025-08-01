const jwt = require("jsonwebtoken");
const userModel = require("../Model/user.model");
const bcrypt = require("bcrypt");

// For registration
const createUser = async (req, res) => {

    const {email, password, ...others} = req.body; // To collect the user registration details

    // To check if email and password already exists
    if (!email || !password) {
        return res.json({message: "Please provide Valid Registration Credentials"});
    };

    //check if user exists in database
    const isUser = await userModel.findOne(
        {email:email}
    );

    if (isUser) {
        return res.json({ message: "User already exists, please login to your account" })
    };

    // create hashed password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)
    console.log(hashedPassword)

    // continue with registration
    try {
        const newUser = new userModel({email, password: hashedPassword, ...others});
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        console.log(error)
        return res.send(error.message);
    }
};

// For login Users
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{

    //check if this user already exists in the database
    const isUser = await userModel.findOne({email:email})

    if (!isUser) {
        return res.json({ message: "This account does not exist, create account"})
    };

    // Compare password
    const isValid = bcrypt.compareSync(password, isUser.password)

    if (!isValid) {
        return res.json({ message: "Invalid Password"})
    }

    // create token
    const token = jwt.sign(
        {id: isUser.id, name: isUser.name, admin: isUser.admin},
        process.env.JWT_SECRET,
        {expiresIn: "100hr"}
    )
    // return basic information
    return res
    .cookie("token", token, {
        maxAge: 72 * 60 * 60 * 60,
        secure: true,
        httpOnly: true,
    });
} catch(error) {
    console.log(error.message)
    return res.send(error.message)
}};

// Get all Users

const getUsers = async (req, res) => {
    try{
    const getAllUsers = await userModel.find()

    res.status(200).json(getAllUsers);
} catch(error){
    console.log(error)
    res.send(error.message)
}};


// Get one user
const getOneUser = async (req, res) => {
    const {id} = req.user;

    try{
        const getUser = await userModel.findById(id).populate("kyc").populate("posts");
        return res.status(200).json(getUser)

    } catch(error) {
        return res.send(error.message)
    }
};


// Update Users
const updateUsers = async (req, res) => {
    const {id} = req.query;
    const payload = req.body;
try {
    const updatedUser = await userModel.findByIdAndUpdate(
        id, 
        {...payload}, 
        {new: true}
    );

    return res.status(200).json(updatedUser);
} catch(error) {
    console.log(error)
    return res.send(error.message)
}};

// Delete User
const deleteUser = async (req, res) => {
    const {id} = req.query;
    try{
    const deletedUser = await userModel.findByIdAndDelete(id)
    return res.status(200).json(deletedUser)
} catch(error) {
    console.log(error)
    return res.send(error.message)
}};


module.exports = {createUser, loginUser, getOneUser, getUsers, updateUsers, deleteUser};