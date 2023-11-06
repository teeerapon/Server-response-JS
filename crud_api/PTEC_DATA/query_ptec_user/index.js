'use strict';

const getsUser = async () => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const list = await pool
      .request()
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.[Fix_Assets_Control_Fetching_Users]`);
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
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.[Fix_Assets_Control_Fetching_Users_ByUserCode] @UserCode`);
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
                    ,U.[Name]
                    ,BM.[manager]
      FROM ${config.PTEC.objcn_usersright.sql.database}.dbo.[Users] U 
      LEFT JOIN ${config.PTEC.objcn_usersright.sql.database}.dbo.[Department] D On D.DepID=U.DepID
      LEFT JOIN ${config.PTEC.objcn_usersright.sql.database}.dbo.[Branch_Manager] BM On BM.BranchID=U.BranchID
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

const select_Permission_Menu_NAC = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const auto_DeapartMent = await pool.request()
      .input('Permission_TypeID', sql.Int, res.Permission_TypeID)
      .input('userID', sql.Int, res.userID)
      .input('UserCode', sql.VarChar, res.UserCode)
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.Select_Permission_Menu_NAC @Permission_TypeID,@userID,@UserCode`);
    //sql.close()
    return auto_DeapartMent.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const Permission_Menu_NAC = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const auto_DeapartMent = await pool.request()
      .input('UserCode', sql.VarChar, res.UserCode)
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.Fix_Assets_Control_Permission_Menu`);
    //sql.close()
    return auto_DeapartMent.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const Fix_Assets_Control_UPDATE_Permission = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const auto_DeapartMent = await pool.request()
      .input('admin', sql.VarChar, res.admin)
      .input('UserCode', sql.VarChar, res.UserCode)
      .input('menuid', sql.Int, res.menuid)
      .input('id', sql.Int, res.id)
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.Fix_Assets_Control_UPDATE_Permission @admin ,@UserCode ,@menuid ,@id`);
    //sql.close()
    return auto_DeapartMent.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const Department_List = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const auto_DeapartMent = await pool.request()
      .input('branchid', sql.Int, res.branchid)
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.[Department_List] @branchid`);
    //sql.close()
    return auto_DeapartMent.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const Branch_ListAll = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const auto_DeapartMent = await pool.request()
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.[Branch_ListAll]`);
    //sql.close()
    return auto_DeapartMent.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const useright_getWelfare = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const auto_DeapartMent = await pool.request()
      .input('welfaretypeid', sql.Int, res.welfaretypeid ?? null)
      .input('sbc_hotelProvince', sql.NVarChar, res.sbc_hotelProvince ?? null)
      .input('usercode', sql.NVarChar, res.usercode ?? null)
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.[useright_getWelfare] @welfaretypeid, @sbc_hotelProvince, @usercode`);
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
  select_Permission_Menu_NAC,
  Permission_Menu_NAC,
  Fix_Assets_Control_UPDATE_Permission,
  Department_List,
  Branch_ListAll,
  useright_getWelfare
}