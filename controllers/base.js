const fetchData = require('../utils/fetchData');

exports.home = async (request, response, next) => {
    const jsonData = await fetchData({ sheetName: 'Sheet1', authToken: process.env.AUTH_TOKEN });
    console.log(jsonData);
    response.render("home/index", {});
};