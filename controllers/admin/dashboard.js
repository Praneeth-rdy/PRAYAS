const models = require('../../models');
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

exports.blog = async (request, response, next) => {
    const { user } = response.locals;
    const { blogId } = request.params;
    if (blogId) {
        await Blog.findOne({
            where: {
                id: blogId
            }
        }).then(async (blog) => {
            try {
                if (request.method == 'GET') {
                    response.render('admin/dashboard/model/rud.ejs', { title: 'Blog' });
                } else if (request.method == 'PUT') {
                    await blog.update(request.body);
                    response.send({ success: true });

                } else if (request.method == 'DELETE') {
                    console.log('Delete request')
                    await blog.destroy();
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
    } else {
        // check the method
        // if get, 
        // return all blogs dashboard with a list of blogs with edit, delete buttons on each list item
        // and a single button modal to create a blog
        if (request.method == 'GET') {
            await Blog.findAll().then((blogs) => {
                response.locals.entries = blogs;
                // console.log(blogs)
            });
            return response.render('admin/dashboard/model/index', { title: 'blog' });
        } else if (request.method == 'POST') {
            await Blog.create(request.body);
            return response.redirect('/admin/dashboard/blog');
        } else {
            response.send('Invalid Request');
        }
        // if post, create the blog if not exist
    }
};