const express = require("express");
const TEST_NewNTI_Controller = require("../controllers/TEST_NewNTI_Controller");
const router = express.Router();

const {
  NewNTI_Station_Create,
  Districts_List,
  Amphures_List,
  Provinces_List
} = TEST_NewNTI_Controller;

router.post("/NewNTI_Station_Create", NewNTI_Station_Create);
router.get("/Districts_List", Districts_List);
router.get("/Amphures_List", Amphures_List);
router.get("/Provinces_List", Provinces_List);

module.exports = {
  routes: router,
};