const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo


  sequelize.define('dog', {
    //podria haberlo dejado vacio para el id N° predeteriminado,pero...
    //choca con el que me mande la API externa?
    //https://www.tabnine.com/code/javascript/functions/sequelize/UUIDV4
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      //le incido que el campo es requerido
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //preguntar sobre el uso de banderas como identificador para los dogs creados por el usuario
    //muchas webs 🙆🏻‍♂️
    /* flagByUser: {
          type: DataTypes.ENUM('Internal', 'External'),
          allowNull:false,
        }*/


    //creados by user
    flagByUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }

  },{
    timestamps: true,
    createdAt: 'Iniciado',
    updatedAt: 'Modificado'
  });
};


