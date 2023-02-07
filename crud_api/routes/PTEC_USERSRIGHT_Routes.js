'use strict';

const express = require('express');
const userController = require('../controllers/PTEC_USERSRIGHT_Controller');
const router = express.Router();

const { getsUser, getUserCode, login, getsUserForAssetsControl
    , AutoDeapartMent, ChackUserWeb, select_Permission_Menu_NAC, Permission_Menu_NAC
    , Fix_Assets_Control_UPDATE_Permission } = userController;

router.get('/users', getsUser);
router.get('/users/:body', getUserCode);
router.post('/login', login);
router.get('/getsUserForAssetsControl', getsUserForAssetsControl);
router.post('/AutoDeapartMent', AutoDeapartMent);
router.post('/ChackUserWeb', ChackUserWeb);
router.post('/select_Permission_Menu_NAC', select_Permission_Menu_NAC);
router.post('/Permission_Menu_NAC', Permission_Menu_NAC);
router.post('/Fix_Assets_Control_UPDATE_Permission', Fix_Assets_Control_UPDATE_Permission);

module.exports = {
    routes: router
}