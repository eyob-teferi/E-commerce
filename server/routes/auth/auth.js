const express=require('express')
const {registerUser,loginUser,logout,authMiddleware}=require('../../controllers/auth/auth')

const route=express.Router();


route.post('/register',registerUser)
route.post('/login',loginUser)
route.post('/logout',logout)
route.get('/check-auth',authMiddleware,(req,res)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        message:'Authenticated user!',
        user
    })
})


module.exports=route