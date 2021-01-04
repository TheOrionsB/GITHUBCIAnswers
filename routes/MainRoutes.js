const Router = require('express').Router();
const bodyParser = require('body-parser');
const fs = require('fs');

Router.use((req,res,next) => {
    const date = new Date();
    console.log(`[🕔] -- Caught @ ${date.getHours()}:${date.getMinutes()} -> ${req.ip} on ${req.url}`);
    next();
})

Router.post('/login', (req, res) => {
    const goodCredentials = {
        username: 'aled',
        password: 'workshop'
    }
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400).send({status: 400, message:'Bad request'});
    } else if (req.body.username === goodCredentials.username && req.body.password === goodCredentials.password) {
        res.status(200).send({status: 200, message:'Ok.'});
    } else {
        res.status(401).send({status: 400, message:'Unauthorized'});
        console.log(`[✅] -- Logged in!`)
    }
})

Router.post('/register', (req, res) => {
    if (!req.body || !req.body.email || !req.body.username || !req.body.password)
        res.status(400).send({status: 400, message: 'Bad request'});
    else {
        res.status(200).send({status: 200, message: 'OK.'});
        console.log(`[✅] -- New user registered`);
    }
});

Router.get('/pupper', (req, res) => {
    const pupPath = __dirname + '/../public/img/shibe.jpg';
    console.log(pupPath);
    if (!fs.existsSync(pupPath))
        res.status(404).send({status: 404, message: 'Pupper not found. :('});
    else {
        res.status(200).download(pupPath);
    }
})

Router.get('/teapot', (req, res) => {
    res.status(418).send({status: 418, message:'I\'m a teapot.'});
    console.log('[🫖] -- I\'m a teapot dude');
});

Router.get('/ping', (req, res) => {
    res.status(200).send({status:200, message:'Pong!'});
    console.log(`[✅] -- Pong lmao`);
});

module.exports = Router;