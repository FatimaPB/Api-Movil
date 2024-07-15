const express = require("express");
const AdministradorSchema = require("../models/Administradores");


const router =  express.Router();

//crear usuario

router.post("/administradores" ,(req,res)=>{

    const Administrador = AdministradorSchema(req.body);

    Administrador

    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json ({ message:error}));
});

//Obtener administradores
router.get("/administradores" ,(req,res)=>{

    AdministradorSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json ({ message:error}));
});


//obtener administrador por su id
router.get("/administradores/:id" ,(req,res)=>{
const {id} = req.params;
    AdministradorSchema
    .findById (id)
    .then((data) => res.json(data))
    .catch((error) => res.json ({ message:error}));
});

//editar administrador

router.put("/administradores/:id" ,(req,res)=>{
    const {id} = req.params;
    const {nombre,password}= req.body;
        AdministradorSchema
        .updateOne({_id : id},{ $set: {nombre, password}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({ message:error}));
    });

//eliminar administrador

router.delete("/administradores/:id" ,(req,res)=>{
    const {id} = req.params;
        AdministradorSchema
        .deleteOne({ _id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({ message:error}));
    });

module.exports = router;
