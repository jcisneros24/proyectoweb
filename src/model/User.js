var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: {
        type: String,
        required: [true, 'Nombre es requerido']
    },
    apellidos: { 
        type: String, 
        required: [true, 'Apellidos es requerido']
    },
    email: { 
        type: String, 
        required: [true, 'Email es requerido']
    },
    celular: { 
        type: String, 
        required: [true, 'Celular es requerido']
    },
    usuario: { 
        type: String, 
        required: [true, 'Usuario es requerido']
    },
    password: { 
        type: String, 
        required: [true, 'Password es requerido']
    },
});

var User = mongoose.model('user', userSchema);

module.exports = User;