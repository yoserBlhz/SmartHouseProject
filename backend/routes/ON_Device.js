const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { User } = require('../models/SchemaModels.js'); // Importez votre modèle User
const routeOn = express.Router();

// Route pour ajouter un appareil à une maison spécifique d'un utilisateur
routeOn.post('/:username/:idAppareil/on', async (req, res) => {
  const username = req.params.username; // Nom de l'utilisateur admin
  const idAppareil = req.params.idAppareil; // ID de l'appareil

  // Conversion de l'idAppareil en ObjectId
  const appareilId = new ObjectId(idAppareil);

  try {
    // Recherche et mise à jour de l'appareil spécifié
    const result = await User.updateOne(
      {
        userAdmin: username,
        "HOME.Appareils._id": appareilId, // Vérifie l'existence de l'appareil
      },
      {
        $set: { "HOME.$[home].Appareils.$[appareil].bouton": 1 } // Allumer l'appareil
      },
      {
        arrayFilters: [
          { "home.Appareils._id": appareilId },  // Filtre l'appareil dans la maison
          { "appareil._id": appareilId }         // Filtre également par l'ID de l'appareil
        ]
      }
    );

    // Vérifie si un document a été modifié
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Appareil non trouvé ou déjà allumé.' });
    }

    // Réponse de succès
    res.status(200).json({ message: 'Appareil Allumé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'allumage de l\'appareil : ', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = routeOn;
