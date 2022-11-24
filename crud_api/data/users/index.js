'use strict';

const utils = require('../untils');



const getsUser = async () => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const sqlOueries = await utils.loadSqlOueries('users');
    const list = await pool.request().query(sqlOueries.userslist);
    
    return list.recordset;
  } catch (error) {
    
    return error.message;
  }
}

const getById = async (UserCode) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const sqlOueries = await utils.loadSqlOueries('users');
    const oneUser = await pool.request()
      .input('UserCode', sql.VarChar(10), UserCode)
      .query(sqlOueries.usersbylD);
    
    return oneUser.recordset;
  } catch (error) {
    
    return error.message;
  }
}

const getByEmailAndCode = async (loginuser) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const sqlOueries = await utils.loadSqlOueries('users');
    const login = await pool.request()
      .input('UserCode', sql.VarChar(20), loginuser.UserCode)
      .input('Password', sql.VarChar(20), loginuser.Password)
      .query(sqlOueries.User_Login);
    
    return login.recordset;
  } catch (error) {
    
    return error.message;
  }
}


// Control Assets
const AutoDeapartMent = async (autoDeapartMent) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const sqlOueries = await utils.loadSqlOueries('users');
    const auto_DeapartMent = await pool.request()
      .input('UserCode', sql.VarChar(10), autoDeapartMent.UserCode)
      .query(sqlOueries.FA_Control_select_value);
    
    return auto_DeapartMent.recordset;
  } catch (error) {
    
    return error.message;
  }
}

const ChackUserWeb = async (UserWeb) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const sqlOueries = await utils.loadSqlOueries('users');
    const auto_DeapartMent = await pool.request()
      .input('usercode', sql.VarChar(10), UserWeb.usercode)
      .query(sqlOueries.chackUserWeb);
    
    return auto_DeapartMent.recordset;
  } catch (error) {
    
    return error.message;
  }
}

const get_branch_period = async (branch_period) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const sqlOueries = await utils.loadSqlOueries('users');
    const auto_DeapartMent = await pool.request()
      .input('userCode', sql.VarChar(10), branch_period.userCode)
      .input('BranchID', sql.Int, branch_period.BranchID)
      .query(sqlOueries.get_branch_period);
    
    return auto_DeapartMent.recordset;
  } catch (error) {
    
    return error.message;
  }
}

module.exports = {
  getsUser,
  getById,
  getByEmailAndCode,
  AutoDeapartMent,
  ChackUserWeb,
  get_branch_period
}