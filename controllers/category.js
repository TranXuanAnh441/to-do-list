const Category = require('../models/category');

exports.getAddCategory = (req, res, next) => {
    res.render('category/edit-category',  {'pageTitle': 'Add Category', editing: false, path:'/add-category'});
};

exports.postAddCategory = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;

    const newCategory = new Category({
        name: name,
        description: description
    });
    newCategory
        .save()
        .then(result => res.redirect('/'))
        .catch(err => console.log(err));
}