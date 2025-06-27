const jwt = require("jsonwebtoken");
const userModel = require("../Model/user.model");
const bcrypt = require("bcrypt");

// For registration
const createUser = async (req, res) => {

    const {email, password, ...others} = req.body; // To collect the user registration details

    // To check if email and password already exists
    if (!email || !password) {
        return res.send("Please provide valid registration credentials");
    };

    //check if user exists in database
    const isUser = await userModel.findOne(
        {email:email}
    );

    if (isUser) {
        return res.send("User already exists, please login to your account")
    };

    // create hashed password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)
    console.log(hashedPassword)

    // continue with registration
    try {
        const newUser = new userModel({email, password: hashedPassword, ...others});
        const savedUser = await newUser.save();
        return res.json(savedUser)
    } catch (error) {
        console.log(error)
        return res.send('something went wrong');
    }
};

// For login Users
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{

    //check if this user already exists in the database
    const isUser = await userModel.findOne({email:email})

    if (!isUser) {
        return res.send("This account does not exist, create account")
    };

    // Compare password
    const isValid = bcrypt.compareSync(password, isUser.password)

    if (!isValid) {
        return res.send("Invalid Password")
    }

    // create token
    const token = jwt.sign(
        {id: isUser.id, name: isUser.name, admin: isUser.admin},
        process.env.JWT_SECRET,
        {expiresIn: "72hr"}
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

    res.json(getAllUsers);
} catch(error){
    console.log(error)
    res.send("Something went wrong")
}};


// Get one user
const getOneUser = async (req, res) => {
    const {id} = req.user;

    try{
        const getUser = await userModel.findById(id).populate("kyc").populate("posts");
        return res.json(getUser)

    } catch(error) {
        return res.send("something went wrong")
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

    return res.json(updatedUser);
} catch(error) {
    console.log(error)
    return res.send("Something went wrong")
}};

// Delete User
const deleteUser = async (req, res) => {
    const {id} = req.query;
    try{
    const deletedUser = await userModel.findByIdAndDelete(id)
    return res.json(deletedUser)
} catch(error) {
    console.log(error)
    return res.send("something went wrong")
}};


module.exports = {createUser, loginUser, getOneUser, getUsers, updateUsers, deleteUser};