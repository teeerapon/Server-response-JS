'use strict';

const { DateTime } = require('mssql');
const query_fa_control = require('../PTEC_DATA/query_fa_control');
const TokenManager = require('./token_manager');
const query_fa_control_period = require('../PTEC_DATA/query_fa_control_period');


const getAllasset = async (req, res, next) => {
  try {
    const assetCode = req.body;
    const allAssets = await query_fa_control.getsAssets(assetCode);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(allAssets);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const getCode = async (req, res, next) => {
  try {
    const assetCode = req.params.body;
    const oneAsset = await query_fa_control.getAssetCode(assetCode);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(oneAsset);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const scan_check_result = async (req, res, next) => {
  try {
    const assetByCode = req.body;
    const assetsData = await query_fa_control.scan_check_result(assetByCode);
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
    const assetsData = await query_fa_control.scan_check_result(assetByCode);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed);
    if (assetsData.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบ ", data: assetByCode.Code + ' นี้ในระบบ' }));
    } else {
      const assetsDataScan = await query_fa_control.getAssetByCode(assetByCode);
      if (assetsDataScan.length != 0) {
        // const accessToken = TokenManager.getGenarateToken({ "Code": assetsData.Code });
        const accessToken = Math.random().toString(36).substr(2)
        res.status(200).send(JSON.stringify({ message: "success", data: assetsData, token: accessToken, date: today.toLocaleString("sv-SE") }));
      } else {
        const assetsData = await query_fa_control.check_code_wrong_branch(assetByCode);
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
    const assetByUserBranchID = await query_fa_control.getAssetByUserBranchID(UserBranchID);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(assetByUserBranchID);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const WrongBranch = async (req, res, next) => {
  try {
    const UserBranchID = req.body;
    const assetByUserBranchID = await query_fa_control.wrongBranchID(UserBranchID);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(assetByUserBranchID);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const lostAssets = async (req, res, next) => {
  try {
    const UserBranchID = req.body;
    const assetByUserBranchID = await query_fa_control.lostAssets(UserBranchID);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(assetByUserBranchID);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getAllasset2 = async (req, res, next) => {
  try {
    const brnchIDparam = req.body;
    const allAssets = await query_fa_control.getsAssets2(brnchIDparam);
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
    const period_loginDateTrue = await query_fa_control_period.period_login(dataAsset);
    if (period_loginDateTrue.length != 0) {
      const dataAssetAndUser = await query_fa_control.getAssetByCodeForTest(dataAsset);
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      if (dataAssetAndUser.length != 0) {
        res.status(400).send(JSON.stringify({ message: "สาขาที่ " + dataAssetAndUser[0].UserBranch + " ได้บันทึกทรัพย์สินนี้ไปแล้ว", data: dataAssetAndUser }));
      } else {
        const successAdd = await query_fa_control.createAsset(dataAsset);
        res.send(JSON.stringify({ message: "ทำการบันทึกข้อมูลเสร็จสิ้น", data: successAdd }));
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
    const period_loginDateTrue = await query_fa_control_period.period_login(data);
    if (!data.choice) {
      if (period_loginDateTrue.length != 0) {
        const updated = await query_fa_control.updateReference(data);
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.status(200).send(JSON.stringify({ message: "ทำการเปลียนแปลงข้อมูลเสร็จสิ้น", data: updated }));
      } else {
        res.status(400).send(JSON.stringify({ message: "ไม่สามารถแก้ไขได้เนื่องจากรอบบันทึกไม่ตรงถูกต้อง" }));
      }
    } else if (data.choice === 1) {
      const updated = await query_fa_control.updateReference(data);
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.status(200).send(JSON.stringify({ message: "ทำการเปลียนแปลงข้อมูลเสร็จสิ้น", data: updated }));
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}


// Control Assets

const AssetsAll_Control = async (req, res, next) => {
  try {
    const data = req.body;
    const allAssets = await query_fa_control.AssetsAll_Control(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (allAssets.length > 0 && allAssets) {
      res.status(200).send(JSON.stringify({ message: "success", data: allAssets }));
    } else {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SelectDTL_Control = async (req, res, next) => {
  try {
    const data = req.body;
    const DTL_Control = await query_fa_control.SelectDTL_Control(data);
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
    const FA_control_create_doc = await query_fa_control.store_FA_control_create_doc(data);
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
    const FA_control_creat_Detail = await query_fa_control.store_FA_control_creat_Detail(data);
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
    const FA_control_select_NAC = await query_fa_control.store_FA_control_select_NAC(data);
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
    const FA_control_select_NAC_approve = await query_fa_control.store_FA_control_select_NAC_approve(data);
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
    const FA_control_GuaranteeNAC = await query_fa_control.store_FA_control_GuaranteeNAC(data);
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
    const FA_control_select_dtl = await query_fa_control.store_FA_control_select_dtl(data);
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

const store_FA_control_select_dtl_draff = async (req, res, next) => {
  try {
    const data = req.body;
    const FA_control_select_dtl = await query_fa_control.store_FA_control_select_dtl_draff(data);
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
    const FA_control_select_headers = await query_fa_control.store_FA_control_select_headers(data);
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
    const update_DTLandHeaders = await query_fa_control.store_FA_control_update_DTLandHeaders(data);
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
    const update_DTL = await query_fa_control.store_FA_control_update_DTL(data);
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
    const control_execDocID = await query_fa_control.store_FA_control_execDocID(data);
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
    const FA_control_updateStatus = await query_fa_control.store_FA_control_updateStatus(data);
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
    const FA_control_seals_update = await query_fa_control.store_FA_control_seals_update(data);
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
    const FA_control_updateDTL_seals = await query_fa_control.store_FA_control_updateDTL_seals(data);
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
    const FA_control_drop_NAC = await query_fa_control.store_FA_control_drop_NAC(data);
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
    const FA_control_comment = await query_fa_control.store_FA_control_comment(data);
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
    const FA_control_Path = await query_fa_control.stroe_FA_control_Path(data);
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
    const NAC_comment = await query_fa_control.qureyNAC_comment(data);
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
    const NAC_path = await query_fa_control.qureyNAC_path(data);
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
    const FA_control_CheckAssetCode_Process = await query_fa_control.store_FA_control_CheckAssetCode_Process(data);
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
    const FA_control_DTL_ConfirmSuccess = await query_fa_control.stroe_FA_control_DTL_ConfirmSuccess(data);
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
    const FA_control_upadate_table = await query_fa_control.store_FA_control_upadate_table(data);
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
    const FA_SendMail = await query_fa_control.store_FA_SendMail(data);
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
    const FA_control_Create_from_reported = await query_fa_control.store_FA_control_Create_from_reported(data);
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
    const HistorysAssets = await query_fa_control.store_FA_control_HistorysAssets(data);
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
    const fetch_assets = await query_fa_control.store_FA_control_fetch_assets(data);
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

const FA_Control_Report_All_Counted_by_Description = async (req, res, next) => {
  try {
    const data = req.body;
    const Report_All_Counted_by_Description = await query_fa_control.FA_Control_Report_All_Counted_by_Description(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (Report_All_Counted_by_Description.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: Report_All_Counted_by_Description }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const FA_Control_New_Assets = async (req, res, next) => {
  try {
    const data = req.body;
    const new_data = await query_fa_control.FA_Control_New_Assets(data);

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: new_data }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const FA_Control_New_Assets_Xlsx = async (req, res, next) => {
  try {
    const data = req.body
    const new_data = await query_fa_control.FA_Control_New_Assets_Xlsx(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify(new_data));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const FA_Control_import_dataXLSX_toAssets = async (req, res, next) => {
  try {
    const data = req.body
    const new_data = await query_fa_control.FA_Control_import_dataXLSX_toAssets(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify(new_data));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const check_files = async (req, res) => {
  var newpath = 'D:' + "/files/";
  const file = req.files.file;
  const filename = file.name;
  const attach = 'ATT'
  const new_path = await query_fa_control.FA_Control_Running_NO(attach)
  file.mv(`${newpath}${new_path[0].ATT}.${filename.split('.').pop()}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    res.status(200).send({ message: "File Uploaded", code: 200, attach: new_path });
  });
}

const check_files_NewNAC = async (req, res) => {
  var newpath = 'D:' + "/files/NEW_NAC/";
  const file = req.files.file;
  const filename = file.name;
  const attach = 'ATT'
  const new_path = await query_fa_control.FA_Control_Running_NO(attach)
  file.mv(`${newpath}${new_path[0].ATT}.${filename.split('.').pop()}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    res.status(200).send({ message: "File Uploaded", code: 200, attach: new_path });
  });
}

const FA_Control_Delete_PATH = async (req, res) => {
  try {
    const data = req.body
    const new_data = await query_fa_control.FA_Control_Delete_PATH(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(JSON.stringify({ message: "success", data: new_data }));
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const FA_Control_Edit_EBook = async (req, res) => {
  try {
    const data = req.body
    const new_data = await query_fa_control.FA_Control_Edit_EBook(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify(new_data));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const FA_Control_BPC_Sendmail = async (req, res) => {
  try {
    const data = req.body
    const new_data = await query_fa_control.FA_Control_BPC_Sendmail(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify(new_data));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const FA_Control_BPC_UpdateDetails = async (req, res) => {
  try {
    const data = req.body
    const new_data = await query_fa_control.FA_Control_BPC_UpdateDetails(data);
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify(new_data));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const FA_Control_BPC_Running_NO = async (req, res) => {
  try {
    const new_data = await query_fa_control.FA_Control_BPC_Running_NO();
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify(new_data));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const FA_Control_BPC_SELECT_TEMP = async (req, res) => {
  try {
    const data = req.body
    const new_data = await query_fa_control.FA_Control_BPC_SELECT_TEMP(data);
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify(new_data));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const FA_Control_BPC_GroupBy = async (req, res) => {
  try {
    const data = req.body
    const new_data = await query_fa_control.FA_Control_BPC_GroupBy();
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify(new_data));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const FA_Control_BPC_SelectStatus = async (req, res) => {
  try {
    const data = req.body
    const new_data = await query_fa_control.FA_Control_BPC_SelectStatus(data);
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify(new_data));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const FA_Control_BPC_SubmitVertify = async (req, res) => {
  try {
    const data = req.body
    const new_data = await query_fa_control.FA_Control_BPC_SubmitVertify(data);
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify(new_data));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const FA_Control_BPC_UpdateTemp = async (req, res) => {
  try {
    const data = req.body
    const new_data = await query_fa_control.FA_Control_BPC_UpdateTemp(data);
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify(new_data));
    }
  } catch (error) {
    res.status(201).send(error.message);
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
  check_files,
  FA_Control_Delete_PATH,
  check_files_NewNAC,
  FA_Control_Edit_EBook
}