'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let FavoritarInstrumento = sequelize.define('FavoritarInstrumento', {
        fkUsuario: {
            field: 'fkUsuario',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        fkInstrumento: {
            field: 'fkInstrumento',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dataFavoritado: {
            field: 'dataFavoritado',
            type: DataTypes.DATE,
            allowNull: true
        },
    },
        {
            tableName: 'usuario',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    return FavoritarInstrumento;
};
