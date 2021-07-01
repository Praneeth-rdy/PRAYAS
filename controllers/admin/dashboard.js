const models = require('../../models');
const { User, Blog } = models;

// Dashboard Controllers
exports.dashboard = async (request, response, next) => {
    const { user } = response.locals;
    /*
    models.User.findAll().then((users) => {
        console.log(users);
    })
    */
    // console.log(models)
    response.render('admin/dashboard/index', { title: 'dashboard' });
};

exports.blog = async (request, response, next) => {
    const { user } = response.locals;
    console.log();
    response.render('admin/dashboard/index', { title: 'blog' });
};