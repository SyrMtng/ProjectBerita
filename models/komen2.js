module.exports = (sequelize, Sequelize) => {
	const Komen2 = sequelize.define("komen2", {
		idberita1: {
			type: Sequelize.INTEGER
		},
        idkomen: {
			type: Sequelize.STRING
		},
		nama1: {
			type: Sequelize.STRING
		}, 
		balas: {
			type: Sequelize.TEXT
		},	
	});
	return Komen2;
};