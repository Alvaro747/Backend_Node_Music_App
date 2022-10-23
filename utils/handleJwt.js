const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

/**
 * pasar objeto del usuario "datos del usuario"
 * @param {*} user 
 */

const tokenSing = async (user) =>{
    const sing = jwt.sign(
        {
            _id:user._id,
            role:user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
        
    )
    return sing
}

/**
 * se debe pasar el token de sesion JWT
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) =>{
    try {
        return jwt.verify(tokenJwt,JWT_SECRET)
    } catch (e) {
        return null
    }
}

module.exports={
    tokenSing,
    verifyToken
}