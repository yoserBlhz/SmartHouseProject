const mongoose = require('mongoose');

// Schéma pour les appareils
const AppareilSchema = new mongoose.Schema({
    bouton: { type: Number, required: false }
});

// Schéma pour HOME
const HomeSchema = new mongoose.Schema({
    name: { type: String, required: false },
    type: { type: String, required: false },
    image: { type: String, required: false },
    Appareils: [AppareilSchema] // Tableau d'appareils
});

// Schéma pour les utilisateurs secondaires (otherUsers)
const OtherUserSchema = new mongoose.Schema({
    username: { type: String, required: false },
    image: { type: String, required: false }
});

// Schéma principal
const MainSchema = new mongoose.Schema({
    userAdmin: { type: String, required: true },
    userAdminPassword: { type: String, required: true },
    code: { type: String, required: true },
    image: { type: String, required: false },
    email: { type: String, required: true },
    otherUsers: [OtherUserSchema], // Tableau d'autres utilisateurs
    HOME: [HomeSchema] // Tableau de HOME
});

// Modèle Mongoose
const User = mongoose.model('User', MainSchema , 'usersss');

function ValidateregisterUser(obj){
    const schema=joi.object({
    userAdmin:joi.string().trim().required(),    
    email:joi.string().trim().required().email(),
    userAdminPassword:joi.string().trim().required(),
     })

    return schema.validate(obj)
}





module.exports = {User,
    ValidateregisterUser

};

