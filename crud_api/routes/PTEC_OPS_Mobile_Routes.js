'use strict';

const express = require('express');
const ptec_OPS_Mobile = require('../controllers/PTEC_OPS_Mobile');
const router = express.Router();

const { OPS_Mobile_List_Vender } = ptec_OPS_Mobile;

router.get('/OPS_Mobile_List_Vender', OPS_Mobile_List_Vender);

module.exports = {
    routes: router
}