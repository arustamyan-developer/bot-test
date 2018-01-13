const express = require('express');
const path = require('path');
const bot = require('./bot');

const app = express();

bot.initialBot();

// git push -u origin master

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

app.listen(process.env.PORT || 8080);

