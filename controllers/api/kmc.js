const models = require('../../models').prayas.models;

exports.index = async (request, response, next) => {
    response.send('KMC Index');
};

exports.login = async (request, response, next) => {
    response.send('Login');
};
