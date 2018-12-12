
const { PORT } = require('./config.json');
const { api } = require('./routes');
const { inspect } = require('util');
const opts = { colors: true, depth: Infinity };
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const go = () => {

    const app = express();

    app.set('db', require('./models'));

    app.use(logger('common'));

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, accesstoken, partnerid");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    });

    app.use(bodyParser.json({ type: 'application/json' }));
    app.use('/', api);

    app.use(function (req, res, next) {
        res.status(404).json({ message: 'NOT FOUND' });
    });

    const server = http.createServer(app);
    server.listen(PORT, () => console.log(inspect({ "Server listening on port": PORT }, opts)));

};

go();
