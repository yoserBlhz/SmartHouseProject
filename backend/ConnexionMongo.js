const express = require("express");
const mongoose = require('mongoose');
const SignUpPath = require("./routes/SignUpRoute");
const LoginPath = require("./routes/LoginRoute");
const addRoomPath = require("./routes/AddRoom");
const AddDevicePath=require("./routes/addDevice");
const DeleteDevicePath=require("./routes/DeleteDevice")
const GetAdminPath=require("./routes/GetUserAdmin")
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

// Initialisation de l'application Express
const app = express();

app.use(express.json());

// Définition des routes API
app.use("/api/SignUp", SignUpPath);
app.use("/api", LoginPath);
app.use("/api", addRoomPath);
app.use("/api", AddDevicePath);
app.use("/api",DeleteDevicePath)
app.use("/api",GetAdminPath)


// Configuration du port du serveur
const port = 5000;
app.listen(port, () => {
  console.log("Server Running eyyyy!!");
});
