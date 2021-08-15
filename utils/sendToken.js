const sendToken = (user, statusCode, response) => {
    const token = user.getSignedToken();
    response.status(statusCode).json({ success: true, token });
};

module.exports = sendToken;