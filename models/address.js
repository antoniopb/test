"use strict";

module.exports = function(sequelize, DataTypes) {
	var Address = sequelize.define('address', {
		id : DataTypes.BIGINT,
		street : DataTypes.STRING,
		number : DataTypes.INTEGER,
		neighborhood : DataTypes.STRING,
		city : DataTypes.STRING,
		state : DataTypes.STRING,
		country : DataTypes.STRING
	})		
}
