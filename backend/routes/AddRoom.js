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
 



R_AddRoom.post('/user/:username/add-room', async (req, res) => {
  const username = req.params.username; // Nom de l'utilisateur
  const { name, type, appareils } = req.body; // Extraction des données depuis req.body

  // Vérification des données
  if (!name || !type || !Array.isArray(appareils)) {
    return res.status(400).json({ message: "Les champs 'name', 'type' et 'appareils' sont requis." });
  }

  // Nouvelle room à ajouter
  const newRoom = {
    name,
    type,
    Appareils: appareils.map(appareil => ({
      bouton:   0, // Valeur par défaut pour bouton
      type: appareil.type,
    })),
  };

  try {
    // Rechercher l'utilisateur et ajouter la room
    const user = await User.findOneAndUpdate(
      { userAdmin: username }, // Critère de recherche
      { $push: { HOME: newRoom } }, // Ajouter la nouvelle room
      { new: true } // Retourner l'utilisateur mis à jour
    );

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({ message: "Room ajoutée avec succès.", user });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la room :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});









module.exports = R_AddRoom;
 