const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session'); // Assurez-vous d'avoir importé express-session
const SignUpPath = require("./routes/SignUpRoute");
const LoginPath = require("./routes/LoginRoute");
const addRoomPath = require("./routes/AddRoom");
const AddDevicePath = require("./routes/addDevice");
const DeleteDevicePath = require("./routes/DeleteDevice");
const GetAdminPath = require("./routes/GetUserAdmin");
const getRoomsPath = require("./routes/GetRooms");
const getDevicesPath = require("./routes/GetDevices");
const SerachRoomPath = require("./routes/SearchRoom");
const addOtherUsers=require("./routes/AddOtherUsers");
const getOtherUsers=require("./routes/GetOtherUsers");
const editOtherUser=require("./routes/editOtherUser");
const deleteOtherUser=require("./routes/DeleteOtherUser");

const getCodePath=require("./routes/GetCode")
  

const OnDevicePath=require("./routes/ON_Device")
const On_All_DevicePath=require("./routes/ON_All_Devices")
const OffDevicePath=require("./routes/OFF_Device")
const Off_All_DevicePath=require("./routes/OFF_All_Devices")
const DeleteRoomPath=require("./routes/DeleteRoom")

const EditroomPath=require('./routes/EditNameRoom')
const path = require('path');
// Initialisation de l'application Express
const app = express();
const cors = require('cors');
//app.use(express.static(path.join(__dirname, 'public')));  
app.use(cors());
// Configurer la session
app.use(session({
  secret: 'your-secret-key', // Clé secrète pour signer la session
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Si vous ne travaillez pas avec HTTPS, mettez secure à false
}));

// Middleware pour servir les fichiers statiques (HTML, JS, etc.)
app.use(express.static('public')); // Si vos fichiers frontend sont dans un dossier 'public'

// Middleware pour parser les données JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:4200',  // Autorise les requêtes depuis localhost:3000 (frontend)
  methods: 'GET,POST',              // Méthodes autorisées
  allowedHeaders: 'Content-Type'    // Entêtes autorisés
}));

// URI de connexion à MongoDB Atlas
const uri = "mongodb+srv://jiji:jiji@smarthouse.1xebt.mongodb.net/smarthouse";

// Se connecter à MongoDB Atlas en utilisant Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connecté à la base de données MongoDB Atlas avec succès !");
  })
  .catch(err => {
    console.error("Erreur de connexion à MongoDB Atlas : ", err);
  });

// Définition des routes API
app.use("/api", SignUpPath);
app.use("/api", LoginPath);
app.use("/api", addRoomPath);
app.use("/api", AddDevicePath);
app.use("/api", DeleteDevicePath);
app.use("/api", GetAdminPath);
app.use("/api", getRoomsPath);
app.use("/api", getDevicesPath);
app.use("/api", SerachRoomPath);
app.use("/api",addOtherUsers);
app.use("/api",getOtherUsers);
app.use("/api",editOtherUser);
app.use("/api",deleteOtherUser);
app.use("/api",OnDevicePath)
app.use("/api",OffDevicePath)
app.use("/api",Off_All_DevicePath)
app.use("/api",On_All_DevicePath)
app.use("/api",DeleteRoomPath)
app.use("/api",getCodePath)
app.use("/api",EditroomPath)
// Configuration du port du serveur
const port = 5000;
app.listen(port, () => {
  console.log("Server Running eyyyy!!");
});
