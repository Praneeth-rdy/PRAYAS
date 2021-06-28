const fetchData = require('../utils/fetchData');

exports.home = async (request, response, next) => {
    const [sheetName, authToken, isVertical] = ['VerticalDataItems', process.env.AUTH_TOKEN, true];
    const jsonData = await fetchData({ sheetName, authToken, isVertical });
    console.log(jsonData);
    response.render("home/index", {});
};

exports.projects = async (request, response, next) => {
    const [sheetName, authToken] = ['Projects', process.env.AUTH_TOKEN];
    const jsonData = await fetchData({ sheetName, authToken, isVertical });
    console.log(jsonData);
    response.render("home/index", {});
};