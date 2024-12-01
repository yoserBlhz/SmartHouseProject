const express = require('express');
const { User } = require('../models/SchemaModels.js'); // Importez votre modèle User
const DeleteDevice = express.Router();

// Route pour supprimer un appareil d'une pièce spécifique d'un utilisateur
DeleteDevice.delete('/:username/:nameroom/:deviceId/deleteAppareil', async (req, res) => {
  const username = req.params.username; // Nom de l'utilisateur admin
  const nameroom = req.params.nameroom; // Nom de la pièce
  const deviceId = req.params.deviceId; // ID de l'appareil à supprimer

  try {
    // Rechercher l'utilisateur par son nom d'administrateur
    const user = await User.findOne({ userAdmin: username });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Trouver la pièce correspondante dans `HOME`
    const room = user.HOME.find(home => home.name === nameroom);

    if (!room) {
      return res.status(404).json({ message: 'Pièce non trouvée.' });
    }

    // Trouver l'appareil par son `_id` et le supprimer
    const initialLength = room.Appareils.length;
    room.Appareils = room.Appareils.filter(appareil => appareil._id.toString() !== deviceId);

    // Vérifiez si un appareil a été supprimé
    if (initialLength === room.Appareils.length) {
      return res.status(404).json({ message: 'Appareil non trouvé.' });
    }

    // Sauvegarder les modifications dans la base de données
    await user.save();

    // Retourner une réponse de succès
    res.status(200).json({ message: 'Appareil supprimé avec succès.', room });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'appareil : ', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports =  DeleteDevice ;
