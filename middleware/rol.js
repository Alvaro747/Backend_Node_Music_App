const {hadleHttpError, handleHttpError}= require('../utils/handleError')

/**
 * array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */

const checkRol = (roles)=> (req,res,next) =>{
    try {
        const {user}= req
        const rolesByUser = user.role
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))
        
        if(!checkValueRol){
            hadleHttpError(res,'USER_NOT_PERMISSION',403)
        }
        next()
    } catch (e) {
        handleHttpError(res,'Error_permissions',403)
    }    
   
}

module.exports= checkRol