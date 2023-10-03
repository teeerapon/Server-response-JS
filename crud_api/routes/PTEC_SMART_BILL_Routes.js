'use strict';

const express = require('express');
const billController = require('../controllers/PTEC_SMART_BILL_Controller.js');
const router = express.Router();

const {

  SmartBill_CreateForms,
  SmartBill_CarInfoSearch,
  SmartBill_files,
  SmartBill_SelectHeaders,
  SmartBill_SelectAllForms,
  SmartBill_ESGQuery,
  
} = billController;

router.post('/SmartBill_CreateForms', SmartBill_CreateForms);
router.post('/SmartBill_CarInfoSearch', SmartBill_CarInfoSearch);
router.post('/SmartBill_files', SmartBill_files);
router.get('/SmartBill_SelectHeaders', SmartBill_SelectHeaders);
router.post('/SmartBill_SelectAllForms', SmartBill_SelectAllForms);
router.post('/SmartBill_ESGQuery', SmartBill_ESGQuery);

module.exports = {
  routes: router
}