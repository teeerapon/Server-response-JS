'use strict';

const express = require('express');
const periodController= require('../controllers/periodController');
const router = express.Router();

const {period_login, getAllround_period, permission_branch, craete_period , update_period
        , delete_period, select_priod} = periodController;

router.post('/period_login', period_login);
router.post('/period_round', getAllround_period);
router.post('/permission_branch', permission_branch);
router.post('/craete_period', craete_period);
router.post('/update_period', update_period);
router.post('/delete_period', delete_period);
router.post('/select_call_priod', select_priod);

module.exports = {
    routes : router
}