'use strict';

const express = require('express');
const userController= require('../controllers/userController');
const router = express.Router();

const {getsUser, getUserCode, addUser, updateUser, deleteUser, login, getsUserForAssetsControl
    , AutoDeapartMent, ChackUserWeb} = userController;

router.get('/users', getsUser);
router.get('/users/:body', getUserCode);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', login);
router.get('/getsUserForAssetsControl', getsUserForAssetsControl);
router.post('/AutoDeapartMent', AutoDeapartMent);
router.post('/ChackUserWeb', ChackUserWeb);

module.exports = {
    routes : router
}