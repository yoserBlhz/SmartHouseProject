const express =require('express')
 
const router = express.Router()
const {User, ValidateregisterUser , ValidateLoginUser , ValidateUpdateUser }=require('../models/SchemaModels.js')

function generateRandomCode(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    
    return code;
}


router.post("/addAdmin",async (req,res)=>{
  try{
     const c=generateRandomCode(6)
     const auth=new User({
         //id:Authors.length+1,
         userAdmin:req.body.username ,
         userAdminPassword:req.body.password,
         code:c ,
         email:req.body.email,
         otherUsers:[],
         HOME:[]
       
     })
     const result=await auth.save()
 
     res.status(201).json(result);
 }
 catch(err){
     console.log(err)
     res.status(500).json({message:"Erreur lors de saving !!!"})
 }    
 })
 
module.exports=router;