// Third party imports
require('dotenv').config({ path: './config.env' });
const express = require('express');
const sqlite = require('sqlite3');

// node inbuilt package imports
const path = require('path');

// filesystem imports

const models = require('./models'); // import all the models

// Creating an express app
const app = express();

// Configuring the views folder using which the controllers serve the webpages
app.set("views", path.join(__dirname, "views"));
// By setting view engine here, there is no need to mention file extension again in controllers
app.set('view engine', 'ejs');
// Setting up the static filess
app.use(express.static(path.join(__dirname, "public")));
// Adding a json middleware
app.use(express.json());
// Setting port as a key 'port' to the app
app.set('port', process.env.PORT || 5050);

// Setting up the routes
app.use('/', require('./routes/main'));
app.use('/admin', require('./routes/admin'));


// Listening at the port set before
app.listen(app.get('port'), () => {

    // Creates all the tables required, if not exist
    models.sequelize.sync().then(() => {
        // Logging after promise resolve
        console.log('DB sequelized\n');
    }).catch((err) => {
        // loggin if there is any error while sequelizing
        console.log(err.message);
    });
    // Loggin the server host name and port
    console.log(`Server Running at http://${(process.env_NODE_ENV === 'production') ? '172.105.49.237' : 'localhost'}:${app.get('port')}/`)
});


