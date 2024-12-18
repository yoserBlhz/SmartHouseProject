// const express = require('express');
// const { User } = require('../models/SchemaModels.js'); // Importez votre modèle User
// const routeGetDevices = require('./GetDevices.js');
// const  routeGETROOMS = express.Router();

// // Route pour récupérer un utilisateur par son nom d'admin
// routeGETROOMS.get('/:code/:username/getRooms', async (req, res) => {
//   const username = req.params.username; // Récupérer le nom d'utilisateur depuis les paramètres de la requête
//   const code = req.params.code;
//   //const room_name=req.body.room_name ;

//   try {
//     // Trouver l'utilisateur par son nom d'admin (userAdmin) et sélectionner uniquement 'userAdmin' et 'image'
//     const user = await User.find({ userAdmin: username, code:code }).select('HOME.name HOME.type -_id   ');

//     if (!user) {
//       return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//     }
//    console.log(user)
   

//     // Retourner l'utilisateur avec uniquement les champs 'userAdmin' et 'image'
//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Erreur lors de la récupération de l\'utilisateur :', error);
//     res.status(500).json({ message: 'Erreur serveur.' });
//   }
// });

// module.exports =routeGETROOMS;
const express = require('express');
const { User } = require('../models/SchemaModels.js'); // Importez votre modèle User
const routeGetDevices = require('./GetDevices.js');
const  routeGETROOMS = express.Router();

// Route pour récupérer un utilisateur par son nom d'admin
routeGETROOMS.get('/:code/getRooms', async (req, res) => {
  const code = req.params.code;

  try {
    const user = await User.find({  code:code }).select('HOME.name HOME.type -_id   ');

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

module.exports =routeGETROOMS;
