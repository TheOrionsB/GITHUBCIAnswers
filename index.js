const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/MainRoutes');
const port = 42069
const app = express();



app.use(cors())

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

app.listen(port, () => {
    console.log(`[✅] -- Server listening on http://localhost:${port} Have fun! 😊`)
});