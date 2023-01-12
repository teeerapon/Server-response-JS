'use strict';

const getsUser = async () => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const list = await pool
      .request()
      .query(`SELECT [UserID],[UserCode] ,[Name] ,[BranchID] ,[DepID] ,[SecID] ,[AreaID] FROM ${config.PTEC.objcn_usersright.sql.database}.dbo.[Users]`);
    //sql.close()
    return list.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const getById = async (UserCode) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const oneUser = await pool.request()
      .input('UserCode', sql.VarChar(10), UserCode)
      .query(`SELECT [UserID] ,[UserCode] ,[Name] ,[BranchID] ,[DepID] ,[SecID] ,[AreaID] ,[PositionID] ,[Password] ,[Email] ,[Tel] ,[EmpUpper] ,[Actived] ,[ChangePassword] ,[Admin] ,[Vendor_Code] FROM ${config.PTEC.objcn_usersright.sql.database}.dbo.[Users] WHERE [UserCode]=@UserCode`);
    //sql.close()
    return oneUser.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const getByEmailAndCode = async (loginuser) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const login = await pool.request()
      .input('UserCode', sql.VarChar(20), loginuser.UserCode)
      .input('Password', sql.VarChar(20), loginuser.Password)
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.User_Login @UserCode,@Password `);
    //sql.close()
    return login.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

// Control Assets
const AutoDeapartMent = async (autoDeapartMent) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const auto_DeapartMent = await pool.request()
      .input('UserCode', sql.VarChar(10), autoDeapartMent.UserCode)
      .query(`SELECT U.[DepID]
                    ,D.[DepCode]
                    ,U.[BranchID]
      FROM ${config.PTEC.objcn_usersright.sql.database}.dbo.[Users] U 
      LEFT JOIN ${config.PTEC.objcn_usersright.sql.database}.dbo.[Department] D On D.DepID=U.DepID
      WHERE U.[UserCode]=@UserCode
      `);
    //sql.close()
    return auto_DeapartMent.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const ChackUserWeb = async (UserWeb) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const auto_DeapartMent = await pool.request()
      .input('usercode', sql.VarChar(10), UserWeb.usercode)
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.Fix_Assets_Control_UserWeb @usercode`);
    //sql.close()
    return auto_DeapartMent.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const get_branch_period = async (branch_period) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const auto_DeapartMent = await pool.request()
      .input('userCode', sql.VarChar(10), branch_period.userCode)
      .input('BranchID', sql.Int, branch_period.BranchID)
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.FA_Control_Fetch_Branch_Period @userCode,@BranchID`);
    //sql.close()
    return auto_DeapartMent.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const select_Permission_Menu_NAC = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const auto_DeapartMent = await pool.request()
      .input('Permission_TypeID', sql.Int, res.Permission_TypeID)
      .input('userID', sql.Int, res.userID)
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.Select_Permission_Menu_NAC @Permission_TypeID,@userID`);
    //sql.close()
    return auto_DeapartMent.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

module.exports = {
  getsUser,
  getById,
  getByEmailAndCode,
  AutoDeapartMent,
  ChackUserWeb,
  get_branch_period,
  select_Permission_Menu_NAC
}