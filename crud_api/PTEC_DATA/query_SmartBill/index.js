'use strict';

const SmartBill_CreateForms = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sb_code', sql.NVarChar, res.sb_code ?? '')
      .input('usercode', sql.NVarChar, res.usercode)
      .input('sb_name', sql.NVarChar, res.sb_name)
      .input('sb_fristName', sql.NVarChar, res.sb_fristName)
      .input('sb_lastName', sql.NVarChar, res.sb_lastName)
      .input('clean_status', sql.Int, res.clean_status)
      .input('group_status', sql.Int, res.group_status)
      .input('reamarks', sql.NVarChar, res.reamarks)
      .input('car_infocode', sql.NVarChar, res.car_infocode)
      .input('car_infostatus_companny', sql.Bit, (res.car_infostatus_companny === '' || !res.car_infostatus_companny) ? 0 : res.car_infostatus_companny)
      .input('car_categaryid', sql.Int, res.car_categaryid)
      .input('car_typeid', sql.Int, res.car_typeid)
      .input('car_band', sql.NVarChar, res.car_band)
      .input('car_tier', sql.NVarChar, res.car_tier)
      .input('car_color', sql.NVarChar, res.car_color)
      .input('car_remarks', sql.NVarChar, res.car_remarks)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_CreateForms] 
            @sb_code,
            @usercode,
            @sb_name,
            @sb_fristName,
            @sb_lastName,
            @clean_status,
            @group_status,
            @reamarks,
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
      .input('sb_operationid_startdate', sql.NVarChar, res.data.sb_operationid_startdate)
      .input('sb_operationid_startmile', sql.Float, parseFloat(res.data.sb_operationid_startmile))
      .input('sb_operationid_startoil', sql.Float, parseFloat(res.data.sb_operationid_startoil))
      .input('sb_operationid_enddate', sql.NVarChar, res.data.sb_operationid_enddate)
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
      .input('sb_associate_startdate', sql.NVarChar, res.data.sb_associate_startdate)
      .input('sb_associate_enddate', sql.NVarChar, res.data.sb_associate_enddate)
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
      .input('startDate', sql.NVarChar, res.startDate)
      .input('endDate', sql.NVarChar, res.endDate)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_ESGQuery] @startDate, @endDate`);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_Withdraw_Save = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('ownercode', sql.NVarChar, res.ownercode)
      .input('car_infocode', sql.NVarChar, res.car_infocode === '' ? null : res.car_infocode)
      .input('typePay', sql.NVarChar, res.typePay)
      .input('condition', sql.Int, res.condition)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_Withdraw_Save] @ownercode, @car_infocode, @typePay, @condition`);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_Withdraw_SelectAllForms = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sbw_code', sql.VarChar, res.sbw_code)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_Withdraw_SelectAllForms] @sbw_code`);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_CreateCost = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sbwdtl_id', sql.Int, parseInt(res.sbwdtl_id))
      .input('cost_id', sql.Int, parseInt(res.cost_id === '' ? 0 : res.cost_id))
      .input('category_id', sql.Int, parseInt(res.category_id))
      .input('usercode', sql.VarChar, res.usercode)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_CreateCost] @sbwdtl_id, @cost_id, @category_id, @usercode`);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_CreateCostAllowance = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sbwdtl_id', sql.Int, parseInt(res.sbwdtl_id))
      .input('cost_id', sql.Int, parseInt(res.cost_id))
      .input('category_id', sql.Int, parseInt(res.category_id))
      .input('usercode', sql.VarChar, res.usercode)
      .input('amount', sql.Float, parseFloat(res.amount))
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_CreateCostAllowance] @sbwdtl_id, @cost_id, @category_id, @usercode, @amount`);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_WithdrawDtl_SelectCategory = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sbwdtl_id', sql.Int, parseInt(res.sbwdtl_id))
      .input('category_id', sql.Int, parseInt(res.category_id))
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_WithdrawDtl_SelectCategory] @sbwdtl_id, @category_id`);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_WithdrawDtl_SaveChangesCategory = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sbwdtl_id', sql.Int, parseInt(res.sbwdtl_id))
      .input('cost_id', sql.Int, res.cost_id === '' ? null : res.cost_id)
      .input('id', sql.Int, res.id)
      .input('category_id', sql.Int, parseInt(res.category_id))
      .input('count', sql.Int, res.count)
      .input('startdate', sql.NVarChar, res.startdate)
      .input('enddate', sql.NVarChar, res.enddate)
      .input('sbc_hotelProvince', sql.NVarChar, res.sbc_hotelProvince)
      .input('sbc_hotelname', sql.NVarChar, res.sbc_hotelname)
      .input('usercode', sql.NVarChar, res.usercode ?? "SYSTEM")
      .input('foodStatus', sql.Int, parseInt(res.foodStatus))
      .input('amount', sql.Float, parseFloat(res.amount))
      .input('category_name', sql.NVarChar, res.category_name ?? null)
      .query(`
      exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_WithdrawDtl_SaveChangesCategory] 
            @sbwdtl_id,
            @cost_id,
            @id,
            @category_id,
            @count,
            @startdate,
            @enddate,
            @sbc_hotelProvince,
            @sbc_hotelname,
            @usercode,
            @foodStatus,
            @amount,
            @category_name
      `);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_WithdrawDtl_DeleteCategory = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sbwdtl_id', sql.Int, parseInt(res.sbwdtl_id))
      .input('cost_id', sql.Int, res.cost_id === '' ? null : res.cost_id)
      .input('category_id', sql.Int, res.category_id)
      .input('id', sql.Int, parseInt(res.id))
      .input('usercode', sql.NVarChar, res.usercode)
      .query(`
      exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_WithdrawDtl_DeleteCategory] 
            @sbwdtl_id,
            @cost_id,
            @category_id,
            @id,
            @usercode
      `);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_Withdraw_Delete = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sbw_code', sql.VarChar, res.sbw_code)
      .query(`
      exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_Withdraw_Delete] 
            @sbw_code
      `);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_WithdrawDtl_SaveChangesHotelGroup = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sbc_hotelid', sql.Int, res.sbc_hotelid)
      .input('usercode', sql.VarChar, res.usercode)
      .input('amount', sql.Float, res.amount)
      .query(`
      exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_WithdrawDtl_SaveChangesHotelGroup] 
            @sbc_hotelid,
            @usercode,
            @amount
      `);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_WithdrawDtl_SelectHotelGroup = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sbc_hotelid', sql.Int, res.sbc_hotelid)
      .query(`
      exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_WithdrawDtl_SelectHotelGroup] 
            @sbc_hotelid
      `);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_WithdrawDtl_DeleteHotelGroup = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sbc_hotelgroupid', sql.Int, res.sbc_hotelgroupid)
      .query(`
      exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_WithdrawDtl_DeleteHotelGroup] 
            @sbc_hotelgroupid
      `);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_Withdraw_Addrow = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('car_infocode', sql.NVarChar, res.car_infocode)
      .query(`
      exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_Withdraw_Addrow] 
            @car_infocode
      `);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_Withdraw_AddrowDtl = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sbw_code', sql.NVarChar, res.sbw_code)
      .input('sb_operationid', sql.Int, res.sb_operationid ?? null)
      .input('ownercode', sql.NVarChar, res.ownercode)
      .input('car_infocode', sql.NVarChar, res.car_infocode)
      .input('remark', sql.NVarChar, res.remark)
      .input('sbwdtl_operationid_startdate', sql.NVarChar, res.sbwdtl_operationid_startdate)
      .input('sbwdtl_operationid_enddate', sql.NVarChar, res.sbwdtl_operationid_enddate)
      .input('sbwdtl_operationid_endmile', sql.Float, res.sbwdtl_operationid_endmile)
      .input('sbwdtl_operationid_startmile', sql.Float, res.sbwdtl_operationid_startmile)
      .query(`
      exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_Withdraw_AddrowDtl] 
      @sbw_code,
      @sb_operationid,
      @ownercode,
      @car_infocode,
      @remark,
      @sbwdtl_operationid_startdate,
      @sbwdtl_operationid_enddate,
      @sbwdtl_operationid_endmile,
      @sbwdtl_operationid_startmile
      `);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_WithdrawDtl_Delete = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sbwdtl_id', sql.Int, res.sbwdtl_id)
      .query(`
      exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_WithdrawDtl_Delete] 
      @sbwdtl_id
      `);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_Withdraw_updateSBW = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sbw_code', sql.NVarChar, res.sbw_code)
      .input('usercode', sql.NVarChar, res.usercode ?? null)
      .input('pure_card', sql.Money, res.pure_card ?? null)
      .input('condition', sql.Int, parseInt(res.condition))
      .input('car_infocode', sql.NVarChar, res.car_infocode)
      .input('lock_status', sql.Int, res.lock_status ?? 0)
      .input('typePay', sql.NVarChar, res.typePay)
      .query(`
      exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_Withdraw_updateSBW] 
        @sbw_code,
        @usercode,
        @pure_card,
        @condition,
        @car_infocode,
        @lock_status,
        @typePay
      `);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_Withdraw_SelectCostOther = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .query(`
      exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_Withdraw_SelectCostOther] 
      `);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const NonPO_Delete_Attach_By_attachid = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('attachid', sql.Int, res.attachid)
      .input('userid', sql.Int, 145)
      .query(`
      exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[NonPO_Delete_Attach_By_attachid]
      @attachid,
      @userid
      `);
    if (resdata !== null) {
      return resdata.recordsets;
    }
  } catch (error) {
    return error.message;
  }
}

const SmartBill_AcceptHeader = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const resdata = await pool.request()
      .input('sb_code', sql.NVarChar, res.sb_code)
      .input('usercode', sql.NVarChar, res.usercode)
      .query(`
      exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[SmartBill_AcceptHeader] 
        @sb_code,
        @usercode
      `);
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
  SmartBill_Withdraw_Save,
  SmartBill_Withdraw_SelectAllForms,
  SmartBill_CreateCost,
  SmartBill_CreateCostAllowance,
  SmartBill_WithdrawDtl_SelectCategory,
  SmartBill_WithdrawDtl_SaveChangesCategory,
  SmartBill_WithdrawDtl_DeleteCategory,
  SmartBill_Withdraw_Delete,
  SmartBill_WithdrawDtl_SaveChangesHotelGroup,
  SmartBill_WithdrawDtl_SelectHotelGroup,
  SmartBill_WithdrawDtl_DeleteHotelGroup,
  SmartBill_Withdraw_Addrow,
  SmartBill_Withdraw_AddrowDtl,
  SmartBill_WithdrawDtl_Delete,
  SmartBill_Withdraw_updateSBW,
  SmartBill_Withdraw_SelectCostOther,
  NonPO_Delete_Attach_By_attachid,
  SmartBill_AcceptHeader
}