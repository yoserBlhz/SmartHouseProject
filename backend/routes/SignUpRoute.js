const express =require('express')
const multer = require('multer');
 
const router = express.Router()
const {User, ValidateregisterUser , ValidateLoginUser , ValidateUpdateUser }=require('../models/SchemaModels.js')


// Configurer Multer pour gérer les téléchargements d'images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads'); // Dossier où enregistrer les images
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Nom unique pour chaque fichier
    },
  });

const upload = multer({ storage });






function generateRandomCode(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    
    return code;
}


// router.post("/addAdmin",upload.single('image'),async (req,res)=>{
//   try{
//      const c=generateRandomCode(6)
//     const avatarPath = req.file ? `uploads/${req.file.filename}` : 'uploads/avatarDef.jpg';

//      const auth=new User({
//          //id:Authors.length+1,
//          userAdmin:req.body.username ,
//          userAdminPassword:req.body.password,
//          code:c ,
           
//          gender:req.body.gender ,

//          email:req.body.email,
//          otherUsers:[],
//          HOME:[]
       
//      })
     
//      const result=await auth.save()
 
//      res.status(201).json(result);
//  }
//  catch(err){
//      console.log(err)
//      res.status(500).json({message:"Erreur lors de saving !!!"})
//  }    
//  })




router.post("/addAdmin", async (req, res) => {
  try {
    const c = generateRandomCode(6);

    let avatarPath;
    if (req.body.gender === 'Male') {
      avatarPath = 'assets/maleAvatar.jpg'; 
    } else if (req.body.gender === 'Female') {
      avatarPath = 'assets/femaleAvatar.jpg'; 
    }

    const auth = new User({
      userAdmin: req.body.username,
      userAdminPassword: req.body.password,
      code: c,
      gender: req.body.gender,
      email: req.body.email,
      otherUsers: [],
      HOME: [],
      avatar: avatarPath 
    });

    const result = await auth.save();

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur lors de saving !!!" });
  }
});











 
module.exports=router;