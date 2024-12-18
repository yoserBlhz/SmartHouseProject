const express = require('express');
const { User } = require('../models/SchemaModels.js'); // Importez votre modèle User
const DeleteRoom = express.Router();

// Route pour supprimer une pièce spécifique d'un utilisateur
DeleteRoom.delete('/:username/:nameroom/deleteRoom', async (req, res) => {
  const username = req.params.username; // Nom de l'utilisateur admin
  const nameroom = req.params.nameroom; // Nom de la pièce

  try {
    // Supprimer la pièce du tableau HOME de l'utilisateur admin
    const result = await User.updateOne(
      { userAdmin: username },
      { $pull: { HOME: { name: nameroom } } }
    );

    // Vérifier si une pièce a été modifiée
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Aucune pièce correspondante trouvée pour cet utilisateur.' });
    }

    // Retourner une réponse de succès
    res.status(200).json({ message: 'Pièce supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la pièce :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = DeleteRoom;
