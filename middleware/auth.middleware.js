const jwt =require("jsonwebtoken");

const authenticate=(req,res,next)=>{
    const token =req.headers.authorization;
    if(token){
        const decoded=jwt.verify(token,"nagaraj");
        if(decoded){
            const userID=decoded.userID
            req.body.userID=userdID;
            next();
        }else{
            res.send("please login");
        }
    }else{
        res.send("plese log in")
    }
};
module.exports={
    authenticate
}