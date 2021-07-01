const models = require('../../models');

// Dashboard Controllers
exports.dashboard = async (request, response, next) => {
    const { user } = response.locals;
    response.render('admin/dashboard/index', { title: 'dashboard' });
};