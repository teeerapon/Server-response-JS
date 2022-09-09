'use strict';

const { DateTime } = require('mssql');
const assetData = require('../data/assets');
const TokenManager = require('./token_manager');
const periodData = require('../data/period');

const getAllasset = async (req, res, next) => {
  try {
    const assetCode = req.body;
    const allAssets = await assetData.getsAssets(assetCode);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(allAssets);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const getCode = async (req, res, next) => {
  try {
    const assetCode = req.params.body;
    const oneAsset = await assetData.getAssetCode(assetCode);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(oneAsset);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const scan_check_result = async (req, res, next) => {
  try {
    const assetByCode = req.body;
    const assetsData = await assetData.scan_check_result(assetByCode);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (assetsData.length != 0) {
      res.status(200).send(JSON.stringify({ message: "success", data: assetsData }));
    }
    else {
      res.status(400).send(JSON.stringify({ message: "ไม่พบ ", data: assetByCode.Code + ' นี้ในระบบ' }));
    }
  } catch (error) {
    res.send(error);
  }
}

const assetByCode = async (req, res, next) => {
  try {
    const assetByCode = req.body;
    const assetsData = await assetData.scan_check_result(assetByCode);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed);
    if (assetsData.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบ ", data: assetByCode.Code + ' นี้ในระบบ' }));
    } else {
      const assetsDataScan = await assetData.getAssetByCode(assetByCode);
      if (assetsDataScan.length != 0) {
        const accessToken = TokenManager.getGenarateToken({ "Code": assetsData.Code });
        res.status(200).send(JSON.stringify({ message: "success", data: assetsData, token: accessToken, date: today.toLocaleString("sv-SE") }));
      }
      else {
        const assetsData = await assetData.check_code_wrong_branch(assetByCode);
        res.status(400).send(JSON.stringify({ message: "ทรัพย์สินนี้ถูกบันทึกแล้วที่สาขา ", data: assetsData[0]['UserBranch'], date: today.toLocaleString("sv-SE") }));
      }
    }
  } catch (error) {
    res.send(error);
  }
}

const assetByUserBranch = async (req, res, next) => {
  try {
    const UserBranchID = req.body;
    const assetByUserBranchID = await assetData.getAssetByUserBranchID(UserBranchID);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(assetByUserBranchID);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const WrongBranch = async (req, res, next) => {
  try {
    const UserBranchID = req.body;
    const assetByUserBranchID = await assetData.wrongBranchID(UserBranchID);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(assetByUserBranchID);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const lostAssets = async (req, res, next) => {
  try {
    const UserBranchID = req.body;
    const assetByUserBranchID = await assetData.lostAssets(UserBranchID);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(assetByUserBranchID);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getAllasset2 = async (req, res, next) => {
  try {
    const brnchIDparam = req.body;
    const allAssets = await assetData.getsAssets2(brnchIDparam);
    res.setHeader("Content-Type", "application/json; charset=utf-8")
    if (allAssets.length != 0) {
      const resultData = JSON.stringify({ data: allAssets });
      res.status(200).send(resultData);
    }
    else {
      const resultData = JSON.stringify({ data: allAssets });
      res.status(200).send(resultData);
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const addAsset = async (req, res, next) => {
  try {
    const dataAsset = req.body;
    const period_loginDateTrue = await periodData.period_check_create(dataAsset);
    if (period_loginDateTrue.length != 0) {
      const dataAssetAndUser = await assetData.getAssetByCodeForTest(dataAsset);
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      if (dataAssetAndUser.length != 0) {
        res.status(400).send(JSON.stringify({ message: "สาขาของคุณได้บันทึกทรัพย์สินนี้ไปแล้ว", data: dataAssetAndUser }));
      } else {
        const dataAssetAndUser = await assetData.createAsset(dataAsset);
        res.send(JSON.stringify({ message: "ทำการบันทึกข้อมูลเสร็จสิ้น", data: dataAssetAndUser }));
      }
    } else {
      res.status(400).send(JSON.stringify({ message: "ยังไม่มีการเปิดรอบบันทึกตอนนี้" }));
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const updateReference = async (req, res, next) => {
  try {
    const data = req.body;
    const period_loginDateTrue = await periodData.period_check_create(data);
    //console.log(data);
    //console.log(period_loginDateTrue.length);
    if (period_loginDateTrue.length != 0) {
      const updated = await assetData.updateReference(data);
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.status(200).send(JSON.stringify({ message: "ทำการเปลียนแปลงข้อมูลเสร็จสิ้น", data: updated }));
    } else {
      res.status(400).send(JSON.stringify({ message: "ไม่สามารถแก้ไขได้เนื่องจากรอบบันทึกไม่ตรงถูกต้อง" }));
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}


// Control Assets

const AssetsAll_Control = async (req, res, next) => {
  try {
    const data = req.body;
    const allAssets = await assetData.AssetsAll_Control(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (allAssets.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: allAssets }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SelectDTL_Control = async (req, res, next) => {
  try {
    const data = req.body;
    const DTL_Control = await assetData.SelectDTL_Control(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (DTL_Control.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: DTL_Control }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_create_doc = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_create_doc = await assetData.store_FA_control_create_doc(data);
    //console.log(FA_control_create_doc);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_create_doc.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_create_doc }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_creat_Detail = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_creat_Detail = await assetData.store_FA_control_creat_Detail(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_creat_Detail.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_creat_Detail }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_select_NAC = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_select_NAC = await assetData.store_FA_control_select_NAC(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_select_NAC.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_select_NAC }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_select_NAC_approve = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_select_NAC_approve = await assetData.store_FA_control_select_NAC_approve(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (!FA_control_select_NAC_approve || FA_control_select_NAC_approve.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_select_NAC_approve }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_GuaranteeNAC = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_GuaranteeNAC = await assetData.store_FA_control_GuaranteeNAC(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (!FA_control_GuaranteeNAC || FA_control_GuaranteeNAC.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_GuaranteeNAC }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_select_dtl = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_select_dtl = await assetData.store_FA_control_select_dtl(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_select_dtl.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_select_dtl }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_select_headers = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_select_headers = await assetData.store_FA_control_select_headers(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_select_headers.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_select_headers }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_update_DTLandHeaders = async (req, res, next) => {
  try {
    const data = req.body;
    const update_DTLandHeaders = await assetData.store_FA_control_update_DTLandHeaders(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (update_DTLandHeaders.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: update_DTLandHeaders }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_update_DTL = async (req, res, next) => {
  try {
    const data = req.body;
    const update_DTL = await assetData.store_FA_control_update_DTL(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (update_DTL.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: update_DTL }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_execDocID = async (req, res, next) => {
  try {
    const data = req.body;
    const control_execDocID = await assetData.store_FA_control_execDocID(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (control_execDocID.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: control_execDocID }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_updateStatus = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_updateStatus = await assetData.store_FA_control_updateStatus(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_updateStatus.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_updateStatus }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_seals_update = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_seals_update = await assetData.store_FA_control_seals_update(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_seals_update.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_seals_update }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_updateDTL_seals = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_updateDTL_seals = await assetData.store_FA_control_updateDTL_seals(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_updateDTL_seals.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_updateDTL_seals }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_drop_NAC = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_drop_NAC = await assetData.store_FA_control_drop_NAC(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_drop_NAC.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_drop_NAC }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_comment = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_comment = await assetData.store_FA_control_comment(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_comment.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_comment }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const stroe_FA_control_Path = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_Path = await assetData.stroe_FA_control_Path(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_Path.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_Path }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const qureyNAC_comment = async (req, res, next) => {
  try {
    const data = req.body;
    const NAC_comment = await assetData.qureyNAC_comment(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (NAC_comment.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: NAC_comment }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const qureyNAC_path = async (req, res, next) => {
  try {
    const data = req.body;
    const NAC_path = await assetData.qureyNAC_path(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (NAC_path.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: NAC_path }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_CheckAssetCode_Process = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_CheckAssetCode_Process = await assetData.store_FA_control_CheckAssetCode_Process(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_CheckAssetCode_Process.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_CheckAssetCode_Process }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const stroe_FA_control_DTL_ConfirmSuccess = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_DTL_ConfirmSuccess = await assetData.stroe_FA_control_DTL_ConfirmSuccess(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_DTL_ConfirmSuccess.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_DTL_ConfirmSuccess }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_upadate_table = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_upadate_table = await assetData.store_FA_control_upadate_table(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_upadate_table.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_upadate_table }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_SendMail = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_SendMail = await assetData.store_FA_SendMail(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_SendMail.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_SendMail }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_Create_from_reported = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_Create_from_reported = await assetData.store_FA_control_Create_from_reported(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (FA_control_Create_from_reported.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: FA_control_Create_from_reported }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_HistorysAssets = async (req, res, next) => {
  try {
    const data = req.body;
    const HistorysAssets = await assetData.store_FA_control_HistorysAssets(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (HistorysAssets.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: HistorysAssets }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const store_FA_control_fetch_assets = async (req, res, next) => {
  try {
    const data = req.body;
    const fetch_assets = await assetData.store_FA_control_fetch_assets(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (fetch_assets.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: fetch_assets }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

module.exports = {
  getAllasset,
  assetByCode,
  addAsset,
  getCode,
  assetByUserBranch,
  getAllasset2,
  WrongBranch,
  updateReference,
  lostAssets,
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
  store_FA_control_fetch_assets
}