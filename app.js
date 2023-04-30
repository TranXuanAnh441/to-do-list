const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const tasksRoutes = require('./routes/task');
const categoryRoutes = require('./routes/category');
const Category = require('./models/category');
const getTasks = require('./controllers/task').getTasks;

const defaultCategories = require('./utils/default').defaultCategories;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/task', tasksRoutes);
app.use('/category', categoryRoutes);

app.get('/', (req, res, next)=> {    
    getTasks(req, res, next);
})

app.use((req, res, next) => {
    res.render('404.ejs', {pageTitle: 'Not found', path:'/404'});
});

mongoose
    .connect('mongodb+srv://txanh2002:33112299@cluster0.et7ci3b.mongodb.net/to-do-list')
    .then(result => {
        Category.findOne().then(category => {
            if(!category) {
                for (const [category, color] of Object.entries(defaultCategories)) {
                    const newCategory = new Category({
                        name: `${category}`,
                        color: `${color}`,
                    })
                    newCategory.save();
                }
            } else {
                // console.log(category);
            }
        })

        console.log('Connected');
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });