const express =require('express')
 
const R_LoginSimple = express.Router()
const {User, ValidateregisterUser , ValidateLoginUser , ValidateUpdateUser }=require('../models/SchemaModels.js')

R_LoginSimple.post("/:username/:code/LoginSimpleuser", async(req,res)=>{
    const {username , code}=req.params ;
   
    
try{
    const user = await User .findOne(
        { 
          "otherUsers.username": username, 
          "code": code 
        },
        {
            "otherUsers": 1,  // Inclure tout le tableau otherUsers
            "code": 1         // Inclure également le champ code
          }
      );
 
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.status(200).json({ message: 'Connexion réussie upppppp.',
        code: code,
        username: username
     });


}catch(error){
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lolooooool.' });
}


})

module.exports=R_LoginSimple