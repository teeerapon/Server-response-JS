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
  Ropa_List,
  Ropa_List_User,
  Ropa_List_By_ID,
  Ropa_List_Dep,
  Ropa_Close_Save,
  Ropa_List_Collection,
  Ropa_SetActive_User
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
router.post("/Ropa_Close_Save", Ropa_Close_Save);
router.post("/TypeSave", TypeSave);
router.post("/UserSave", UserSave);
router.get("/Ropa_List", Ropa_List);
router.post("/Ropa_List_User", Ropa_List_User);
router.post("/Ropa_List_By_ID", Ropa_List_By_ID);
router.post("/Ropa_List_Collection", Ropa_List_Collection);
router.get("/Ropa_List_Dep", Ropa_List_Dep);
router.post("/Ropa_SetActive_User", Ropa_SetActive_User);

module.exports = {
  routes: router,
};
