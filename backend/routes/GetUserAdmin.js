const express = require('express');
const { User } = require('../models/SchemaModels.js'); // Importez votre modèle User
const  routeGETuser = express.Router();

// Route pour récupérer un utilisateur par son nom d'admin
routeGETuser.get('/:username', async (req, res) => {
  const username = req.params.username; // Récupérer le nom d'utilisateur depuis les paramètres de la requête

  try {
    // Trouver l'utilisateur par son nom d'admin (userAdmin) et sélectionner uniquement 'userAdmin' et 'image'
    const user = await User.findOne({ userAdmin: username }).select('userAdmin image -_id');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Retourner l'utilisateur avec uniquement les champs 'userAdmin' et 'image'
    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports =  routeGETuser;
