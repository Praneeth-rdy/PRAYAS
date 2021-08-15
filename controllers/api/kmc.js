const { User } = require('../../models').kmc.models;
const sendToken = require('../../utils/sendToken');
const ErrorResponse = require('../../utils/errorResponse');

exports.index = async (request, response, next) => {
    response.send('KMC Index');
};

exports.login = async (request, response, next) => {
    const { username, password } = request.body;

    if (!username || !password) {
        return next(new ErrorResponse("Please provide username and password", 400));
    }

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        const isMatch = await user.verifyPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        sendToken(user, 200, response);

    } catch (error) {
        next(error);
    }
};

exports.userCRUD = async (request, response, next) => {
    const { id } = request.params;
    if (!(id)) {
        if (request.method == 'POST') {

        } else {

        }
    } else {
        if (request.method == 'PUT') {

        } else if (request.method == 'DELETE') {

        } else {
            console.log(User);
        }
    }
    response.send('userCrud');
};

exports.getUserInfo = (request, response, next) => {
    response.send(JSON.stringify(response.locals.user));
}