const models = require('../models').prayas.models;

exports.isLoggedIn = (request, response, next) => {
    if (!request.session.userId) {
        response.redirect('/admin/login');
    } else {
        next();
    }
};

exports.isNotLoggedIn = (request, response, next) => {
    if (request.session.userId) {
        response.redirect('/admin/dashboard');
    } else {
        next();
    }
};

exports.updateDashboardNav = (request, response, next) => {
    response.locals.models = models;
    next();
}

exports.updateDashboardInputs = (request, response, next) => {
    response.locals.inputs = {
        STRING: {
            tag: 'input',
            type: 'text'
        },
        INTEGER: {
            tag: 'input',
            type: 'number'
        },
        BIGINT: {
            tag: 'input',
            type: 'number'
        },
        FLOAT: {
            tag: 'input',
            type: 'number'
        },
        BOOLEAN: {
            tag: 'input',
            type: 'checkbox'
        },
        TEXT: {
            tag: 'textarea',
        },
        REAL: {
            tag: 'input',
            type: 'number'
        },
        BLOB: {
            tag: 'input',
            type: 'file'
        },
        DOUBLE: {
            tag: 'input',
            type: 'number'
        },
        DECIMAL: {
            tag: 'input',
            type: 'number'
        },
        DATE: {
            tag: 'input',
            type: 'datetime-local'
        },
        DATEONLY: {
            tag: 'input',
            type: 'date'
        }
    };
    next();
}