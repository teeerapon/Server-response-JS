'use strict';

const e = require('express');
const TEST_NewNTI = require('../data/TEST_NewNTI');

const NewNTI_Station_Create = async (req, res, next) => {
    try {
      const data = req.body;
      const created = await TEST_NewNTI.NewNTI_Station_InPut(data);
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      const resultData = JSON.stringify({ data: created });
      console.log(resultData);
      res.status(200).send(created);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  module.exports = {
    NewNTI_Station_Create
  };