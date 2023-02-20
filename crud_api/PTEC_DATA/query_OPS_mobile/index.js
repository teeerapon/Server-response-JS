'use strict';

const OPS_Mobile_List_Vender = async (branchIDparam) => {
    const sql = require("mssql");
    const config = require('../../config');
    try {
      let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
      const assetslist = await pool.request()
        .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[OPS_Mobile_List_Vender]`);
      //sql.close()
      return assetslist.recordset;
    } catch (error) {
      //sql.close()
      return error.message;
    }
  }

  module.exports = {
    OPS_Mobile_List_Vender
  }