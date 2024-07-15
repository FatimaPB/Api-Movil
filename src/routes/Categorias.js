const express = require("express");
const CategoriaSchema = require("../models/Categorias")
const router = express.Router();


//crear categoria

router.post("/categorias", (req,res)=>{

    const Categoria = CategoriaSchema(req.body);

    Categoria
    .save()
    .then((data) => res.json(data))
    .catch((error)=> res.json ({message:error}));

});

//obtener categorias 

router.get("/categorias" , (req, res)=>{

    CategoriaSchema
    .find()
    .then((data) => res.json(data))
    .catch((error=> res.json({ mensaje:error})));
});

//obtener categoria por su id
router.get("/categorias/:id" , (req, res)=>{

    const {id} = res.params;

    CategoriaSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error=> res.json({ mensaje:error})));
});


//editar administrador

router.put("/categorias/:id" ,(req,res)=>{
    const {id} = req.params;
    const {nombre}= req.body;
        
        CategoriaSchema
        .updateOne({_id : id},{ $set: {nombre}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({ message:error}));
    });


//Eliminar una categoria

router.delete("/categorias/:id" ,(req,res)=>{
    const {id} = req.params;
        
        CategoriaSchema
        .deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({ message:error}));
    });


module.exports = router;