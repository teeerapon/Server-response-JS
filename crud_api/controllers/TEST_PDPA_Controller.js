"use strict";

const TEST_PDPA = require("../PTEC_DATA/query_PDPA");
const TokenManager = require("./token_manager");

const addCollection = async (req, res, next) => {
  // console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_addCollection(data);
    // console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    // console.log(resultData);
    // console.log(`length ${resultData.length}`);
    // console.log(`aaaa ${resultData.data}`);
    // console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addOwner = async (req, res, next) => {
  // console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_addOwner(data);
    // console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    // console.log(resultData);
    // console.log(`length ${resultData.length}`);
    // console.log(`aaaa ${resultData.data}`);
    // console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addPermissionAccess = async (req, res, next) => {
  // console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_addPermissionAccess(data);
    // console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    // console.log(resultData);
    // console.log(`length ${resultData.length}`);
    // console.log(`aaaa ${resultData.data}`);
    // console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addType = async (req, res, next) => {
  // console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_addType(data);
    // console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    // console.log(resultData);
    // console.log(`length ${resultData.length}`);
    // console.log(`aaaa ${resultData.data}`);
    // console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const collectionSave = async (req, res, next) => {
  // console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_CollectionSave(data);
    // console.log(data);
    // console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    // console.log(resultData);
    // console.log(`length ${resultData.length}`);
    // console.log(`aaaa ${resultData.data}`);
    // console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const removeOwner = async (req, res, next) => {
  // console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_removeOwner(data);
    // console.log(data);
    // console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    // console.log(resultData);
    // console.log(`length ${resultData.length}`);
    // console.log(`aaaa ${resultData.data}`);
    // console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const removePermissionAccess = async (req, res, next) => {
  // console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_removePermissionAccess(data);
    // console.log(data);
    // console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    // console.log(resultData);
    // console.log(`length ${resultData.length}`);
    // console.log(`aaaa ${resultData.data}`);
    // console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const removeType = async (req, res, next) => {
  // console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_removeType(data);
    // console.log(data);
    // console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    // console.log(resultData);
    // console.log(`length ${resultData.length}`);
    // console.log(`aaaa ${resultData.data}`);
    // console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const RopaSave = async (req, res, next) => {
  // console.log(req.body);
  try {
    const data = req.body;
    // console.log(data);
    const created = await TEST_PDPA.Ropa_Save(data);
    // console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    // console.log(resultData);
    // console.log(`length ${resultData.length}`);
    // console.log(`aaaa ${resultData.data}`);
    // console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const Ropa_Close_Save = async (req, res, next) => {
  // console.log(req.body);
  try {
    const data = req.body;
    // console.log(data);
    const created = await TEST_PDPA.Ropa_Close_Save(data);
    // console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    // console.log(resultData);
    // console.log(`length ${resultData.length}`);
    // console.log(`aaaa ${resultData.data}`);
    // console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const TypeSave = async (req, res, next) => {
  // console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_TypeSave(data);
    // console.log(data);
    // console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    // console.log(resultData);
    // console.log(`length ${resultData.length}`);
    // console.log(`aaaa ${resultData.data}`);
    // console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const UserSave = async (req, res, next) => {
  // console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_UserSave(data);
    // console.log(data);
    // console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    // console.log(resultData);
    // console.log(`length ${resultData.length}`);
    // console.log(`aaaa ${resultData.data}`);
    // console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const Ropa_List = async (req, res, next) => {
  const ropa_list = await TEST_PDPA.Ropa_List();
  try {
    res.status(200).send(ropa_list);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const Ropa_List_By_ID = async (req, res, next) => {
  try {
    const data = req.body;
    // console.log(data);
    const ropa_List_By_ID = await TEST_PDPA.Ropa_List_By_ID(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const resultData = JSON.stringify({ data: ropa_List_By_ID });
    // console.log(resultData);
    res.status(200).send(resultData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const Ropa_List_User = async (req, res, next) => {
  try {
    const data = req.body;
    const ropa_List_User = await TEST_PDPA.Ropa_List_User(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const resultData = JSON.stringify({ data: ropa_List_User });
    res.status(200).send(resultData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const Ropa_List_Dep = async (req, res, next) => {
  const ropa_list = await TEST_PDPA.Ropa_List_Dep();
  try {
    res.status(200).send(ropa_list);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const Ropa_List_Collection = async (req, res, next) => {
  try {
    const data = req.body;
    const ropa_List_Collection = await TEST_PDPA.Ropa_List_Collection(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const resultData = JSON.stringify({ data: ropa_List_Collection });
    res.status(200).send(resultData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const Ropa_SetActive_User = async (req, res, next) => {
  try {
    const data = req.body;
    const ropa_SetActive_User = await TEST_PDPA.Ropa_SetActive_User(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const resultData = JSON.stringify({ data: ropa_SetActive_User });
    res.status(200).send(resultData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addCollection,
  addOwner,
  addPermissionAccess,
  addType,
  collectionSave,
  removeOwner,
  removePermissionAccess,
  removeType,
  RopaSave,
  Ropa_Close_Save,
  TypeSave,
  UserSave,
  Ropa_List,
  Ropa_List_User,
  Ropa_List_By_ID,
  Ropa_List_Dep,
  Ropa_List_Collection,
  Ropa_SetActive_User
};
