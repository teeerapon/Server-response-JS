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
  SmartBill_Withdraw_Save,
  SmartBill_Withdraw_SelectAllForms,
  SmartBill_CreateCost,
  SmartBill_WithdrawDtl_SelectCategory,
  SmartBill_WithdrawDtl_SaveChangesCategory,
  SmartBill_WithdrawDtl_DeleteCategory,
  SmartBill_Withdraw_Delete,
  SmartBill_WithdrawDtl_SaveChangesHotelGroup,
  SmartBill_WithdrawDtl_SelectHotelGroup,
  SmartBill_WithdrawDtl_DeleteHotelGroup,
  SmartBill_Withdraw_Addrow,
  SmartBill_Withdraw_AddrowDtl,
  SmartBill_WithdrawDtl_Delete,
  SmartBill_Withdraw_updateSBW
  
} = billController;

router.post('/SmartBill_CreateForms', SmartBill_CreateForms);
router.post('/SmartBill_CarInfoSearch', SmartBill_CarInfoSearch);
router.post('/SmartBill_files', SmartBill_files);
router.get('/SmartBill_SelectHeaders', SmartBill_SelectHeaders);
router.post('/SmartBill_SelectAllForms', SmartBill_SelectAllForms);
router.post('/SmartBill_ESGQuery', SmartBill_ESGQuery);
router.post('/SmartBill_Withdraw_Save', SmartBill_Withdraw_Save);
router.post('/SmartBill_Withdraw_SelectAllForms', SmartBill_Withdraw_SelectAllForms);
router.post('/SmartBill_CreateCost', SmartBill_CreateCost);
router.post('/SmartBill_WithdrawDtl_SelectCategory', SmartBill_WithdrawDtl_SelectCategory);
router.post('/SmartBill_WithdrawDtl_SaveChangesCategory', SmartBill_WithdrawDtl_SaveChangesCategory);
router.post('/SmartBill_WithdrawDtl_DeleteCategory', SmartBill_WithdrawDtl_DeleteCategory);
router.post('/SmartBill_Withdraw_Delete', SmartBill_Withdraw_Delete);
router.post('/SmartBill_WithdrawDtl_SaveChangesHotelGroup', SmartBill_WithdrawDtl_SaveChangesHotelGroup);
router.post('/SmartBill_WithdrawDtl_SelectHotelGroup', SmartBill_WithdrawDtl_SelectHotelGroup);
router.post('/SmartBill_WithdrawDtl_DeleteHotelGroup', SmartBill_WithdrawDtl_DeleteHotelGroup);
router.post('/SmartBill_Withdraw_Addrow', SmartBill_Withdraw_Addrow);
router.post('/SmartBill_Withdraw_AddrowDtl', SmartBill_Withdraw_AddrowDtl);
router.post('/SmartBill_WithdrawDtl_Delete', SmartBill_WithdrawDtl_Delete);
router.post('/SmartBill_Withdraw_updateSBW', SmartBill_Withdraw_updateSBW);

module.exports = {
  routes: router
}