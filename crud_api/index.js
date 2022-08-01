'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const assetRoutes = require('./routes/assetRotes');
const periodRoutes = require('./routes/periodRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', userRoutes.routes);
app.use('/api', periodRoutes.routes);
app.use('/api', assetRoutes.routes);

app.listen(config.port, ()=> console.log('Server is listening on http://localhost : port : ' + config.port));