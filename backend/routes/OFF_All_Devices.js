const express = require('express');
const mongoose = require('mongoose');
const { User } = require('../models/SchemaModels.js'); // Importez votre modèle User
const routeOffAll = express.Router();

// Route pour éteindre tous les appareils d'un utilisateur spécifique
routeOffAll.post('/:username/off', async (req, res) => {
  const username = req.params.username; // Nom de l'utilisateur admin

  try {
    // Recherche et mise à jour de tous les appareils de l'utilisateur pour les éteindre
    const result = await User.updateOne(
      { userAdmin: username }, // Trouve l'utilisateur par son nom d'administrateur
      {
        $set: { "HOME.$[].Appareils.$[].bouton": 0 } // Eteindre tous les appareils (bouton = 0)
      },
      {
        arrayFilters: [{ "home.Appareils": { $exists: true } }] // Applique le filtre sur les appareils de chaque maison
      }
    );

    // Vérifie si un document a été modifié
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Aucun appareil trouvé ou tous sont déjà éteints.' });
    }

    // Réponse de succès
    res.status(200).json({ message: 'Tous les appareils ont été éteints avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'extinction des appareils : ', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = routeOffAll;
