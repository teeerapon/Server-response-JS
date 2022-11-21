'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const assetRoutes = require('./routes/assetRotes');
const periodRoutes = require('./routes/periodRoutes');
const TEST_PDPA_Routes = require('./routes/TEST_PDPA_Routes');
const TEST_NewNTI_Routes = require('./routes/TEST_NewNTI_Routes');

const app = express();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', userRoutes.routes);
app.use('/api', periodRoutes.routes);
app.use('/api', assetRoutes.routes);
app.use('/api', TEST_PDPA_Routes.routes);
app.use('/api', TEST_NewNTI_Routes.routes);

app.listen(config.PTEC.port, ()=> console.log('Server is listening on http://localhost : port : ' + config.PTEC.port));