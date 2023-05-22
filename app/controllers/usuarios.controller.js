const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

const DATE_REGEX = /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/
const CURRENT_YEAR = new Date().getFullYear()

const validateDate = (birthDate) => {
    
  /* Comprobar formato dd/mm/yyyy, que el mes no sea mayor de 12 y los días mayores de 31 */
  if (!birthDate.match(DATE_REGEX)) {
    return false
  }
  
  /* Comprobar los días del mes */
  const day = parseInt(birthDate.split('/')[0])
  const month = parseInt(birthDate.split('/')[1])
  const year = parseInt(birthDate.split('/')[2])
  const monthDays = new Date(year, month, 0).getDate()
  if (day > monthDays) {
    return false
  }
  
  /* Comprobar que el año no sea superior al actual*/
  if (year > CURRENT_YEAR) {
    return false
  }
  return true

}
// Crear un usuario
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Nombre de usuario no puede ser vacio!"
    });
    return;
  }

  if(!validateDate(req.body.birthdate)) {
    res.status(400).send({
      message: "Fcha de Nacimiento no valido!"
    });
    return;
  } 



  // Crear  Usuario
  const usuario = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    birthdate: req.body.birthdate,
  };

  // Guardar usuario
  Usuario.create(usuario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al guardar el usuario!."
      });
    });
};

// Dvuelve todos los usuarios.
exports.findAll = (req, res) => {
  const title = req.query.username;
  var condition = title ? { title: { [Op.iLike]: `%${username}%` } } : null;

  Usuario.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al devolver todos los usuarios."
      });
    });
};

// Buscar un usuario por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Usuario.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al devolver el usuario con id=" + id
      });
    });
};

// Actualiza el usuario
exports.update = (req, res) => {
  const id = req.params.id;

  Usuario.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuario modificado corectamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar el Usuario con id=${id}. Talvez el asegurado no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualiza el Asegurado con Id=" + id
      });
    });
};

// Borrar Usuario
exports.delete = (req, res) => {
  const id = req.params.id;

  Usuario.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuario fue eliminado correctamente!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar el Usuario con id=${id}. Quizas el usuario no exista!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el Usuario con id=" + id
      });
    });
};

// Estado
exports.estado = (req, res) => {
  res.send({
      "nameSystem": "api-usuarios", 
      "version": "0.0.1", 
      "developer":"Grover Peñafiel",
      "email": "grover.penafiel@gmail.com"
    });
};

// Prmedio de Edad
exports.promedio = (req, res) => {

  const results = Usuario.sequelize.query(
    "SELECT AVG(EXTRACT(YEAR FROM AGE( NOW(), TO_DATE(u.birthdate,'DD/MM/YYYY')))) AS promedio_edades FROM usuarios u;"
  ).then(data => {
    //console.log(data[0][0].promedio_edades);
    res.send({promedioEdad: data[0][0].promedio_edades});
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Ocurrio un error al devolver todos los usuarios."
    });
  });;
// console.log(results);
// req.send({ok1:ok})
  //req.Sequelize.query('SELECT AVG(EXTRACT(YEAR FROM AGE( NOW(), TO_DATE(u.birthdate,"DD/MM/YYYY")))) AS promedio_edades FROM usuarios u ;');
  // res.send({
  //   "promedioEdad": 34.5}
  // );
};