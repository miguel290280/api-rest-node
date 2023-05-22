module.exports = app => {
    const usuarios = require("../controllers/usuarios.controller.js");
  
    var router = require("express").Router();
  
    
     // Devuelve estado
     router.get("/", usuarios.estado);
  
    app.use("/api/estado", router);
  
  
  };
  