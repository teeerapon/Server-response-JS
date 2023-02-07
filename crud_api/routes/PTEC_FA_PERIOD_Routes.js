'use strict';

const express = require('express');
const periodController = require('../controllers/PTEC_FA_PERIOD_Controller');
const router = express.Router();

const { period_login, getAllround_period, permission_branch, craete_period, update_period
    , delete_period, select_priod, round_website, FA_Period_GroupBy, get_branch_period } = periodController;

router.post('/period_login', period_login);
router.post('/period_round', getAllround_period);
router.post('/permission_branch', permission_branch);
router.post('/craete_period', craete_period);
router.post('/update_period', update_period);
router.post('/delete_period', delete_period);
router.post('/select_call_priod', select_priod);
router.post('/round_website', round_website);
router.get('/FA_Period_GroupBy', FA_Period_GroupBy);
router.post('/get_branch_period', get_branch_period);

module.exports = {
    routes: router
}