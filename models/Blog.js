module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        title: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        display: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
        {
            tableName: 'blogs'
        });
    Blog.prototype.toString = function() {
        return this.title;
    }
    return Blog;
};