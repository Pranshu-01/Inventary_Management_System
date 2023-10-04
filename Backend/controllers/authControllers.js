const User=require('../models/userSchema');
const CryptoJS=require('crypto-js');

const register=async(req,res)=>{
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    })
    try{
        const savedUser=await newUser.save();
        res.status(200).json(savedUser);
    }
    catch(err){
        res.status(500).json(`It looks like you're already a Member.`);
    }
}

const login=async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});

        !user && res.status(400).json('Wrong Credentials');

        const hashedPassword=CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

        const OriginalPassword=hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword!=req.body.password && res.status(400).json('Wrong Credentials');

        const {password,...others}=user._doc;
        
        res.status(200).json({...others});
    }
    catch(err){
        // res.status(500).json(err);
    }
}

module.exports={
    register,
    login
}