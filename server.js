require('dotenv').config({path: './config.env'});

const express = require('express');

// Connect DB

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());

app.use('/', require('./routes/main'));


const PORT = process.env.PORT || 5050

app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}/`));
