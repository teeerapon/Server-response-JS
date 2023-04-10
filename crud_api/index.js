'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');

// const dotenv = require('dotenv');
// const env = dotenv.config().parsed
// const line = require('@line/bot-sdk');

// const lineConfig = {
//   channelAccessToken: env.ACCESSTOKEN,
//   channelSecret: env.SECRET_TOKEN,
// }

const PTEC_USERSRIGHT_Routes = require('./routes/PTEC_USERSRIGHT_Routes');
const PTEC_FA_Routes = require('./routes/PTEC_FA_Rotes');
const PTEC_FA_PERIOD_Routes = require('./routes/PTEC_FA_PERIOD_Routes');
const TEST_PDPA_Routes = require('./routes/TEST_PDPA_Routes');
const TEST_NewNTI_Routes = require('./routes/TEST_NewNTI_Routes');
const PTEC_OPS_Mobile = require('./routes/PTEC_OPS_Mobile_Routes');


const corsOptions = {
    origin: 'http://example.com', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("files"));
app.use(fileupload());
app.use(cors(corsOptions))

app.use('/api', PTEC_USERSRIGHT_Routes.routes);
app.use('/api', PTEC_FA_Routes.routes);
app.use('/api', PTEC_FA_PERIOD_Routes.routes);
app.use('/api', TEST_PDPA_Routes.routes);
app.use('/api', TEST_NewNTI_Routes.routes);
app.use('/api', PTEC_OPS_Mobile.routes);

app.listen(config.PTEC.port, () => console.log('Server is listening on http://localhost : port : ' + config.PTEC.port));