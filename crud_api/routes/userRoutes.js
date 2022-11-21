'use strict';

const express = require('express');
const userController= require('../controllers/userController');
const router = express.Router();

const {getsUser, getUserCode, login, getsUserForAssetsControl
    , AutoDeapartMent, ChackUserWeb, get_branch_period} = userController;

router.get('/users', getsUser);
router.get('/users/:body', getUserCode);
router.post('/login', login);
router.get('/getsUserForAssetsControl', getsUserForAssetsControl);
router.post('/AutoDeapartMent', AutoDeapartMent);
router.post('/ChackUserWeb', ChackUserWeb);
router.post('/get_branch_period', get_branch_period);

module.exports = {
    routes : router
}