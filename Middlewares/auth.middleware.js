const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    const { token } = req.cookies;
    if(!token){
        return res.json({message: "please login"})
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if(error) {
            return res.json({message: "session expired"})
        }
    })

    req.user = {id: payload.id, admin: payload.admin, name: payload.name}

    next()
};

module.exports = authentication;
