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

const STrack_Registation = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetslist = await pool.request()
      .input('userCode', sql.NVarChar(100), req.userid)
      .input('email', sql.NVarChar(100), req.email)
      .input('venderCode', sql.VarChar(100), req.venderCode)
      .input('name', sql.NVarChar(100), req.name)
      .input('lastname', sql.NVarChar(100), req.lastname)
      .input('phoneNumber', sql.NVarChar(100), req.phoneNumber)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[STrack_Registation] @userCode, @email, @venderCode, @name, @lastName, @phoneNumber`);
    //sql.close()
    return assetslist.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const STrack_CheckVenderID = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetslist = await pool.request()
      .input('userid', sql.NVarChar(100), req)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[STrack_CheckVenderID] @userid`);
    //sql.close()
    return assetslist.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const STrack_callMessages = async (req, res) => {
  console.log(req);
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetslist = await pool.request()
      .input('message', sql.NVarChar, req.message ?? null)
      // .input('title', sql.NVarChar, req.title ?? null)
      // .input('stk_code', sql.NVarChar, req.stk_code ?? null)
      // .input('type', sql.NVarChar, req.type ?? null)
      .input('userid_line', sql.NVarChar, req.userid_line ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[STrack_callMessages] @message, @userid_line`);
    //sql.close()
    return assetslist.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

module.exports = {
  OPS_Mobile_List_Vender,
  STrack_Registation,
  STrack_CheckVenderID,
  STrack_callMessages,
}