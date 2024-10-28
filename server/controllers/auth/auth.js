const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const User=require('../../models/users')
const jwt=require('jsonwebtoken')




const registerUser = async (req,res)=>{

    const {userName,email,password}=req.body

    const hashedPassword= await bcrypt.hash(password,12)

    try {

        const checkUser=await User.findOne({email})
        if(checkUser){
            return res.json({
                success:false,
                message:'User already exists with this Userame or Email.Please prvode a new one!'
            })
        }
        const newUser= new User({
            userName,
            email,
            password:hashedPassword
        })

        await newUser.save();

        res.status(200).json({
            success:true,
            message:'Registraion successful!'
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:'Some Error occurred!'
        })
    }
}


const loginUser = async (req,res)=>{

    const {email,password}=req.body

    

    try {
        const user=await User.findOne({email})
        if(!user){
            return res.json({
                success:false,
                message:'No user found with the given email!'
            })
        }

    const checkPassword= await bcrypt.compare(password,user.password)

    if(!checkPassword){
        return res.json({
            success:false,
            message:'Wrong email or password!'
        })
    }

    const token=jwt.sign({
        id:user._id,
        role:user.role,
        email:user.email,
        userName:user.userName
    },'CLIENT_SECRET_KEY',{expiresIn:'60m'})

    res.cookie('token',token,{httpOnly:true,secure:false}).json({
        success:true,
        message:'Logged in successfully',
        user:{
            id:user._id,
            email:user.email,
            role:user.role,
            userName:user.userName
        }
    })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:'Some Error occurred!'
        })
    }
}


const logout=async(req,res)=>{
    res.clearCookie('token').json({
        success: true,
        message: 'Logged out successfully'
    })
}

const authMiddleware=async(req,res,next)=>{
    const token=req.cookies.token

    if(!token){
       return res.json({
            success: false,
            message: 'Unauthorized user!'
        })
    }
    try {
        const decoded=jwt.verify(token,'CLIENT_SECRET_KEY');
        req.user=decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: 'Unauthorized user!'
        })
    }
    
}

module.exports={ registerUser,loginUser,logout,authMiddleware }