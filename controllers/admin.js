const models = require('../models');


exports.login = async (request, response, next) => {
    if (request.method == 'POST') {
        const { username, password } = request.body;
        // console.log(request)
        console.log('Post request');
        if (username && password) {
            try {
                models.User.findOne({ where: { username } }).then((user) => {
                    user.verifyPassword(password).then((isMatch) => {
                        if (isMatch) {
                            request.session.userId = user.id;
                            response.redirect('/admin/dashboard');
                        }
                    }).catch((error) => {
                        console.log(e.message);
                        response.render("admin/login", { title: 'Login', message: error.message });
                    });
                });
            } catch (error) {
                response.render("admin/login", { title: 'Login', message: error.message });
            }

        } else {
            response.render("admin/login", { title: 'Login', message: 'Both the fields are required!' });
        }
    } else if (request.method == 'GET') {
        response.render("admin/login", { title: 'Home' });
    } else {
        response.send('Invalid Request!');
    }
};

exports.logout = async (request, response, next) => {
    request.session.destroy((error) => {
        if (error) {
            return response.redirect('/admin/dashboard');
        }

        // After destroying the session in the server memory
        // Clear the cookie on client
        response.clearCookie(process.env.SESSION_NAME || 'sid');
        // Then redirect to login page
        response.redirect('/admin/login')
    });
};



// Dashboard Controllers
exports.dashboard = async (request, response, next) => {
    const { user } = response.locals;
    response.render('admin/dashboard/index', { title: 'dashboard' });
};