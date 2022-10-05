module.exports = (sequelize, Sequelize) => {
	const Komen1 = sequelize.define("komen1", {
		idberita: {
			type: Sequelize.INTEGER
		},
		nama: {
			type: Sequelize.STRING
		}, 
		isi: {
			type: Sequelize.TEXT
		},	
	});
	return Komen1;
};