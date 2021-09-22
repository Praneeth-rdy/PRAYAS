const fs = require("fs");

const models = require("../models").prayas.models;
const Image = models.Image;

const fetchData = require('../utils/fetchData');

exports.home = async (request, response, next) => {
  const [sheetName, authToken, isVertical] = ['HomeVars', process.env.AUTH_TOKEN, true];
  // const jsonResponse = await fetchData({ sheetName, authToken, isVertical });
  // console.log(jsonResponse);
  response.render("main/index", { title: 'Home' });
};

exports.about = async (request, response, next) => {
  const [sheetName, authToken, isVertical] = ['HomeVars', process.env.AUTH_TOKEN, true];
  // const jsonResponse = await fetchData({ sheetName, authToken, isVertical });
  // console.log(jsonResponse);
  response.render("main/about", { title: 'About' });
};

exports.projects = async (request, response, next) => {
  const [sheetName, authToken] = ['Projects', process.env.AUTH_TOKEN];
  // const jsonResponse = await fetchData({ sheetName, authToken });
  // console.log(jsonResponse);
  response.render("main/projects", { title: 'Projects' });
};

exports.members = async (request, response, next) => {
  const [sheetName, authToken] = ['Members', process.env.AUTH_TOKEN];
  const jsonResponse = await fetchData({ sheetName, authToken });
  console.log(jsonResponse);
  response.render("main/members", { title: 'Members', data: jsonResponse.data });
};

exports.gallery = async (request, response, next) => {
  const [sheetName, authToken, isVertical] = ['HomeVars', process.env.AUTH_TOKEN, true];
  // const jsonResponse = await fetchData({ sheetName, authToken, isVertical });
  // console.log(jsonResponse);
  response.render("main/gallery", { title: 'Gallery' });
};

exports.blog = async (request, response, next) => {
  const { blogId } = request.params;
  if (blogId) {
    response.render("main/blog", { title: 'Blog' });
  } else {
    response.render("main/blogs_list", { title: 'Blog' });
  }

};

exports.contact = async (request, response, next) => {
  const [sheetName, authToken, isVertical] = ['HomeVars', process.env.AUTH_TOKEN, true];
  // const jsonResponse = await fetchData({ sheetName, authToken, isVertical });
  // console.log(jsonResponse);
  response.render("main/contact", { title: 'Contact' });
};

exports.kmc = async (request, response, next) => {
  const [sheetName, authToken, isVertical] = ['HomeVars', process.env.AUTH_TOKEN, true];
  // const jsonResponse = await fetchData({ sheetName, authToken, isVertical });
  // console.log(jsonResponse);
  response.render("main/kmc/kmc", { title: 'KMC' });
};

exports.kmcReferral = async (request, response, next) => {
  const [sheetName, authToken, isVertical] = ['Referrals', process.env.AUTH_TOKEN, false];
  // const jsonResponse = await fetchData({ sheetName, authToken, isVertical });
  // console.log(jsonResponse);
  response.render("main/kmc/referral", { title: 'KMC' });
};

exports.getKmcReferral = async (request, response, next) => {
  const [sheetName, authToken, isVertical] = ['Referrals', process.env.AUTH_TOKEN, false];
  const jsonResponse = await fetchData({ sheetName, authToken, isVertical });
  let data = [];
  for(let item of jsonResponse.data){
    data.push(item.referral);
  }
  response.send(data);
};

exports.temp = (request, response, next) => {
  response.render('temp', { title: 'Demo', books: ['book1', 'book2', 'book3'] })
}

exports.upload = async (request, response, next) => {
  if (request.method == 'POST') {
    try {
      console.log(request.files);
      // response.send({
      //     'a':'b'
      // });

      if (request.files == undefined) {
        return response.send(`You must select a file.`);
      }

      Image.create({
        type: request.files[0].mimetype,
        name: request.files[0].originalname,
        data: "/media/" + request.files[0].originalname
      }).then((image) => {
        fs.writeFileSync(
          __basedir + "/public/media/" + image.name, fs.readFileSync(
            __basedir + "/public/media/tmp/" + request.files[0].filename
          )
        );
        // delete
        fs.unlinkSync(__basedir + "/public/media/tmp/" + request.files[0].filename);
        return response.send(`File has been uploaded.`);
      });
    } catch (error) {
      console.log(error);
      return response.send(`Error when trying upload images: ${error}`);
    }
  } else {
    const images = await Image.findAll();
    response.render('upload', { title: 'Upload', images });
  }
}