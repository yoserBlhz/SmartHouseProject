const express = require('express');
const { User } = require('../models/SchemaModels.js'); // Importez votre modèle User
const  routeGETROOMS = express.Router();

// Route pour récupérer un utilisateur par son nom d'admin
routeGETROOMS.get('/:username/getRooms', async (req, res) => {
  const username = req.params.username; // Récupérer le nom d'utilisateur depuis les paramètres de la requête
  //const room_name=req.body.room_name ;

  try {
    // Trouver l'utilisateur par son nom d'admin (userAdmin) et sélectionner uniquement 'userAdmin' et 'image'
    const user = await User.findOne({ userAdmin: username }).select('HOME -_id  ');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    if (user && user.HOME) {
        user.HOME = user.HOME.map((home) => {
          delete home.Appareils; // Supprime le champ Appareils
          delete home._id;       // Supprime le champ _id dans HOME
          return home;
        });
      }
      
      console.log(user);

    // Retourner l'utilisateur avec uniquement les champs 'userAdmin' et 'image'
    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports =  routeGETROOMS;
