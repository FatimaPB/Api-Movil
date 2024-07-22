const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer'); // Importar multer
require("dotenv").config();
const AdministradoresRoutes = require("./src/routes/Administradores");
const CategoriaRoutes= require("./src/routes/Categorias");
const NivelRoutes = require("./src/routes/Niveles");
const PreguntasRoutes = require('./src/routes/Preguntas'); // Importar tus rutas de preguntas
const PreguntasDosRoutes = require ('./src/routes/PreguntasDos');
const PreguntaTresRoutes = require ('./src/routes/PreguntasTres');
const loginRoutes = require('./src/routes/login')
const app =  express();
const port = process.env.PORT || 3000;


//midedleware

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api',AdministradoresRoutes);
app.use('/api' , CategoriaRoutes);
app.use('/api', NivelRoutes);
app.use('/api', PreguntasRoutes);
app.use('/api' , PreguntasDosRoutes);
app.use('/api', PreguntaTresRoutes);
app.use('/api',loginRoutes)


//Rutas

app.get("/", (req, res ) => {
    res.send("bienvenido a mi api :)")
});


//conexion a mongoose

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log("conectado a mongo atlas"))
    .catch((error)=> console.error(error));

app.listen(port, () => console.log('servidor escuchando en el puerto', port));