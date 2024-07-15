const mongoose = require("mongoose");

const AdministradorSchema = mongoose.Schema({

    nombre:{
        type:String,
        require:true
    },
    password:{
        type: String,
        require:true
    }
});


module.exports = mongoose.model('Administrador',AdministradorSchema);