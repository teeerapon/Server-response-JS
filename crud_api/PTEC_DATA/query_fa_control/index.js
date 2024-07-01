'use strict';


const getsAssets = async (branchIDparam) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetslist = await pool.request()
      .input('RoundID', sql.Int, branchIDparam.RoundID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Mobile_assetsList @RoundID`);
    //sql.close()
    return assetslist.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const getsAssets2 = async (branchIDparam) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetslist = await pool.request()
      .input('BranchID', sql.Int, branchIDparam.BranchID)
      .input('RoundID', sql.Int, branchIDparam.RoundID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_List_allAssets @BranchID, @RoundID`);
    //sql.close()
    return assetslist.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const getAssetCode = async (Code) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const oneAsset = await pool.request()
      .input('Code', sql.NVarChar(30), Code)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Mobile_getAssetByCode @Code ,@RoundID`);
    //sql.close()
    return oneAsset.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const getAssetByUserBranchID = async (userBranchID) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetByUserID = await pool.request()
      .input('RoundID', sql.Int, userBranchID.RoundID)
      .input('BranchID', sql.Int, userBranchID.BranchID)
      .input('UserBranch', sql.Int, userBranchID.UserBranch)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_List_Assets_From_BranchID @UserBranch, @BranchID, @RoundID`);
    //sql.close()
    return assetByUserID.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const wrongBranchID = async (userBranchID) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetByUserID = await pool.request()
      .input('UserBranch', sql.Int, userBranchID.UserBranch)
      .input('BranchID', sql.Int, userBranchID.BranchID)
      .input('RoundID', sql.Int, userBranchID.RoundID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_List_Wrong_Assets @UserBranch, @BranchID, @RoundID`);
    //sql.close()
    return assetByUserID.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const lostAssets = async (userBranchID) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetByUserID = await pool.request()
      .input('UserBranch', sql.Int, userBranchID.UserBranch)
      .input('BranchID', sql.Int, userBranchID.BranchID)
      .input('RoundID', sql.Int, userBranchID.RoundID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Mobile_lost_asset @UserBranch,@BranchID,@RoundID`);
    //sql.close()
    return assetByUserID.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const getAssetByCode = async (codeAsset) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetByCode = await pool.request()
      .input('Code', sql.NVarChar(30), codeAsset.Code)
      .input('RoundID', sql.Int, codeAsset.RoundID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Mobile_getAssetByCode @Code ,@RoundID`);
    //sql.close()
    return assetByCode.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const scan_check_result = async (codeAsset) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetByCode = await pool.request()
      .input('Code', sql.NVarChar(30), codeAsset.Code)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Mobile_scan_check_result @Code`);
    //sql.close()
    return assetByCode.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const getAssetByCodeForTest = async (codeAsset) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetByCode = await pool.request()
      .input('Code', sql.NVarChar(30), codeAsset.Code)
      .input('UserBranch', sql.Int, codeAsset.UserBranch)
      .input('RoundID', sql.BigInt, codeAsset.RoundID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Mobile_getassetForcreate @Code,@UserBranch,@RoundID`);
    //sql.close()
    return assetByCode.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const check_code_wrong_branch = async (codeAsset) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetByCode = await pool.request()
      .input('Code', sql.NVarChar(30), codeAsset.Code)
      .input('RoundID', sql.BigInt, codeAsset.RoundID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Mobile_check_code_wrong_branch  @Code, @RoundID`);
    //sql.close()
    return assetByCode.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const createAsset = async (res) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const insertAsset = await pool.request()
      .input('Code', sql.NVarChar(30), res.Code)
      .input('Name', sql.NVarChar(150), res.Name)
      .input('BranchID', sql.Int, res.BranchID)
      .input('Status', sql.Bit, res.Status)
      .input('UserID', sql.BigInt, res.UserID)
      .input('UserBranch', sql.Int, res.UserBranch)
      .input('RoundID', sql.BigInt, res.RoundID)
      .input('Reference', sql.NVarChar(100), res.Reference)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Add_Assets_Counted @Reference, @Status, @RoundID, @UserBranch, @UserID, @Code`);
    //sql.close()
    return insertAsset.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const updateReference = async (res) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const update = await pool.request()
      .input('Reference', sql.NVarChar(100), res.Reference)
      .input('Code', sql.NVarChar(30), res.Code)
      .input('RoundID', sql.BigInt, res.RoundID)
      .input('UserID', sql.BigInt, res.UserID)
      .input('choice', sql.Int, res.choice ?? 0)
      .input('comment', sql.NVarChar, res.comment ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Mobile_update_reference @Reference, @UserID, @Code, @RoundID, @choice, @comment`);
    //sql.close()
    return update.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}


// Control Assets
const AssetsAll_Control = async (assetsAll_Control) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const assetsBranchID_Control = await pool.request()
      .input('BranchID', sql.Int, assetsAll_Control.BranchID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Mobile_AssetsAll_Control @BranchID`);
    //sql.close()
    return assetsBranchID_Control.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const SelectDTL_Control = async (DTL_Control) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const SelectDTL_Control = await pool.request()
      .input('Code', sql.NVarChar(30), DTL_Control.Code)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Mobile_SelectDtl_Control @Code`);
    //sql.close()
    return SelectDTL_Control.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_create_doc = async (res) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const FAcontrol_create_doc = await pool.request()
      .input('usercode', sql.VarChar(10), res.usercode)
      .input('worktype', sql.Int, res.worktype)
      .input('des_Department', sql.NVarChar(50), res.des_Department)
      .input('des_BU', sql.NVarChar(50), res.des_BU)
      .input('des_delivery', sql.NVarChar(10), res.des_delivery)
      .input('desFristName', sql.NVarChar(50), res.desFristName ?? null)
      .input('desLastNameName', sql.NVarChar(50), res.desLastNameName ?? null)
      .input('des_deliveryDate', sql.NVarChar, res.des_deliveryDate)
      .input('source_Department', sql.NVarChar(50), res.source_Department)
      .input('source_BU', sql.NVarChar(50), res.source_BU)
      .input('source', sql.NVarChar(10), res.source)
      .input('sourceFristName', sql.NVarChar(50), res.sourceFristName ?? null)
      .input('sourceLastName', sql.NVarChar(50), res.sourceLastName ?? null)
      .input('sourceDate', sql.NVarChar, res.sourceDate)
      .input('des_description', sql.NVarChar(200), res.des_description)
      .input('source_description', sql.NVarChar(200), res.source_Description)
      .input('sumPrice', sql.Float, res.sumPrice)
      .query(`
        exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Create_Document_NAC 
        @usercode, 
        @worktype, 
        @sumPrice, 
        @des_Department, 
        @des_BU, 
        @des_delivery, 
        @desFristName, 
        @desLastNameName,
        @des_deliveryDate, 
        @des_description, 
        @source_Department, 
        @source_BU, 
        @source,
        @sourceFristName, 
        @sourceLastName, 
        @sourceDate, 
        @source_description
        `);
    //sql.close()
    return FAcontrol_create_doc.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_creat_Detail = async (FA_control_creat_Detail) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
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
      .input('nacdtl_date_asset', sql.NVarChar, FA_control_creat_Detail.nacdtl_date_asset)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Create_Detail_NAC @usercode, @nac_code, @nacdtl_row, @nacdtl_assetsCode, @nacdtl_assetsName, @nacdtl_assetsSeria, @nacdtl_assetsDtl, @nacdtl_assetsCount, @nacdtl_assetsPrice, @nacdtl_date_asset`);
    //sql.close()
    return control_creat_Detail.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_select_NAC = async (FA_control_select_NAC) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_select_NAC = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_select_NAC.usercode)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Select_MyNAC @usercode`);
    //sql.close()
    return control_select_NAC.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_select_NAC_approve = async (control_select_NAC_approve) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const FA_control_select_NAC_approve = await pool.request()
      .input('usercode', sql.VarChar(10), control_select_NAC_approve.usercode)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Select_MyNAC_Approve @usercode`);
    //sql.close()
    return FA_control_select_NAC_approve.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_GuaranteeNAC = async (FA_control_GuaranteeNAC) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_GuaranteeNAC = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_GuaranteeNAC.usercode)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_GuaranteeNAC @userCode`);
    //sql.close()
    return control_GuaranteeNAC.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_select_dtl = async (FA_control_select_dtl) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_select_dtl = await pool.request()
      .input('nac_code', sql.NVarChar(20), FA_control_select_dtl.nac_code)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_select_dtl @nac_code`);
    //sql.close()
    return control_select_dtl.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_select_dtl_draff = async (FA_control_select_dtl) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_select_dtl = await pool.request()
      .input('nac_code', sql.NVarChar(20), FA_control_select_dtl.nac_code)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_select_dtl_draff @nac_code`);
    //sql.close()
    return control_select_dtl.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_select_headers = async (FA_control_select_headers) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_select_headers = await pool.request()
      .input('nac_code', sql.NVarChar(20), FA_control_select_headers.nac_code)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_select_headers @nac_code`);
    //sql.close()
    return control_select_headers.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_update_DTLandHeaders = async (FA_control_update_DTLandHeaders) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const update_DTLandHeaders = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_update_DTLandHeaders.usercode)
      .input('nac_code', sql.NVarChar(20), FA_control_update_DTLandHeaders.nac_code)
      .input('nac_status', sql.Int, FA_control_update_DTLandHeaders.nac_status)
      .input('nac_type', sql.Int, FA_control_update_DTLandHeaders.nac_type)
      .input('sumPrice', sql.Float, FA_control_update_DTLandHeaders.sumPrice)
      .input('des_department', sql.NVarChar(50), FA_control_update_DTLandHeaders.des_department)
      .input('des_BU', sql.NVarChar(50), FA_control_update_DTLandHeaders.des_BU)
      .input('desFristName', sql.NVarChar(50), FA_control_update_DTLandHeaders.desFristName ?? null)
      .input('desLastNameName', sql.NVarChar(50), FA_control_update_DTLandHeaders.desLastNameName ?? null)
      .input('des_delivery', sql.NVarChar(10), FA_control_update_DTLandHeaders.des_delivery)
      .input('des_deliveryDate', sql.NVarChar, FA_control_update_DTLandHeaders.des_deliveryDate)
      .input('des_description', sql.NVarChar(200), FA_control_update_DTLandHeaders.des_description)
      .input('source_department', sql.NVarChar(50), FA_control_update_DTLandHeaders.source_department)
      .input('source_BU', sql.NVarChar(50), FA_control_update_DTLandHeaders.source_BU)
      .input('source', sql.NVarChar(10), FA_control_update_DTLandHeaders.source)
      .input('sourceFristName', sql.NVarChar(50), FA_control_update_DTLandHeaders.sourceFristName ?? null)
      .input('sourceLastName', sql.NVarChar(50), FA_control_update_DTLandHeaders.sourceLastName ?? null)
      .input('sourceDate', sql.NVarChar, FA_control_update_DTLandHeaders.sourceDate)
      .input('source_description', sql.NVarChar(200), FA_control_update_DTLandHeaders.source_description)
      .input('realPrice_Date', sql.NVarChar, FA_control_update_DTLandHeaders.realPrice_Date ?? null)
      .query(
        `exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Update_DTLandHEADERS 
        @usercode, 
        @nac_code, 
        @nac_status, 
        @sumPrice, 
        @nac_type, 
        @des_department,
        @des_BU, 
        @des_delivery, 
        @desFristName, 
        @desLastNameName,
        @des_deliveryDate, 
        @des_description, 
        @source_department, 
        @source_BU, 
        @source, 
        @sourceFristName, 
        @sourceLastName, 
        @sourceDate, 
        @source_description,
        @realPrice_Date`
      );
    //sql.close()
    return update_DTLandHeaders.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_update_DTL = async (FA_control_update_DTL) => {
  console.log(FA_control_update_DTL);
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
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
      .input('image_1', sql.NVarChar, FA_control_update_DTL.image_1 ?? null)
      .input('image_2', sql.NVarChar, FA_control_update_DTL.image_2 ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Update_DTL @dtl_id, @usercode, @nac_code, @nacdtl_row, @nacdtl_assetsCode, @nacdtl_assetsName, @nacdtl_assetsSeria, @nacdtl_assetsDtl, @nacdtl_assetsCount, @nacdtl_assetsPrice, @asset_id, @image_1, @image_2`);
    //sql.close()
    return update_DTL.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_execDocID = async (FA_control_execDocID) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_execDocID = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_execDocID.user_source)
      .input('nac_code', sql.NVarChar(20), FA_control_execDocID.nac_code)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_execDocID @userCode, @nac_code`);
    //sql.close()
    return control_execDocID.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_updateStatus = async (res) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_updateStatus = await pool.request()
      .input('usercode', sql.VarChar(10), res.usercode)
      .input('nac_code', sql.NVarChar(20), res.nac_code)
      .input('nac_status', sql.Int, res.nac_status)
      .input('nac_type', sql.Int, res.nac_type)
      .input('source', sql.NVarChar(10), res.source)
      .input('sourceDate', sql.NVarChar, res.sourceDate)
      .input('des_delivery', sql.NVarChar(10), res.des_delivery)
      .input('des_deliveryDate', sql.NVarChar, res.des_deliveryDate)
      .input('source_approve', sql.NVarChar(10), res.source_approve)
      .input('source_approve_date', sql.NVarChar, res.source_approve_date)
      .input('des_approve', sql.NVarChar(10), res.des_approve)
      .input('des_approve_date', sql.NVarChar, res.des_approve_date)
      .input('verify_by', sql.NVarChar(10), res.verify_by)
      .input('verify_date', sql.NVarChar, res.verify_date)
      .input('real_price', sql.Float, parseFloat(res.real_price))
      .input('realPrice_Date', sql.NVarChar, res.realPrice_Date ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_updateStatus @usercode , @nac_code, @nac_status, @nac_type, @source, @sourceDate, @des_delivery, @des_deliveryDate, @source_approve, @source_approve_date, @des_approve , @des_approve_date, @verify_by, @verify_date, @real_price, @realPrice_Date`);
    //sql.close()
    return control_updateStatus.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_seals_update = async (FA_control_updateStatus) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_updateStatus = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_updateStatus.usercode)
      .input('nac_code', sql.NVarChar(20), FA_control_updateStatus.nac_code)
      .input('nac_status', sql.Int, FA_control_updateStatus.nac_status)
      .input('nac_type', sql.Int, FA_control_updateStatus.nac_type)
      .input('source', sql.NVarChar(10), FA_control_updateStatus.source)
      .input('sourceDate', sql.NVarChar, FA_control_updateStatus.sourceDate)
      .input('des_delivery', sql.NVarChar(10), FA_control_updateStatus.des_delivery)
      .input('des_deliveryDate', sql.NVarChar, FA_control_updateStatus.des_deliveryDate)
      .input('source_approve', sql.NVarChar(10), FA_control_updateStatus.source_approve)
      .input('source_approve_date', sql.NVarChar, FA_control_updateStatus.source_approve_date)
      .input('des_approve', sql.NVarChar(10), FA_control_updateStatus.des_approve)
      .input('des_approve_date', sql.NVarChar, FA_control_updateStatus.des_approve_date)
      .input('verify_by', sql.NVarChar(10), FA_control_updateStatus.verify_by)
      .input('verify_date', sql.NVarChar, FA_control_updateStatus.verify_date)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Update_Seals @usercode, @nac_code, @nac_status, @nac_type, @source, @sourceDate, @des_delivery, @des_deliveryDate, @source_approve, @source_approve_date, @des_approve, @des_approve_date, @verify_by, @verify_date`);
    //sql.close()
    return control_updateStatus.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_updateDTL_seals = async (res) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const update_DTL = await pool.request()
      .input('usercode', sql.VarChar(10), res.usercode)
      .input('nac_code', sql.VarChar(20), res.nac_code)
      .input('nac_status', sql.Int, res.nac_status)
      .input('nac_type', sql.Int, res.nac_type)
      .input('nacdtl_bookV', sql.Float, parseFloat(res.nacdtl_bookV ?? 0))
      .input('nacdtl_PriceSeals', sql.Float, parseFloat(res.nacdtl_PriceSeals ?? 0))
      .input('nacdtl_profit', sql.Float, parseFloat(res.nacdtl_profit))
      .input('asset_id', sql.Int, parseFloat(res.asset_id))
      .input('nacdtl_assetsCode', sql.VarChar(20), res.nacdtl_assetsCode)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_UpdateDTL_Seals @usercode, @nac_code, @nac_status, @nac_type, @nacdtl_bookV, @nacdtl_PriceSeals, @nacdtl_profit, @asset_id, @nacdtl_assetsCode`);
    //sql.close()
    return update_DTL.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_drop_NAC = async (FA_control_drop_NAC) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_drop_NAC = await pool.request()
      .input('usercode', sql.VarChar(10), FA_control_drop_NAC.usercode)
      .input('nac_code', sql.NVarChar(20), FA_control_drop_NAC.nac_code)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Drop_DocumentNAC @usercode, @nac_code`);
    //sql.close()
    return control_drop_NAC.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_comment = async (FA_control_comment) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_drop_NAC = await pool.request()
      .input('nac_code', sql.VarChar(20), FA_control_comment.nac_code)
      .input('usercode', sql.NVarChar(20), FA_control_comment.usercode)
      .input('comment', sql.NVarChar(200), FA_control_comment.comment)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_NAC_Comment @nac_code, @usercode, @comment`);
    //sql.close()
    return control_drop_NAC.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const stroe_FA_control_Path = async (FA_control_Path) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_Path = await pool.request()
      .input('nac_code', sql.VarChar(20), FA_control_Path.nac_code)
      .input('usercode', sql.VarChar(10), FA_control_Path.usercode)
      .input('description', sql.NVarChar(200), FA_control_Path.description)
      .input('linkpath', sql.NVarChar(200), FA_control_Path.linkpath)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_NAC_PATH @nac_code, @usercode, @description, @linkpath`);
    //sql.close()
    return control_Path.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const qureyNAC_comment = async (NAC_comment) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_drop_NAC = await pool.request()
      .input('nac_code', sql.VarChar(20), NAC_comment.nac_code)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_qureyNAC_comment @nac_code`);
    //sql.close()
    return control_drop_NAC.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const qureyNAC_path = async (NAC_comment) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_drop_NAC = await pool.request()
      .input('nac_code', sql.VarChar(20), NAC_comment.nac_code)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_qureyNAC_path @nac_code`);
    //sql.close()
    return control_drop_NAC.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_CheckAssetCode_Process = async (FA_control_CheckAssetCode_Process) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_drop_NAC = await pool.request()
      .input('nacdtl_assetsCode', sql.VarChar(20), FA_control_CheckAssetCode_Process.nacdtl_assetsCode)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_CheckAssetCode_Process @nacdtl_assetsCode`);
    //sql.close()
    return control_drop_NAC.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const stroe_FA_control_DTL_ConfirmSuccess = async (res) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_drop_NAC = await pool.request()
      .input('nac_code', sql.VarChar(30), res.nac_code)
      .input('usercode', sql.VarChar(10), res.usercode)
      .input('nacdtl_assetsCode', sql.VarChar(50), res.nacdtl_assetsCode)
      .input('asset_id', sql.Int, res.asset_id)
      .input('statusCheck', sql.Int, res.statusCheck)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_DTL_ConfirmSuccess @nac_code, @usercode, @nacdtl_assetsCode, @asset_id, @statusCheck`);
    //sql.close()
    return control_drop_NAC.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_upadate_table = async (FA_control_upadate_table) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_upadate_table = await pool.request()
      .input('nac_code', sql.VarChar(30), FA_control_upadate_table.nac_code)
      .input('usercode', sql.VarChar(10), FA_control_upadate_table.usercode)
      .input('nacdtl_assetsCode', sql.VarChar(50), FA_control_upadate_table.nacdtl_assetsCode)
      .input('asset_id', sql.Int, FA_control_upadate_table.asset_id)
      .input('nac_type', sql.Int, FA_control_upadate_table.nac_type)
      .input('nac_status', sql.Int, FA_control_upadate_table.nac_status)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Update_Table @nac_code, @usercode, @nacdtl_assetsCode, @asset_id, @nac_type, @nac_status`);
    //sql.close()
    return control_upadate_table.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_SendMail = async (FA_SendMail) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_upadate_table = await pool.request()
      .input('nac_code', sql.VarChar(30), FA_SendMail.nac_code)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Controls_NAC_SendMail @nac_code`);
    //sql.close()
    return control_upadate_table.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_Create_from_reported = async (FA_control_Create_from_reported) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_upadate_table = await pool.request()
      .input('nac_code', sql.VarChar(30), FA_control_Create_from_reported.nac_code)
      .input('usercode', sql.VarChar(10), FA_control_Create_from_reported.usercode)
      .input('nacdtl_assetsCode', sql.VarChar(50), FA_control_Create_from_reported.nacdtl_assetsCode)
      .input('nacdtl_row', sql.Int, FA_control_Create_from_reported.nacdtl_row)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Create_from_reported @usercode, @nac_code, @nacdtl_assetsCode, @nacdtl_row`);
    //sql.close()
    return control_upadate_table.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_HistorysAssets = async (FA_control_HistorysAssets) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const control_upadate_table = await pool.request()
      .input('userCode', sql.VarChar(10), FA_control_HistorysAssets.userCode)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[Fix_Assets_Control_HistoryAssets] @userCode`);
    //sql.close()
    return control_upadate_table.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const store_FA_control_fetch_assets = async (FA_control_fetch_assets) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .input('userCode', sql.VarChar(10), FA_control_fetch_assets.userCode)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Fetch_Assets @userCode`);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_Report_All_Counted_by_Description = async (Report_All_Counted_by_Description) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .input('Description', sql.NVarChar(200), Report_All_Counted_by_Description.Description)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_Report_All_Counted_by_Description @Description`);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_New_Assets = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .input('UserCode', sql.NVarChar(200), req.UserCode)
      .input('Code', sql.NVarChar(200), req.Code)
      .input('Name', sql.NVarChar(200), req.Name)
      .input('Asset_group', sql.NVarChar, req.Asset_group ?? null)
      .input('Group_name', sql.NVarChar, req.Group_name ?? null)
      .input('BranchID', sql.Int, req.BranchID)
      .input('Details', sql.NVarChar(200), req.Details)
      .input('SerialNo', sql.NVarChar(200), req.SerialNo)
      .input('Price', sql.Float, req.Price)
      .input('Create_Date', sql.NVarChar(50), req.Create_Date)
      .input('bac_type', sql.NVarChar(50), req.bac_type ?? null)
      .input('keyID', sql.NVarChar(50), req.keyID ?? null)
      .input('user_name', sql.NVarChar, req.user_name ?? null)
      .input('image_2', sql.NVarChar, req.image_2 ?? null)
      .input('OwnerCode', sql.NVarChar, req.OwnerCode ?? null)
      .input('Position', sql.NVarChar, req.Position ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.FA_Control_New_Assets @UserCode, @Code, @Name, @Asset_group, @Group_name, @BranchID, @Details , @SerialNo, @Price, @Create_Date, @bac_type, @keyID, @user_name, @image_2,@OwnerCode,@Position`);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_New_Assets_Xlsx = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .input('UserCode', sql.NVarChar, req.UserCode ?? null)
      .input('Code', sql.NVarChar, req.Code ?? null)
      .input('Name', sql.NVarChar, req.Name ?? null)
      .input('BranchID', sql.Int, req.BranchID ?? null)
      .input('Price', sql.NVarChar, req.Price ?? null)
      .input('OwnerCode', sql.NVarChar, req.OwnerCode ?? null)
      .input('Asset_group', sql.NVarChar, req.Asset_group ?? null)
      .input('Group_name', sql.NVarChar, req.Group_name ?? null)
      .input('SerialNo', sql.NVarChar, req.SerialNo ?? null)
      .input('CreateDate', sql.NVarChar, req.CreateDate ?? null)
      .input('CreateBy', sql.NVarChar, req.CreateBy ?? null)
      .input('Position', sql.NVarChar, req.Position ?? null)
      .input('Details', sql.NVarChar, req.Details ?? null)
      .input('bac_type', sql.NVarChar, req.bac_type ?? null)
      .input('key', sql.NVarChar, req.keyID ?? null)
      .input('user_name', sql.NVarChar, req.user_name ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[FA_Control_Upload_Assets_Xlsx] @UserCode, @Code, @Name, @BranchID , @OwnerCode, @Asset_group, @Group_name, @SerialNo, @Price, @CreateDate, @CreateBy, @Position, @Details, @bac_type, @key, @user_name`);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_import_dataXLSX_toAssets = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .input('count', sql.Int, req.count ?? null)
      .input('keyID', sql.NVarChar, req.keyID ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[FA_Control_import_dataXLSX_toAssets] @count, @keyID`);
    //sql.close()
    return fetch_assets.recordset;
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

const FA_Control_BPC_SelectStatus = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.dbo.[FA_Control_BPC_SelectStatus]`);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_Delete_PATH = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .input('linkpath_id', sql.Int, parseInt(req.linkpath_id) ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[FA_Control_Delete_PATH] @linkpath_id`);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_Edit_EBook = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .input('Code', sql.NVarChar, req.Code ?? null)
      .input('image_1', sql.NVarChar, req.image_1 ?? '')
      .input('image_2', sql.NVarChar, req.image_2 ?? '')
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[FA_Control_Edit_EBook] @Code, @image_1, @image_2`);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_BPC_Sendmail = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .input('me', sql.NVarChar, req.ME)
      .input('ktt', sql.NVarChar, req.KTT === false ? undefined : req.KTT)
      .input('grp', sql.NVarChar, req.GRP === false ? undefined : req.GRP)
      .input('rod', sql.NVarChar, req.ROD === false ? undefined : req.ROD)
      .input('code_ref', sql.NVarChar, req.code_ref)
      .input('data', sql.NVarChar, req.data)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[FA_Control_BPC_Sendmail] @me, @ktt, @grp, @rod, @data, @code_ref`);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_BPC_UpdateDetails = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .input('UserCode', sql.NVarChar, req.userCode)
      .input('Code', sql.NVarChar, req.Code)
      .input('Details', sql.NVarChar, req.Details)
      .input('Comments', sql.NVarChar, req.Comments)
      .input('keyID', sql.NVarChar, req.keyID)
      .input('image_1', sql.NVarChar, req.image_1)
      .input('image_2', sql.NVarChar, req.image_2)
      .input('user_name', sql.NVarChar, req.user_name)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[FA_Control_BPC_UpdateDetails] @UserCode, @Code, @Details, @Comments, @keyID, @image_1, @image_2, @user_name`);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_BPC_Running_NO = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .query(`
          declare @KeyID varchar(100)
          declare @date_time datetime = getdate()
          exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[RunningNo] 'TAB', @date_time, @KeyID output

          select @KeyID as TAB
      `);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_BPC_SELECT_TEMP = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .input('keyID', sql.NVarChar, req.keyID)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[FA_Control_BPC_SELECT_TEMP] @KeyID`);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_BPC_GroupBy = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[FA_Control_BPC_GroupBy]`);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_BPC_SubmitVertify = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .input('tab_code', sql.NVarChar, req.tab_code ?? null)
      .input('assetID', sql.Int, req.assetID ?? null)
      .input('userid', sql.NVarChar, req.userid ?? null)
      .input('statusid', sql.Int, req.statusid ?? null)
      .input('count', sql.Int, req.count ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[FA_Control_BPC_SubmitVertify] @tab_code, @assetID ,@userid ,@statusid, @count`);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const FA_Control_BPC_UpdateTemp = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const fetch_assets = await pool.request()
      .input('Code', sql.NVarChar, req.Code ?? null)
      .input('keyID', sql.NVarChar, req.keyID ?? null)
      .input('Comments', sql.NVarChar, req.Comments ?? null)
      .input('image_2', sql.NVarChar, req.image_2 ?? null)
      .query(`exec ${config.PTEC.object_ptec_ops.sql.database}.[dbo].[FA_Control_BPC_UpdateTemp] @Code, @keyID ,@Comments ,@image_2`);
    //sql.close()
    return fetch_assets.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

module.exports = {

  //BPC
  FA_Control_BPC_Sendmail,
  FA_Control_BPC_UpdateDetails,
  FA_Control_BPC_Running_NO,
  FA_Control_BPC_SELECT_TEMP,
  FA_Control_BPC_GroupBy,
  FA_Control_BPC_SelectStatus,
  FA_Control_BPC_SubmitVertify,
  FA_Control_BPC_UpdateTemp,

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
  store_FA_control_select_dtl_draff,
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
  FA_Control_Report_All_Counted_by_Description,
  FA_Control_New_Assets,
  FA_Control_New_Assets_Xlsx,
  FA_Control_import_dataXLSX_toAssets,
  FA_Control_Running_NO,
  FA_Control_Delete_PATH,
  FA_Control_Edit_EBook
}