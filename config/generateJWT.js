const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJwtToken = (payload)=>{
    const options = {
        expiresIn: '7d' // Token expiration time
      };
    return jwt.sign(payload,process.env.JWT_SECRET,options);
}

module.exports = generateJwtToken;