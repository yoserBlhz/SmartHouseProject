const express = require('express');
const { User } = require('../models/SchemaModels.js'); // Importez votre modèle User
const routDevice = express.Router();

// Route pour ajouter un appareil à une maison spécifique d'un utilisateur
routDevice.post('/:username/:nameroom/addAppareil', async (req, res) => {
  const username = req.params.username; // Nom de l'utilisateur admin
  const nameroom = req.params.nameroom; // Nom de la pièce
  const t = req.body.type; // Type d'appareil envoyé dans la requête

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

    // Ajouter l'appareil à la liste des appareils de la pièce
    room.Appareils.push({ "bouton": 0, "type": t });

    // Sauvegarder les modifications dans la base de données
    await user.save();

    // Retourner une réponse de succès avec la pièce mise à jour
    res.status(200).json({ message: 'Appareil ajouté avec succès.', room });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'appareil : ', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = routDevice;
