const express = require("express");
const NivelSchema = require("../models/Niveles");
const router =  express.Router();

//crear categoria

router.post("/niveles", (req,res)=>{

    const Nivel = NivelSchema(req.body);

    Nivel
    .save()
    .then((data) => res.json(data))
    .catch((error)=> res.json ({message:error}));

});

//obtener categorias 

router.get("/niveles" , (req, res)=>{

    NivelSchema
    .find()
    .then((data) => res.json(data))
    .catch((error=> res.json({ mensaje:error})));
});

//obtener categoria por su id
router.get("/niveles/:id" , (req, res)=>{

    const {id} = res.params;

    NivelSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error=> res.json({ mensaje:error})));
});


//editar administrador

router.put("/niveles/:id" ,(req,res)=>{
    const {id} = req.params;
    const {nombre}= req.body;

        NivelSchema
        .updateOne({_id : id},{ $set: {nombre}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({ message:error}));
    });


//Eliminar una categoria

router.delete("/niveles/:id" ,(req,res)=>{
    const {id} = req.params;
        
        NivelSchema
        .deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({ message:error}));
    });


module.exports = router;