const express = require("express");
const TEST_NewNTI_Controller = require("../controllers/TEST_NewNTI_Controller");
const router = express.Router();

const {
  NewNTI_Station_Create
} = TEST_NewNTI_Controller;

router.post("/NewNTI_Station_Create", NewNTI_Station_Create);

module.exports = {
  routes: router,
};