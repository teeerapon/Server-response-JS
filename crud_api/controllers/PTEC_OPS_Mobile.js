'use strict';

const { DateTime } = require('mssql');
const query_OPS_mobile = require('../PTEC_DATA/query_OPS_mobile');

const OPS_Mobile_List_Vender = async (req, res, next) => {
    try {
      const assetCode = req.body;
      const list_Vender = await query_OPS_mobile.OPS_Mobile_List_Vender(assetCode)
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.status(200).send(list_Vender);
    } catch (error) {
      res.status(201).send(error.message);
    }
  }

  module.exports = {
    OPS_Mobile_List_Vender
  }

