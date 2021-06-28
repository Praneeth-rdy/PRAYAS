const fetchData = require('../utils/fetchData');

exports.home = async (request, response, next) => {
    const [sheetName, authToken, isVertical] = ['HomeVars', process.env.AUTH_TOKEN, true];
    // const jsonResponse = await fetchData({ sheetName, authToken, isVertical });
    // console.log(jsonResponse);
    response.render("main/index", {title: 'Home'});
};

exports.about = async (request, response, next) => {
    const [sheetName, authToken, isVertical] = ['HomeVars', process.env.AUTH_TOKEN, true];
    // const jsonResponse = await fetchData({ sheetName, authToken, isVertical });
    // console.log(jsonResponse);
    response.render("main/index", {title: 'About'});
};

exports.projects = async (request, response, next) => {
    const [sheetName, authToken] = ['Projects', process.env.AUTH_TOKEN];
    const jsonResponse = await fetchData({ sheetName, authToken });
    console.log(jsonResponse);
    response.render("main/projects", {title: 'Projects'});
};

exports.members = async (request, response, next) => {
    const [sheetName, authToken, isVertical] = ['HomeVars', process.env.AUTH_TOKEN, true];
    // const jsonResponse = await fetchData({ sheetName, authToken, isVertical });
    // console.log(jsonResponse);
    response.render("main/index", {title: 'Members'});
};

exports.contact = async (request, response, next) => {
    const [sheetName, authToken, isVertical] = ['HomeVars', process.env.AUTH_TOKEN, true];
    // const jsonResponse = await fetchData({ sheetName, authToken, isVertical });
    // console.log(jsonResponse);
    response.render("main/index", {title: 'Contact'});
};

exports.temp = (request, response, next) => {
    response.render('temp', {title: 'Demo', books: ['book1', 'book2', 'book3']})
}