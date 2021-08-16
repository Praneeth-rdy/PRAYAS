const models = require('../../models').prayas.models;
const { User, Blog } = models;

// Dashboard Controllers
exports.dashboard = async (request, response, next) => {
    const { user } = response.locals;
    /*
    models.User.findAll().then((users) => {
        console.log(users);
    })
    */
    // console.log(models)
    response.render('admin/dashboard/index', { title: 'dashboard' });
};


exports.modelCRUD = async (request, response, next) => {
    const { user } = response.locals;
    const { modelName, modelId } = request.params;
    const model = models[modelName.toUpperCase()[0] + modelName.toLowerCase().slice(1)]

    if (model && modelId) {
        await model.findOne({
            where: {
                id: modelId
            }
        }).then(async (modelItem) => {
            response.locals.model = model;
            response.locals.modelItem = modelItem;
            try {
                if (request.method == 'GET') {
                    response.render('admin/dashboard/model/rud.ejs', { title: 'Blog' });
                } else if (request.method == 'PUT') {
                    await modelItem.update(request.body);
                    response.send({ success: true });
                } else if (request.method == 'DELETE') {
                    console.log('Delete request')
                    await modelItem.destroy();
                    response.send({ success: true });
                } else {
                    response.send('Invalid Request');
                }
            } catch (error) {
                console.log(error.message);
            }
        }).catch((error) => {
            console.log(error.message);
            return response.send(error.message);
        });
    } else if (model) {
        response.locals.model = model;
        // check the method
        // if get, 
        // return all blogs dashboard with a list of blogs with edit, delete buttons on each list item
        // and a single button modal to create a blog
        if (request.method == 'GET') {
            await model.findAll().then((blogs) => {
                response.locals.entries = blogs;
                // console.log(blogs)
            });
            return response.render('admin/dashboard/model/index', { title: 'blog' });
        } else if (request.method == 'POST') {
            await model.create(request.body);
            return response.redirect('/admin/dashboard/blog');
        } else {
            response.send('Invalid Request');
        }
        // if post, create the blog if not exist
    } else {
        response.send('Invalid Request');
    }

};