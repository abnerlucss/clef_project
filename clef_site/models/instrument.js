'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Instrumento = sequelize.define('Instrumento',{
		idInstrumento: {
			field: 'idInstrumento',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nomeInstrumento: {
			field: 'nomeInstrumento',
			type: DataTypes.STRING,
			allowNull: false
		},
		srcImg: {
			field: 'srcImg',
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		tableName: 'instrumento', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Instrumento;
};
