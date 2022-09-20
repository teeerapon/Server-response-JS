'use strict';

const utils = require('../untils');
const config = require('../../config');
const sql = require('mssql');

const getsAssets = async (branchIDparam) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const assetslist = await pool.request()
      .input('RoundID', sql.Int, branchIDparam.RoundID)
      .query(sqlOueries.assetsList);
    return assetslist.recordset;
  } catch (error) {
    return error.message;
  }
}

const getsAssets2 = async (branchIDparam) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const assetslist = await pool.request()
      .input('BranchID', sql.Int, branchIDparam.BranchID)
      .input('RoundID', sql.Int, branchIDparam.RoundID)
      .query(sqlOueries.allAssets);
    return assetslist.recordset;
  } catch (error) {
    return error.message;
  }
}

const getAssetCode = async (Code) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    // console.log(sqlOueries.getAssetByCode);
    const oneAsset = await pool.request()
      .input('Code', sql.NVarChar(30), Code)
      .query(sqlOueries.getAssetByCode);
    return oneAsset.recordset;
  } catch (error) {
    return error.message;
  }
}

const getAssetByUserBranchID = async (userBranchID) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const assetByUserID = await pool.request()
      .input('RoundID', sql.Int, userBranchID.RoundID)
      .input('BranchID', sql.Int, userBranchID.BranchID)
      .input('UserBranch', sql.Int, userBranchID.UserBranch)
      .query(sqlOueries.assetListByuserBranch);
    return assetByUserID.recordset;
  } catch (error) {
    return error.message;
  }
}

const wrongBranchID = async (userBranchID) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const assetByUserID = await pool.request()
      .input('UserBranch', sql.Int, userBranchID.UserBranch)
      .input('BranchID', sql.Int, userBranchID.BranchID)
      .input('RoundID', sql.Int, userBranchID.RoundID)
      .query(sqlOueries.showAssets_Wrong);
    return assetByUserID.recordset;
  } catch (error) {
    return error.message;
  }
}

const lostAssets = async (userBranchID) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const assetByUserID = await pool.request()
      .input('UserBranch', sql.Int, userBranchID.UserBranch)
      .input('BranchID', sql.Int, userBranchID.BranchID)
      .input('RoundID', sql.Int, userBranchID.RoundID)
      .query(sqlOueries.lost_asset);
    return assetByUserID.recordset;
  } catch (error) {
    return error.message;
  }
}

const getAssetByCode = async (codeAsset) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const assetByCode = await pool.request()
      .input('Code', sql.NVarChar(30), codeAsset.Code)
      .input('Name', sql.NVarChar(150), codeAsset.Name)
      .input('BranchID', sql.Int, codeAsset.BranchID)
      .input('RoundID', sql.Int, codeAsset.RoundID)
      .input('UserBranch', sql.Int, codeAsset.UserBranch)
      .query(sqlOueries.getAssetByCode);
    return assetByCode.recordset;
  } catch (error) {
    return error.message;
  }
}

const scan_check_result = async (codeAsset) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const assetByCode = await pool.request()
      .input('Code', sql.NVarChar(30), codeAsset.Code)
      .input('RoundID', sql.BigInt, codeAsset.RoundID)
      .query(sqlOueries.scan_check_result);
    return assetByCode.recordset;
  } catch (error) {
    return error.message;
  }
}

const getAssetByCodeForTest = async (codeAsset) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const assetByCode = await pool.request()
      .input('Code', sql.NVarChar(30), codeAsset.Code)
      .input('Name', sql.NVarChar(150), codeAsset.Name)
      .input('BranchID', sql.Int, codeAsset.BranchID)
      .input('Date', sql.DateTime, codeAsset.Date)
      .input('Status', sql.Bit, codeAsset.Status)
      .input('UserID', sql.BigInt, codeAsset.UserID)
      .input('UserBranch', sql.Int, codeAsset.UserBranch)
      .input('RoundID', sql.BigInt, codeAsset.RoundID)
      .input('Reference', sql.NVarChar(100), codeAsset.Reference)
      .query(sqlOueries.getassetForcreate);
    return assetByCode.recordset;
  } catch (error) {
    return error.message;
  }
}

const check_code_wrong_branch = async (codeAsset) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const assetByCode = await pool.request()
      .input('Code', sql.NVarChar(30), codeAsset.Code)
      .input('Name', sql.NVarChar(150), codeAsset.Name)
      .input('BranchID', sql.Int, codeAsset.BranchID)
      .input('Date', sql.DateTime, codeAsset.Date)
      .input('Status', sql.Bit, codeAsset.Status)
      .input('UserID', sql.BigInt, codeAsset.UserID)
      .input('UserBranch', sql.Int, codeAsset.UserBranch)
      .input('RoundID', sql.BigInt, codeAsset.RoundID)
      .input('Reference', sql.NVarChar(100), codeAsset.Reference)
      .query(sqlOueries.check_code_wrong_branch);
    return assetByCode.recordset;
  } catch (error) {
    return error.message;
  }
}

const createAsset = async (createAssetData) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const insertAsset = await pool.request()
      .input('Code', sql.NVarChar(30), createAssetData.Code)
      .input('Name', sql.NVarChar(150), createAssetData.Name)
      .input('BranchID', sql.Int, createAssetData.BranchID)
      .input('Date', sql.DateTime, createAssetData.Date)
      .input('Status', sql.Bit, createAssetData.Status)
      .input('UserID', sql.BigInt, createAssetData.UserID)
      .input('UserBranch', sql.Int, createAssetData.UserBranch)
      .input('RoundID', sql.BigInt, createAssetData.RoundID)
      .input('Reference', sql.NVarChar(100), createAssetData.Reference)
      .query(sqlOueries.createAsset);
    return insertAsset.recordset;
  } catch (error) {
    return error.message;
  }
}

const updateReference = async (referenceData) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const update = await pool.request()
      .input('Reference', sql.NVarChar(100), referenceData.Reference)
      .input('Code', sql.NVarChar(30), referenceData.Code)
      .input('RoundID', sql.BigInt, referenceData.RoundID)
      .input('UserID', sql.BigInt, referenceData.UserID)
      .query(sqlOueries.update_reference);
    return update.recordset;
  } catch (error) {
    return error.message;
  }
}


// Control Assets

const AssetsAll_Control = async (assetsAll_Control) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const assetsBranchID_Control = await pool.request()
      .input('BranchID', sql.Int, assetsAll_Control.BranchID)
      .query(sqlOueries.AssetsAll_Control);
    return assetsBranchID_Control.recordset;
  } catch (error) {
    return error.message;
  }
}

const SelectDTL_Control = async (DTL_Control) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const SelectDTL_Control = await pool.request()
      .input('Code', sql.NVarChar(30), DTL_Control.Code)
      .query(sqlOueries.SelectDtl_Control);
    return SelectDTL_Control.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_create_doc = async (FA_control_create_doc) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const FAcontrol_create_doc = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_create_doc.usercode)
      .input('worktype', sql.Int, FA_control_create_doc.worktype)
      .input('des_Department', sql.NVarChar(50), FA_control_create_doc.des_Department)
      .input('des_BU', sql.NVarChar(50), FA_control_create_doc.des_BU)
      .input('des_delivery', sql.NVarChar(10), FA_control_create_doc.des_delivery)
      .input('des_deliveryDate', sql.DateTime, FA_control_create_doc.des_deliveryDate)
      .input('source_Department', sql.NVarChar(50), FA_control_create_doc.source_Department)
      .input('source_BU', sql.NVarChar(50), FA_control_create_doc.source_BU)
      .input('source', sql.NVarChar(10), FA_control_create_doc.source)
      .input('sourceDate', sql.DateTime, FA_control_create_doc.sourceDate)
      .input('des_Description', sql.NVarChar(200), FA_control_create_doc.des_Description)
      .input('source_Description', sql.NVarChar(200), FA_control_create_doc.source_Description)
      .input('sumPrice', sql.Float, FA_control_create_doc.sumPrice)
      .query(sqlOueries.store_FA_control_create_doc);
    return FAcontrol_create_doc.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_creat_Detail = async (FA_control_creat_Detail) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_creat_Detail = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_creat_Detail.usercode)
      .input('nac_code', sql.NVarChar(30), FA_control_creat_Detail.nac_code)
      .input('nacdtl_row', sql.Int, FA_control_creat_Detail.nacdtl_row)
      .input('nacdtl_assetsCode', sql.NVarChar(50), FA_control_creat_Detail.nacdtl_assetsCode)
      .input('nacdtl_assetsName', sql.NVarChar, FA_control_creat_Detail.nacdtl_assetsName)
      .input('nacdtl_assetsSeria', sql.NVarChar(50), FA_control_creat_Detail.nacdtl_assetsSeria)
      .input('nacdtl_assetsDtl', sql.NVarChar, FA_control_creat_Detail.nacdtl_assetsDtl)
      .input('nacdtl_assetsCount', sql.Int, FA_control_creat_Detail.nacdtl_assetsCount)
      .input('nacdtl_assetsPrice', sql.Float, FA_control_creat_Detail.nacdtl_assetsPrice)
      .input('nacdtl_date_asset', sql.DateTime, FA_control_creat_Detail.nacdtl_date_asset)
      .query(sqlOueries.store_FA_control_creat_Detail);
    return control_creat_Detail.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_select_NAC = async (FA_control_select_NAC) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_select_NAC = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_select_NAC.usercode)
      .query(sqlOueries.store_FA_control_select_NAC);
    return control_select_NAC.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_select_NAC_approve = async (control_select_NAC_approve) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const FA_control_select_NAC_approve = await pool.request()
      .input('usercode', sql.VarChar(10), control_select_NAC_approve.usercode)
      .query(sqlOueries.store_FA_control_select_NAC_approve);
    return FA_control_select_NAC_approve.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_GuaranteeNAC = async (FA_control_GuaranteeNAC) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_GuaranteeNAC = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_GuaranteeNAC.usercode)
      .query(sqlOueries.store_FA_control_GuaranteeNAC);
    return control_GuaranteeNAC.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_select_dtl = async (FA_control_select_dtl) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_select_dtl = await pool.request()
      .input('nac_code', sql.NVarChar(20), FA_control_select_dtl.nac_code)
      .query(sqlOueries.store_FA_control_select_dtl);
    return control_select_dtl.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_select_headers = async (FA_control_select_headers) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_select_headers = await pool.request()
      .input('nac_code', sql.NVarChar(20), FA_control_select_headers.nac_code)
      .query(sqlOueries.store_FA_control_select_headers);
    return control_select_headers.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_update_DTLandHeaders = async (FA_control_update_DTLandHeaders) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const update_DTLandHeaders = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_update_DTLandHeaders.usercode)
      .input('nac_code', sql.NVarChar(20), FA_control_update_DTLandHeaders.nac_code)
      .input('nac_status', sql.Int, FA_control_update_DTLandHeaders.nac_status)
      .input('nac_type', sql.Int, FA_control_update_DTLandHeaders.nac_type)
      .input('sumPrice', sql.Float, FA_control_update_DTLandHeaders.sumPrice)
      .input('des_department', sql.NVarChar(50), FA_control_update_DTLandHeaders.des_department)
      .input('des_BU', sql.NVarChar(50), FA_control_update_DTLandHeaders.des_BU)
      .input('des_delivery', sql.NVarChar(10), FA_control_update_DTLandHeaders.des_delivery)
      .input('des_deliveryDate', sql.DateTime, FA_control_update_DTLandHeaders.des_deliveryDate)
      .input('des_description', sql.NVarChar(200), FA_control_update_DTLandHeaders.des_description)
      .input('source_department', sql.NVarChar(50), FA_control_update_DTLandHeaders.source_department)
      .input('source_BU', sql.NVarChar(50), FA_control_update_DTLandHeaders.source_BU)
      .input('source', sql.NVarChar(10), FA_control_update_DTLandHeaders.source)
      .input('sourceDate', sql.DateTime, FA_control_update_DTLandHeaders.sourceDate)
      .input('source_description', sql.NVarChar(200), FA_control_update_DTLandHeaders.source_description)
      .query(sqlOueries.store_FA_control_update_DTLandHeaders);
    return update_DTLandHeaders.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_update_DTL = async (FA_control_update_DTL) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const update_DTL = await pool.request()
      .input('dtl_id', sql.Int, FA_control_update_DTL.dtl_id)
      .input('usercode', sql.VarChar(10), FA_control_update_DTL.usercode)
      .input('nac_code', sql.NVarChar(20), FA_control_update_DTL.nac_code)
      .input('nacdtl_row', sql.Int, FA_control_update_DTL.nacdtl_row)
      .input('nacdtl_assetsCode', sql.NVarChar(50), FA_control_update_DTL.nacdtl_assetsCode)
      .input('nacdtl_assetsName', sql.NVarChar(200), FA_control_update_DTL.nacdtl_assetsName)
      .input('nacdtl_assetsSeria', sql.NVarChar(50), FA_control_update_DTL.nacdtl_assetsSeria)
      .input('nacdtl_assetsDtl', sql.NVarChar(200), FA_control_update_DTL.nacdtl_assetsDtl)
      .input('nacdtl_assetsCount', sql.Int, FA_control_update_DTL.nacdtl_assetsCount)
      .input('nacdtl_assetsPrice', sql.Float, FA_control_update_DTL.nacdtl_assetsPrice)
      .input('asset_id', sql.Int, FA_control_update_DTL.asset_id)
      .query(sqlOueries.store_FA_control_update_DTL);
    return update_DTL.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_execDocID = async (FA_control_execDocID) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_execDocID = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_execDocID.user_source)
      .input('nac_code', sql.NVarChar(20), FA_control_execDocID.nac_code)
      .query(sqlOueries.store_FA_control_execDocID);
    return control_execDocID.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_updateStatus = async (FA_control_updateStatus) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_updateStatus = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_updateStatus.usercode)
      .input('nac_code', sql.NVarChar(20), FA_control_updateStatus.nac_code)
      .input('nac_status', sql.Int, FA_control_updateStatus.nac_status)
      .input('nac_type', sql.Int, FA_control_updateStatus.nac_type)
      .input('source', sql.NVarChar(10), FA_control_updateStatus.source)
      .input('sourceDate', sql.DateTime, FA_control_updateStatus.sourceDate)
      .input('des_delivery', sql.NVarChar(10), FA_control_updateStatus.des_delivery)
      .input('des_deliveryDate', sql.DateTime, FA_control_updateStatus.des_deliveryDate)
      .input('source_approve', sql.NVarChar(10), FA_control_updateStatus.source_approve)
      .input('source_approve_date', sql.DateTime, FA_control_updateStatus.source_approve_date)
      .input('des_approve', sql.NVarChar(10), FA_control_updateStatus.des_approve)
      .input('des_approve_date', sql.DateTime, FA_control_updateStatus.des_approve_date)
      .input('verify_by', sql.NVarChar(10), FA_control_updateStatus.verify_by)
      .input('verify_date', sql.DateTime, FA_control_updateStatus.verify_date)
      .input('new_Price', sql.Float, FA_control_updateStatus.new_Price)
      .query(sqlOueries.store_FA_control_updateStatus);
    return control_updateStatus.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_seals_update = async (FA_control_updateStatus) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_updateStatus = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_updateStatus.usercode)
      .input('nac_code', sql.NVarChar(20), FA_control_updateStatus.nac_code)
      .input('nac_status', sql.Int, FA_control_updateStatus.nac_status)
      .input('nac_type', sql.Int, FA_control_updateStatus.nac_type)
      .input('source', sql.NVarChar(10), FA_control_updateStatus.source)
      .input('sourceDate', sql.DateTime, FA_control_updateStatus.sourceDate)
      .input('des_delivery', sql.NVarChar(10), FA_control_updateStatus.des_delivery)
      .input('des_deliveryDate', sql.DateTime, FA_control_updateStatus.des_deliveryDate)
      .input('source_approve', sql.NVarChar(10), FA_control_updateStatus.source_approve)
      .input('source_approve_date', sql.DateTime, FA_control_updateStatus.source_approve_date)
      .input('des_approve', sql.NVarChar(10), FA_control_updateStatus.des_approve)
      .input('des_approve_date', sql.DateTime, FA_control_updateStatus.des_approve_date)
      .input('verify_by', sql.NVarChar(10), FA_control_updateStatus.verify_by)
      .input('verify_date', sql.DateTime, FA_control_updateStatus.verify_date)
      .query(sqlOueries.store_FA_control_seals_update);
    return control_updateStatus.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_updateDTL_seals = async (FA_control_updateDTL_seals) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const update_DTL = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_updateDTL_seals.usercode)
      .input('nac_code', sql.VarChar(20), FA_control_updateDTL_seals.nac_code)
      .input('nac_status', sql.Int, FA_control_updateDTL_seals.nac_status)
      .input('nac_type', sql.Int, FA_control_updateDTL_seals.nac_type)
      .input('nacdtl_bookV', sql.Float, FA_control_updateDTL_seals.nacdtl_bookV)
      .input('nacdtl_PriceSeals', sql.Float, FA_control_updateDTL_seals.nacdtl_PriceSeals)
      .input('nacdtl_profit', sql.Float, FA_control_updateDTL_seals.nacdtl_profit)
      .input('asset_id', sql.Int, FA_control_updateDTL_seals.asset_id)
      .input('nacdtl_assetsCode', sql.VarChar(20), FA_control_updateDTL_seals.nacdtl_assetsCode)
      .query(sqlOueries.store_FA_control_updateDTL_seals);
    return update_DTL.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_drop_NAC = async (FA_control_drop_NAC) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_drop_NAC = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_drop_NAC.usercode)
      .input('nac_code', sql.NVarChar(20), FA_control_drop_NAC.nac_code)
      .query(sqlOueries.store_FA_control_drop_NAC);
    return control_drop_NAC.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_comment = async (FA_control_comment) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_drop_NAC = await pool.request()
      .input('nac_code', sql.VarChar(20), FA_control_comment.nac_code)
      .input('usercode', sql.NVarChar(20), FA_control_comment.usercode)
      .input('comment', sql.NVarChar(200), FA_control_comment.comment)
      .query(sqlOueries.stroe_FA_control_comment);
    return control_drop_NAC.recordset;
  } catch (error) {
    return error.message;
  }
}

const stroe_FA_control_Path = async (FA_control_Path) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_Path = await pool.request()
      .input('nac_code', sql.VarChar(20), FA_control_Path.nac_code)
      .input('usercode', sql.VarChar(10), FA_control_Path.usercode)
      .input('description', sql.NVarChar(200), FA_control_Path.description)
      .input('linkpath', sql.NVarChar(200), FA_control_Path.linkpath)
      .query(sqlOueries.stroe_FA_control_Path);
    return control_Path.recordset;
  } catch (error) {
    return error.message;
  }
}

const qureyNAC_comment = async (NAC_comment) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_drop_NAC = await pool.request()
      .input('nac_code', sql.VarChar(20), NAC_comment.nac_code)
      .query(sqlOueries.qureyNAC_comment);
    return control_drop_NAC.recordset;
  } catch (error) {
    return error.message;
  }
}

const qureyNAC_path = async (NAC_comment) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_drop_NAC = await pool.request()
      .input('nac_code', sql.VarChar(20), NAC_comment.nac_code)
      .query(sqlOueries.qureyNAC_path);
    return control_drop_NAC.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_CheckAssetCode_Process = async (FA_control_CheckAssetCode_Process) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_drop_NAC = await pool.request()
      .input('nacdtl_assetsCode', sql.VarChar(20), FA_control_CheckAssetCode_Process.nacdtl_assetsCode)
      .query(sqlOueries.store_FA_control_CheckAssetCode_Process);
    return control_drop_NAC.recordset;
  } catch (error) {
    return error.message;
  }
}

const stroe_FA_control_DTL_ConfirmSuccess = async (FA_control_DTL_ConfirmSuccess) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_drop_NAC = await pool.request()
      .input('nac_code', sql.VarChar(30), FA_control_DTL_ConfirmSuccess.nac_code)
      .input('usercode', sql.VarChar(10), FA_control_DTL_ConfirmSuccess.usercode)
      .input('nacdtl_assetsCode', sql.VarChar(50), FA_control_DTL_ConfirmSuccess.nacdtl_assetsCode)
      .input('asset_id', sql.Int, FA_control_DTL_ConfirmSuccess.asset_id)
      .input('statusCheck', sql.Int, FA_control_DTL_ConfirmSuccess.statusCheck)
      .query(sqlOueries.stroe_FA_control_DTL_ConfirmSuccess);
    return control_drop_NAC.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_upadate_table = async (FA_control_upadate_table) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_upadate_table = await pool.request()
      .input('nac_code', sql.VarChar(30), FA_control_upadate_table.nac_code)
      .input('usercode', sql.VarChar(10), FA_control_upadate_table.usercode)
      .input('nacdtl_assetsCode', sql.VarChar(50), FA_control_upadate_table.nacdtl_assetsCode)
      .input('asset_id', sql.Int, FA_control_upadate_table.asset_id)
      .input('nac_type', sql.Int, FA_control_upadate_table.nac_type)
      .input('nac_status', sql.Int, FA_control_upadate_table.nac_status)
      .query(sqlOueries.store_FA_control_upadate_table);
    return control_upadate_table.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_SendMail = async (FA_SendMail) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_upadate_table = await pool.request()
      .input('nac_code', sql.VarChar(30), FA_SendMail.nac_code)
      .query(sqlOueries.store_FA_SendMail);
    return control_upadate_table.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_Create_from_reported = async (FA_control_Create_from_reported) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_upadate_table = await pool.request()
      .input('nac_code', sql.VarChar(30), FA_control_Create_from_reported.nac_code)
      .input('usercode', sql.VarChar(10), FA_control_Create_from_reported.usercode)
      .input('nacdtl_assetsCode', sql.VarChar(50), FA_control_Create_from_reported.nacdtl_assetsCode)
      .input('nacdtl_row', sql.Int, FA_control_Create_from_reported.nacdtl_row)
      .query(sqlOueries.store_FA_control_Create_from_reported);
    return control_upadate_table.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_HistorysAssets = async (FA_control_HistorysAssets) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const control_upadate_table = await pool.request()
      .input('userCode', sql.VarChar(10), FA_control_HistorysAssets.userCode)
      .query(sqlOueries.store_FA_control_HistorysAssets);
    return control_upadate_table.recordset;
  } catch (error) {
    return error.message;
  }
}

const store_FA_control_fetch_assets = async (FA_control_fetch_assets) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const fetch_assets = await pool.request()
      .input('userCode', sql.VarChar(10), FA_control_fetch_assets.userCode)
      .query(sqlOueries.store_FA_control_fetch_assets);
    return fetch_assets.recordset;
  } catch (error) {
    return error.message;
  }
}

const FA_Control_Report_All_Counted_by_Description = async (Report_All_Counted_by_Description) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlOueries = await utils.loadSqlOueries('assets');
    const fetch_assets = await pool.request()
      .input('Description', sql.NVarChar(200), Report_All_Counted_by_Description.Description)
      .query(sqlOueries.FA_Control_Report_All_Counted_by_Description);
    return fetch_assets.recordset;
  } catch (error) {
    return error.message;
  }
}

module.exports = {

  //Mobile or Some Control
  createAsset,
  getsAssets,
  getAssetByCode,
  getAssetByCodeForTest,
  getAssetCode,
  getAssetByUserBranchID,
  getsAssets2,
  wrongBranchID,
  updateReference,
  lostAssets,
  check_code_wrong_branch,
  scan_check_result,

  //Control
  AssetsAll_Control,
  SelectDTL_Control,
  store_FA_control_create_doc,
  store_FA_control_creat_Detail,
  store_FA_control_select_NAC,
  store_FA_control_select_dtl,
  store_FA_control_select_headers,
  store_FA_control_update_DTLandHeaders,
  store_FA_control_update_DTL,
  store_FA_control_execDocID,
  store_FA_control_select_NAC_approve,
  store_FA_control_updateStatus,
  store_FA_control_seals_update,
  store_FA_control_updateDTL_seals,
  store_FA_control_drop_NAC,
  store_FA_control_comment,
  stroe_FA_control_Path,
  qureyNAC_comment,
  qureyNAC_path,
  store_FA_control_GuaranteeNAC,
  store_FA_control_CheckAssetCode_Process,
  stroe_FA_control_DTL_ConfirmSuccess,
  store_FA_control_upadate_table,
  store_FA_SendMail,
  store_FA_control_Create_from_reported,
  store_FA_control_HistorysAssets,
  store_FA_control_fetch_assets,
  FA_Control_Report_All_Counted_by_Description
}