const express = require('express');
const { User } = require('../models/SchemaModels.js'); // Importez votre modèle User
const  routeGetDevices = express.Router();

// Route pour récupérer un utilisateur par son nom d'admin
routeGetDevices.get('/:username/:nameRoom/getRooms', async (req, res) => {
  const username = req.params.username; // Récupérer le nom d'utilisateur depuis les paramètres de la requête
  const nameRoom=req.params.nameRoom ;
  //const room_name=req.body.room_name ;

  try {
    /* const user = await User.findOne( {userAdmin:username} ,// Chercher l'utilisateur dans la base
        { 'HOME.name': nameRoom  }, // Filtre les documents où HOME.name est 'kitchen 1'
        { 'HOME.Appareils': 1, _id: 1 } // Projection pour inclure uniquement HOME.Appareils et exclure _id
      );*/
      
      const user = await User.findOne(
        { userAdmin: username }, // Chercher l'utilisateur par son nom d'admin
        {
          'HOME.name':nameRoom 
        }
      )
      .select('HOME.Appareils _id');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
   console.log(user)
   

    // Retourner l'utilisateur avec uniquement les champs 'userAdmin' et 'image'
    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports =   routeGetDevices;
