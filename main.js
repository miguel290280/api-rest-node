const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8085"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Sincronizacion con la bd.");
  })
  .catch((err) => {
    console.log("Fallo la sincronización con la bd: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "todo correcto." });
});

require("./app/routes/usuarios.routes")(app);
require("./app/routes/estado.routes")(app);

// definir puerto de escucha para las peticiones
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Aplicación corriendo en el puerto ${PORT}.`);
});
