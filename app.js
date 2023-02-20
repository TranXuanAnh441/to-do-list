const express = require('express');

const app = express();

app.use((req, res, next)=> {
    res.write('<h1>Welcome to my app</h1>');
    res.end()
})
app.listen(3000);