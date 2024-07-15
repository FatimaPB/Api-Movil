const mongoose = require("mongoose");

const NivelSchema =  mongoose.Schema({

    nombre:{
        type: String,
        require:true
    }
})

module.exports = mongoose.model('nivel', NivelSchema);