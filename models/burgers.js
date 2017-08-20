module.exports = function(sequelize, DataTypes) {
    const Burgers = sequelize.define('burgers', {
        burgerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        devoured: 
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
    return Burgers;
}