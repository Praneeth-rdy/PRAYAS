const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        validTill: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        },
    },
        {
            tableName: 'users'
        });

    User.prototype.toString = function () {
        return this.username;
    }

    User.prototype.verifyPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    }

    User.prototype.getSignedToken = function () {
        return jwt.sign(
            { id: this.id },
            process.env.JWT_SECRET,
            // { expiresIn: process.env.JWT_EXPIRE }
        );
    }

    User.afterValidate(async (user, options) => {
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await await bcrypt.hash(user.password, salt);
        }
    });
    return User;
};