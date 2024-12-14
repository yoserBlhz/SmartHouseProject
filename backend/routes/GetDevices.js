const express = require('express');
const { User } = require('../models/SchemaModels.js'); // Importez votre modèle User
const routeGetDevices = express.Router();

// Route pour récupérer un utilisateur par son nom d'admin
routeGetDevices.get('/:code/:username/:nameRoom/getDevices', async (req, res) => {
  const username = req.params.username; // Récupérer le nom d'utilisateur depuis les paramètres de la requête
  const nameRoom = req.params.nameRoom; // Récupérer le nom de la pièce (room)
  const code = req.params.code;


  try {
    const pipeline = [
      { $match: { code:code, userAdmin: username, "HOME.name": nameRoom } },
      {
        $project: {
          _id: 0,
          Appareils: {
            $filter: {
              input: "$HOME",
              as: "room",
              cond: { $eq: ["$$room.name", nameRoom] },
            },
          },
        },
      },
      { $unwind: "$Appareils" },
      { $unwind: "$Appareils.Appareils" },
      { $replaceRoot: { newRoot: "$Appareils.Appareils" } },
    ];

    const result = await User.aggregate(pipeline);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Aucun appareil trouvé pour cette pièce.' });
    }

    // Retourner les appareils trouvés
    res.status(200).json({ devices: result });
  } catch (error) {
    console.error('Erreur lors de la récupération des appareils :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = routeGetDevices;
