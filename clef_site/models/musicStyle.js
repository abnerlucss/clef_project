'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Estilo = sequelize.define('Estilo', {
        idEstilo: {
            field: 'idEstilo',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomeEstilo: {
            field: 'nomeEstilo',
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
            tableName: 'estilo',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    return Estilo;
};
