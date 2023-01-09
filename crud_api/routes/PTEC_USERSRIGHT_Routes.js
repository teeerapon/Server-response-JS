'use strict';

const express = require('express');
const userController= require('../controllers/PTEC_USERSRIGHT_Controller');
const router = express.Router();

const {getsUser, getUserCode, login, getsUserForAssetsControl
    , AutoDeapartMent, ChackUserWeb, get_branch_period
    ,select_Permission_Menu_NAC} = userController;

router.get('/users', getsUser);
router.get('/users/:body', getUserCode);
router.post('/login', login);
router.get('/getsUserForAssetsControl', getsUserForAssetsControl);
router.post('/AutoDeapartMent', AutoDeapartMent);
router.post('/ChackUserWeb', ChackUserWeb);
router.post('/get_branch_period', get_branch_period);
router.post('/select_Permission_Menu_NAC', select_Permission_Menu_NAC);

module.exports = {
    routes : router
}