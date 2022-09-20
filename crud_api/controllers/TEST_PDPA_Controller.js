"use strict";

const TEST_PDPA = require("../data/TEST_PDPA");
const TokenManager = require("./token_manager");

const addCollection = async (req, res, next) => {
  //console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_addCollection(data);
    console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    console.log(resultData);
    console.log(`length ${resultData.length}`);
    console.log(`aaaa ${resultData.data}`);
    console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addOwner = async (req, res, next) => {
  //console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_addOwner(data);
    console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    console.log(resultData);
    console.log(`length ${resultData.length}`);
    console.log(`aaaa ${resultData.data}`);
    console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addPermissionAccess = async (req, res, next) => {
  //console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_addPermissionAccess(data);
    console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    console.log(resultData);
    console.log(`length ${resultData.length}`);
    console.log(`aaaa ${resultData.data}`);
    console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addType = async (req, res, next) => {
  //console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_addType(data);
    console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    console.log(resultData);
    console.log(`length ${resultData.length}`);
    console.log(`aaaa ${resultData.data}`);
    console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const collectionSave = async (req, res, next) => {
  //console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_CollectionSave(data);
    console.log(data);
    console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    console.log(resultData);
    console.log(`length ${resultData.length}`);
    console.log(`aaaa ${resultData.data}`);
    console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const removeOwner = async (req, res, next) => {
  //console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_removeOwner(data);
    console.log(data);
    console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    console.log(resultData);
    console.log(`length ${resultData.length}`);
    console.log(`aaaa ${resultData.data}`);
    console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const removePermissionAccess = async (req, res, next) => {
  //console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_removePermissionAccess(data);
    console.log(data);
    console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    console.log(resultData);
    console.log(`length ${resultData.length}`);
    console.log(`aaaa ${resultData.data}`);
    console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const removeType = async (req, res, next) => {
  //console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_removeType(data);
    console.log(data);
    console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    console.log(resultData);
    console.log(`length ${resultData.length}`);
    console.log(`aaaa ${resultData.data}`);
    console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const RopaSave = async (req, res, next) => {
  //console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_Save(data);
    console.log(data);
    console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    console.log(resultData);
    console.log(`length ${resultData.length}`);
    console.log(`aaaa ${resultData.data}`);
    console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const TypeSave = async (req, res, next) => {
  //console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_TypeSave(data);
    console.log(data);
    console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    console.log(resultData);
    console.log(`length ${resultData.length}`);
    console.log(`aaaa ${resultData.data}`);
    console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const UserSave = async (req, res, next) => {
  //console.log(req.body);
  try {
    const data = req.body;
    const created = await TEST_PDPA.Ropa_UserSave(data);
    console.log(data);
    console.log(created);
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const resultData = JSON.stringify({ data: created });
    console.log(resultData);
    console.log(`length ${resultData.length}`);
    console.log(`aaaa ${resultData.data}`);
    console.log(`ssss ${resultData.ropaownerid}`);
    res.status(200).send(created);
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
  TypeSave,
  UserSave,
};
