"use strict";

const express = require("express");
const TEST_PDPA_Controller = require("../controllers/TEST_PDPA_Controller");
const router = express.Router();

const {
  addCollection,
  addOwner,
  addPermissionAccess,
  addType,
  collectionSave,
  removeOwner,
  removePermissionAccess,
  removeType,
  RopaSave,
  TypeSave,
  UserSave,
} = TEST_PDPA_Controller;

router.post("/addCollection", addCollection);
router.post("/addOwner", addOwner);
router.post("/addPermissionAccess", addPermissionAccess);
router.post("/addType", addType);
router.post("/CollectionSave", collectionSave);
router.post("/removeOwner", removeOwner);
router.post("/removePermissionAccess", removePermissionAccess);
router.post("/removeType", removeType);
router.post("/RopaSave", RopaSave);
router.post("/TypeSave", TypeSave);
router.post("/UserSave", UserSave);

module.exports = {
  routes: router,
};