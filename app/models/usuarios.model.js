module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuario", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    birthdate: {
      type: Sequelize.STRING
    },
  });

  return Usuario;
};
