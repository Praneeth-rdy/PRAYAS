const jwt = require('jsonwebtoken');
const { User: kmcUser } = require('../models').kmc.models;
const ErrorResponse = require('../utils/errorResponse');

const tokenAuth = async (request, response, next, User) => {
    let token;

    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
        // Bearer <token>
        token = request.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);

        if (!user) {
            return next(new ErrorResponse("No user found with this id", 404))
        }
        response.locals.user = user;
        next();
    } catch (error) {
        return next(new ErrorResponse("Not Authorized to access this route", 401));
    }
}

module.exports.kmcAuthCheck = (request, response, next) => {
    tokenAuth(request, response, next, kmcUser);
}