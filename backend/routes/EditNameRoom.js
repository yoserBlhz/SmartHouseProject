const express = require('express');
const { User } = require('../models/SchemaModels.js'); // Importez votre modèle User
const EditRoomName = express.Router();

// Route pour modifier le nom d'une pièce spécifique d'un utilisateur
EditRoomName.put('/:username/:currentRoomName/updateRoomName', async (req, res) => {
  const { username, currentRoomName } = req.params; // Paramètres de l'URL
  const { newRoomName } = req.body; // Nouveau nom de la pièce dans le corps de la requête

  if (!newRoomName || typeof newRoomName !== 'string') {
    return res.status(400).json({ message: 'Le nouveau nom de la pièce est requis et doit être une chaîne valide.' });
  }

  try {
    // Mise à jour du nom de la pièce dans le tableau HOME
    const result = await User.updateOne(
      { userAdmin: username, "HOME.name": currentRoomName },
      { $set: { "HOME.$.name": newRoomName } }
    );

    // Vérification si une pièce a été modifiée
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Aucune pièce correspondante trouvée pour cet utilisateur.' });
    }

    // Retourner une réponse de succès
    res.status(200).json({
      message: `Le nom de la pièce a été modifié avec succès de '${currentRoomName}' à '${newRoomName}'.`,
    });
  } catch (error) {
    console.error('Erreur lors de la modification du nom de la pièce :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = EditRoomName;
