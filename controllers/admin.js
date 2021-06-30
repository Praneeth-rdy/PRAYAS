
exports.login = async (request, response, next) => {
    response.render("admin/login", { title: 'Home' });
};