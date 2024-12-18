const express = require('express');
const R_DeleteRoom = express.Router();
const { User } = require('../models/SchemaModels.js'); // Assurez-vous d'importer correctement votre modèle User

R_DeleteRoom.delete('/:code/:username/delete-room/:roomName', async (req, res) => {
  const code = req.params.code;
  const username = req.params.username;
  const roomName = req.params.roomName; // Nom de la room à supprimer

  try {
    // Rechercher l'utilisateur par son code et son username
    const user = await User.findOne({ userAdmin: username, code: code });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Trouver et supprimer la room dans HOME
    const initialLength = user.HOME.length;
    user.HOME = user.HOME.filter(room => room.name !== roomName);

    // Vérifiez si une room a été supprimée
    if (initialLength === user.HOME.length) {
      return res.status(404).json({ message: 'Room non trouvée.' });
    }

    // Sauvegarder les modifications
    await user.save();

    // Réponse de succès
    res.status(200).json({ message: 'Room supprimée avec succès.', user });
  } catch (error) {
    console.error('Erreur lors de la suppression de la room :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = R_DeleteRoom;
