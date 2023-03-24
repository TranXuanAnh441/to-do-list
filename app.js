const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const tasksRoutes = require('./routes/tasks');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(tasksRoutes);

app.use((req, res, next)=> {
    next();
})

mongoose
    .connect('mongodb+srv://txanh2002:33112299@cluster0.et7ci3b.mongodb.net/to-do-list')
    .then(result => {
        console.log('Connected');
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });