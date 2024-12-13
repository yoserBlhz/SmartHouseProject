const express = require('express');
const mongoose = require('mongoose');
const R_AddOthersUser = express.Router();
const { User } = require('../models/SchemaModels.js'); // Assurez-vous que le modèle User est bien importé

R_AddOthersUser.post('/:username/addOtherUsers', async (req, res) => {
  const username = req.params.username; // Nom de l'utilisateur admin
  const { name } = req.body; // Extraction spécifique du champ 'name' du corps de la requête
  
  // Vérification de la présence du nom dans la requête
  if (!name) {
    return res.status(400).json({ message: "Le nom de l'autre utilisateur est requis." });
  }

  try {
    // Recherche de l'utilisateur et ajout du nouvel utilisateur à la liste 'otherUsers'
    const user = await User.findOneAndUpdate(
      { userAdmin: username }, // Critère de recherche basé sur l'username
      {
        $push: {
          otherUsers: {
            username: name, // Ajout du nom dans l'objet
            _id: new mongoose.Types.ObjectId() // Création d'un nouvel ID pour le 'otherUser'
          }
        }
      },
      { new: true } // Retourner l'utilisateur mis à jour
    );

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Retourner la réponse avec l'utilisateur mis à jour
    res.status(200).json({
      message: "Otheruser ajoutée avec succès.",
      user: user // L'utilisateur avec le champ 'otherUsers' mis à jour
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'otherUser:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = R_AddOthersUser;
