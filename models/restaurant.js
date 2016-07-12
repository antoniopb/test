"use strict"

module.exports = function(sequelize, DataTypes) {
	var Restaurant = sequelize.define('restaurant', {
		id : DataTypes.BIGINT,
		name: DataTypes.STRING,
		address_id: DataTypes.BIGINT
	}, {
		classMethods: {
			associate: function(models) {
				Restaurant.hasOne(models.Address, {
					onDelete : "CASCADE",
					allowNull: false
				});
			}
		}
	});
	return Restaurant;
};