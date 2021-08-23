const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('temperament', {

    //no hace falta xq me genera uno por defecto 
    
    // id: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   //le incido que el campo es requerido
    //   allowNull: false,
    //   primaryKey: true
    // },

    //podía haber usado un ENUM para los temperamentos?
    //mejor no jaja
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },



  },
//po que? no hay poque ?
//me parecio interesante ponerlos en español desde aquí
    {
      timestamps: true,
      createdAt: 'Iniciado',
      updatedAt: 'Modificado'
    });
};