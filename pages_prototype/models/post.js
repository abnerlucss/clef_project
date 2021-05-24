'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Postagem = sequelize.define('Postagem', {
        idPost: {
            field: 'idPost',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            field: 'titulo',
            type: DataTypes.STRING,
            allowNull: false
        },
        texto: {
            field: 'texto',
            type: DataTypes.STRING,
            allowNull: false
        },
        dataPost: {
            field: 'dataPost',
            type: DataTypes.DATE,
            allowNull: true
        },
        fkUsuario: {
            field: 'fkUsuario',
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            tableName: 'post',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    return Postagem;
};
