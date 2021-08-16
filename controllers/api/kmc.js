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
            try {
                await User.create(request.body);
            } catch (error) {
                return response.send({
                    success: "false",
                    error
                });
            }
        } else {
            response.send({
                message: "Invalid Request"
            });
        }
    } else {
        await User.findOne({
            where: {
                id
            }
        }).then(async (user) => {
            if (request.method == 'PUT') {
                await user.update(request.body);
                response.send({ success: true, user });
            } else if (request.method == 'DELETE') {
                await user.destroy();
                response.send({ success: true });
            } else if (request.method == 'GET') {
                response.send(JSON.stringify(user));
            } else {
                response.send({
                    success: false,
                    message: "Invalid Request"
                });
            }
        });
    }
};

exports.getUserInfo = (request, response, next) => {
    const user = response.locals.user;
    response.send({ username: user.username, isAdmin: user.isAdmin, validTill: user.validTill });
}