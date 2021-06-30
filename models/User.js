const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
    },
    {
        tableName: 'users'
    });

    User.prototype.verifyPassword = async (password) => {
        return await bcrypt.compare(password, this.password);
    }

    const hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    };

    User.afterValidate(async (user, options) => {
        user.password = await hashPassword(user.password);
    });
    return User;
};