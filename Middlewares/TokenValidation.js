const jwt= require('jsonwebtoken');

const TokenValidation = (req,res,next) =>{
    const token = req.header('x-auth-token');
    
    if (!token){
        return res.status(401).json(
            {
                msg:"No tkoen,Authorization denied"
            }
        )
    }

    try{
        const DecodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.userId=DecodedToken.Id;
        next();
    }
    catch(error){
        res.status(401).json(
            {
                msg:'Token is not valid'
            }
        )
    }
}
module.exports={TokenValidation};