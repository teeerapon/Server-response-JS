'use strict';

const SmartBill_CreateForms = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('userid', sql.Int, res.userid)
      .input('sb_name', sql.NVarChar, res.sb_name)
      .input('sb_fristName', sql.NVarChar, res.sb_fristName)
      .input('sb_lastName', sql.NVarChar, res.sb_lastName)
      .input('clean_status', sql.Int, res.clean_status)
      .input('group_status', sql.Int, res.group_status)
      .input('remarks', sql.NVarChar, res.remarks)
      .input('car_infocode', sql.NVarChar, res.car_infocode)
      .input('car_infostatus_companny', sql.Bit, res.car_infostatus_companny)
      .input('car_categaryid', sql.Int, res.car_categaryid)
      .input('car_typeid', sql.Int, res.car_typeid)
      .input('car_band', sql.NVarChar, res.car_band)
      .input('car_tier', sql.NVarChar, res.car_tier)
      .input('car_color', sql.NVarChar, res.car_color)
      .input('car_remarks', sql.NVarChar, res.car_remarks)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_CreateForms] 
            @userid,
            @sb_name,
            @sb_fristName,
            @sb_lastName,
            @clean_status,
            @group_status,
            @remarks,
            @car_infocode,
            @car_infostatus_companny,
            @car_categaryid,
            @car_typeid,
            @car_band,
            @car_tier,
            @car_color,
            @car_remarks
            `);
    //sql.close()
    return resdata.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const SmartBill_CreateOperation = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sb_code', sql.NVarChar, res.sb_code)
      .input('sb_operationid_startdate', sql.DateTime, res.data.sb_operationid_startdate)
      .input('sb_operationid_startmile', sql.Float, parseFloat(res.data.sb_operationid_startmile))
      .input('sb_operationid_startoil', sql.Float, parseFloat(res.data.sb_operationid_startoil))
      .input('sb_operationid_enddate', sql.DateTime, res.data.sb_operationid_enddate)
      .input('sb_operationid_endoil', sql.Float, parseFloat(res.data.sb_operationid_endoil))
      .input('sb_operationid_endmile', sql.Float, parseFloat(res.data.sb_operationid_endmile))
      .input('sb_paystatus', sql.Int, parseInt(res.data.sb_paystatus))
      .input('sb_operationid_location', sql.NVarChar, res.data.sb_operationid_location)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_CreateOperation] 
            @sb_code,
            @sb_operationid_startdate,
            @sb_operationid_startmile,
            @sb_operationid_startoil,
            @sb_operationid_enddate,
            @sb_operationid_endoil,
            @sb_operationid_endmile,
            @sb_paystatus,
            @sb_operationid_location
            `);
    //sql.close()
    return resdata.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const SmartBill_CreateAssociate = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sb_code', sql.NVarChar, res.sb_code)
      .input('allowance_usercode', sql.VarChar, res.data.allowance_usercode)
      .input('sb_associate_startdate', sql.DateTime, res.data.sb_associate_startdate)
      .input('sb_associate_enddate', sql.DateTime, res.data.sb_associate_enddate)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_CreateAssociate] 
            @sb_code,
            @allowance_usercode,
            @sb_associate_startdate,
            @sb_associate_enddate
            `);
    //sql.close()
    return resdata.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const SmartBill_CarInfoSearch = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('car_infocode', sql.NVarChar, res.car_infocode ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_CarInfoSearch] 
            @car_infocode
            `);
    //sql.close()
    return resdata.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const SmartBill_SelectHeaders = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_SelectHeaders]`);
    //sql.close()
    return resdata.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const SmartBill_SelectAllForms = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sb_code', sql.NVarChar, res.sb_code)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_SelectAllForms] @sb_code`);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_ESGQuery = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('startDate', sql.DateTime, res.startDate)
      .input('endDate', sql.DateTime, res.endDate)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_ESGQuery] @startDate, @endDate`);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}


module.exports = {
  SmartBill_CreateForms,
  SmartBill_CreateOperation,
  SmartBill_CreateAssociate,
  SmartBill_CarInfoSearch,
  SmartBill_SelectHeaders,
  SmartBill_SelectAllForms,
  SmartBill_ESGQuery,
}