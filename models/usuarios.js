const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        
    },
    email: {
        trype: String,
        
    
        
        
    },
    password: {
        trype: String,
        
    }, 
    img: {
        trype: String, 
    },
    rol: { 
        trype: String,
        
         
    },
    google: {
        trype: Boolean, 
        
    },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);

  