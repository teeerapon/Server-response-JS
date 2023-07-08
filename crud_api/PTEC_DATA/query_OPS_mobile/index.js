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

const STrack_responseFlex_AfterInsert = async (req, res) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetslist = await pool.request()
      .input('jobcode', sql.VarChar(20), req.jobcode ?? null)
      .input('dtlid', sql.VarChar(10), req.dtlid ?? null)
      .input('usercode', sql.VarChar(10), req.usercode ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[STrack_Send_AcceptJobs] @jobcode, @dtlid, @usercode`);
    //sql.close()
    return assetslist.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const STrack_SuccessJob = async (req, res) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetslist = await pool.request()
      .input('jobcode', sql.VarChar(20), req.jobcode ?? null)
      .input('dtlid', sql.VarChar(10), req.dtlid ?? null)
      .input('usercode', sql.VarChar(10), req.usercode ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[STrack_SuccessJob] @jobcode, @dtlid, @usercode`);
    //sql.close()
    return assetslist.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const STrack_End_Comments = async (req, res) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetslist = await pool.request()
      .input('stk_code', sql.NVarChar, req.stk_code ?? null)
      .input('userID', sql.NVarChar, req.userID ?? null)
      .input('End_Commetns', sql.NVarChar, req.End_Commetns ?? null)
      .input('BeginDate', sql.NVarChar, req.BeginDate ?? null)
      .input('EndDate', sql.NVarChar, req.EndDate ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[STrack_End_Comments] @stk_code, @End_Commetns, @BeginDate, @EndDate,@userID`);
    //sql.close()
    return assetslist.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_Running_NO = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .query(`
          declare @nac_code varchar(100)
          declare @date_time datetime = getdate()
          exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[RunningNo] 'ATT', @date_time, @nac_code output

          select @nac_code as ATT
      `);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const NonPO_Attatch_Save = async (req, res) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetslist = await pool.request()
      .input('nonpocode', sql.NVarChar, req.st_code ?? null)
      .input('url', sql.NVarChar, req.url ?? null)
      .input('user', sql.NVarChar, req.user ?? null)
      .input('description', sql.NVarChar, req.description ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[NonPO_Attatch_Save] @nonpocode ,@url ,@description ,@user`);
    //sql.close()
    return assetslist.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const STK_unCompletedBy_User = async (req, res) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetslist = await pool.request()
      .input('jobcode', sql.NVarChar, req.jobcode ?? null)
      .input('dtlid', sql.NVarChar, req.dtlid ?? null)
      .input('message', sql.NVarChar, req.message ?? null)
      .input('user', sql.NVarChar, req.user ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[STrack_unCompletedBy_User] @jobcode ,@dtlid ,@message ,@user`);
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
  STrack_responseFlex_AfterInsert,
  STrack_End_Comments,
  FA_Control_Running_NO,
  NonPO_Attatch_Save,
  STrack_SuccessJob,
  STK_unCompletedBy_User
}