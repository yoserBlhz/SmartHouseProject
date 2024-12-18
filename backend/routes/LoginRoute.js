const express =require('express')
 
const R_Login = express.Router()
const {User, ValidateregisterUser , ValidateLoginUser , ValidateUpdateUser }=require('../models/SchemaModels.js')

R_Login.post("/Login", async(req,res)=>{
    const userAdmin=req.body.username ;
    const userAdminPassword=req.body.password ;
    
try{
    const user = await User.findOne({ 
        userAdmin , 
        userAdminPassword  
    });
 
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
-
    res.status(200).json({ message: 'Connexion réussie upppppp.',
        code: user.code,
        username: userAdmin
     });


}catch(error){
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lolooooool.' });
}


})

module.exports=R_Login