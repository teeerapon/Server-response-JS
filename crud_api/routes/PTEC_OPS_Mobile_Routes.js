'use strict';

const express = require('express');
const ptec_OPS_Mobile = require('../controllers/PTEC_OPS_Mobile');
const router = express.Router();

const dotenv = require('dotenv');
const env = dotenv.config().parsed
const line = require('@line/bot-sdk');

const lineConfig = {
  channelAccessToken: env.ACCESSTOKEN,
  channelSecret: env.SECRET_TOKEN,
}

const {
    OPS_Mobile_List_Vender,
    webhooks,
    STrack_Registation
} = ptec_OPS_Mobile;


router.get('/OPS_Mobile_List_Vender', OPS_Mobile_List_Vender);
router.post('/STrack_Registation', STrack_Registation);
router.post('/webhooks', webhooks, line.middleware(lineConfig));

// https://stackblitz.com/edit/react-ts-bxdz2e?file=src%2FApp.js

module.exports = {
    routes: router
}