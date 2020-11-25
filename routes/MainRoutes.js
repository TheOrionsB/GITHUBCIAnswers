const Router = require('express').Router();
const bodyParser = require('body-parser');

Router.use((req,res,next) => {
    const date = new Date();
    console.log(`[🕔] -- Caught @ ${date.getHours()}:${date.getMinutes()} -> ${req.ip} on ${req.url}`);
    next();
})

Router.post('/login', (req,res) => {
    const goodCredentials = {
        username: 'aled',
        password: 'workshop'
    }
    if (!req.body || !req.body.password) {
        res.status(400).send({status: 400, message:'error'});
    } else {
        res.status(200).send({status:200, message:'done'});
        console.log(`[✅] -- Logged in!`)
    }
})

Router.get('/teapot', (req, res) => {
    res.status(417).send({status: 417, message:'teapotlol'});
    console.log('[🫖] -- I\'m a teapot dude');
});

Router.post('/ping', (req, res) => {
    res.status(200).send({status:200, message:'Pong!'});
    console.log(`[✅] -- Pong lmao`);
});

module.exports = Router;
