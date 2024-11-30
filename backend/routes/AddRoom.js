const express =require('express')
const multer = require('multer');
 
const R_AddRoom = express.Router()
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




// Route pour ajouter une room à l'utilisateur par son username
R_AddRoom.post('/user/:username/add-room', async (req, res) => {
    const username = req.params.username; // Récupérer le username à partir des paramètres de la requête
    const name = req.body.name; 
    const type=req.body.type ;

    const newRoom={name,type}
    // Room envoyée dans le body de la requête

    try {
        // Trouver l'utilisateur par username et ajouter une room au tableau HOME
        const user = await User.findOneAndUpdate(
            { userAdmin: username }, // Recherche basée sur le username
            { $push: { HOME: newRoom } }, // Ajouter la nouvelle room
            { new: true } // Retourner l'utilisateur mis à jour
        );

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json({ message: "Room ajoutée avec succès", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'ajout de la room" });
    }
});

module.exports = R_AddRoom;
 