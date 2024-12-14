const express = require('express');
const session = require('express-session');
const { User } = require('../models/SchemaModels.js'); // Importer votre modèle User

// Initialiser l'application Express
const app = express();

// Configurer la session
app.use(session({
  secret: 'your-secret-key', // Clé secrète pour signer la session
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Si vous ne travaillez pas avec HTTPS, mettez secure à false
}));

// Middleware pour parser les données JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route pour récupérer un utilisateur par son nom d'admin et la pièce
app.get('/:username/:nameRoom/SearchRoom', async (req, res) => {
  const username = req.params.username; // Récupérer le nom d'utilisateur depuis les paramètres de la requête
  const nameRoom = req.params.nameRoom; // Récupérer le nom de la pièce (room)

  try {
    const pipeline = [
      { $match: { userAdmin: username } }, // Filtrer par l'admin de l'utilisateur
      {
        $project: {
          _id: 0,
          HOME: {
            $filter: {
              input: "$HOME", // Parcourir l'attribut 'HOME'
              as: "room",
              cond: { $eq: ["$$room.name", nameRoom] } // Ne conserver que la pièce avec 'name' égal à 'bity'
            }
          }
        }
      },
      {
        $project: {
          HOME: { name: 1, type: 1 } // Récupérer les champs 'name' et 'type' de la pièce 'bity'
        }
      }
    ];
    const result = await User.aggregate(pipeline);

    if (result.length === 0 || result[0].HOME.length === 0) {
      return res.status(404).json({ message: 'Aucune pièce "bity" trouvée pour cet utilisateur.' });
    }

    // Retourner les valeurs 'name' et 'type' de la pièce 'bity'
    res.status(200).json({ Room: result[0].HOME[0] });

   
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});
 

// Exporter l'application pour l'utiliser dans le serveur principal
module.exports = app;

