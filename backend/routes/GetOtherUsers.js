const express = require('express');
const { User } = require('../models/SchemaModels.js'); // Importez votre modèle User
const  routeGETUSERS = express.Router();

// Route pour récupérer un utilisateur par son nom d'admin
routeGETUSERS.get('/:code/:username/getOtherUsers', async (req, res) => {
  const username = req.params.username;
  const code = req.params.code;

  try {
    const user = await User.find({ userAdmin: username, code:code }).select('otherUsers.username -_id ');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
   console.log(user)
   

    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports =routeGETUSERS;
