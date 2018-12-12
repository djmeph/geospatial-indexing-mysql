module.exports = (sequelize, DataTypes) => {
    const Geolocation = sequelize.define('Geolocation', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        coordinates: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
		tableName: 'Geolocation'
	});
    Geolocation.sync();
    return Geolocation;
};
