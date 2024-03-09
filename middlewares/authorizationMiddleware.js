const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const authorizationMiddleware = async (req, res, next) => {
    // check the JWT is provided
    let header = req.headers.authorization;

    if(!header) {
        return res.status(401).json({error : 'No JWT provided.'});
    }

    // check if the authorization header is valid
    header = header.split(' ');
    if(!(header.length === 2 && header[0] === 'Bearer')){
        return res.status(401).json({error : 'Invalid JWT.'});
    }

    try {
        const { id } = jwt.verify(header[1], process.env.JWT_SECRET);
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({error : 'User not found.'});
        }

        req.user = user;

        next();
    }catch(err) {
        if (err.name === "TokenExpiredError") {
            console.log(process.env.JWT_EXPIRE);
            return res.status(401).json({ error : "Your token has expired. Please try to log in again. " });
        }
        res.status(401).json({ error: "Invalid token. " });
    }
}

module.exports.authorizationMiddleware = authorizationMiddleware;