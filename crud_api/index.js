'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');

const PTEC_USERSRIGHT_Routes = require('./routes/PTEC_USERSRIGHT_Routes');
const PTEC_FA_Routes = require('./routes/PTEC_FA_Rotes');
const PTEC_FA_PERIOD_Routes = require('./routes/PTEC_FA_PERIOD_Routes');
const TEST_PDPA_Routes = require('./routes/TEST_PDPA_Routes');
const TEST_NewNTI_Routes = require('./routes/TEST_NewNTI_Routes');

const app = express();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(express.static("files"));
app.use(fileupload());
app.use(cors());

app.use('/api', PTEC_USERSRIGHT_Routes.routes);
app.use('/api', PTEC_FA_Routes.routes);
app.use('/api', PTEC_FA_PERIOD_Routes.routes);
app.use('/api', TEST_PDPA_Routes.routes);
app.use('/api', TEST_NewNTI_Routes.routes);

app.listen(config.PTEC.port, ()=> console.log('Server is listening on http://localhost : port : ' + config.PTEC.port));