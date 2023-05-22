module.exports = app => {
  const usuarios = require("../controllers/usuarios.controller.js");

  var router = require("express").Router();

  // Crea un nuevo usuario
  router.post("/", usuarios.create);

  // Devuelve promedio
  router.get("/promedio-edad", usuarios.promedio);
  
  // Devuelve todos loas usuarios
  router.get("/", usuarios.findAll);

  // Devuelve un usuario
  router.get("/:id", usuarios.findOne);

  // Actualiza un usuario por su id
  router.put("/:id", usuarios.update);

  // Borrar un usuario por su id
  router.delete("/:id", usuarios.delete);

  

  app.use("/api/usuarios", router);


};
