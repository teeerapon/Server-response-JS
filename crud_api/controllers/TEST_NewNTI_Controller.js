'use strict';

const e = require('express');
const TEST_NewNTI = require('../PTEC_DATA/query_NewNTI');

const NewNTI_Station_Create = async (req, res, next) => {
    try {
      const data = req.body;
      const created = await TEST_NewNTI.NewNTI_Station_InPut(data);
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      const resultData = JSON.stringify({ data: created });
      res.status(200).send(created);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

const Districts_List = async (req, res, next) => {
  const districts_List = await TEST_NewNTI.Districts_List();
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  try {
    res.status(200).send(districts_List);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const Amphures_List = async (req, res, next) => {
  const amphures_List = await TEST_NewNTI.Amphures_List();
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  try {
    res.status(200).send(amphures_List);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const Provinces_List = async (req, res, next) => {
  const provinces_List = await TEST_NewNTI.Provinces_List();
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  try {
    res.status(200).send(provinces_List);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  NewNTI_Station_Create,
  Districts_List,
  Amphures_List,
  Provinces_List
};