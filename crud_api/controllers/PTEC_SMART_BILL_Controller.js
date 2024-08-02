const billData = require('../PTEC_DATA/query_SmartBill');
const query_OPS_mobile = require('../PTEC_DATA/query_OPS_mobile');

const SmartBill_CreateForms = async (req, res, next) => {
  try {
    const dataBody = req.body;
    const reqSmartBill_Header = {
      usercode: dataBody.smartBill_Header[0].usercode === '' ? 'SYSTEM' : dataBody.smartBill_Header[0].usercode,
      sb_code: dataBody.sb_code ?? '',
      sb_name: dataBody.smartBill_Header[0].sb_name,
      sb_fristName: dataBody.smartBill_Header[0].sb_fristName,
      sb_lastName: dataBody.smartBill_Header[0].sb_lastName,
      clean_status: parseInt(dataBody.smartBill_Header[0].clean_status),
      group_status: parseInt(dataBody.smartBill_Header[0].group_status),
      car_infocode: dataBody.carInfo[0].car_infocode,
      reamarks: dataBody.smartBill_Header[0].reamarks,
      car_infostatus_companny: dataBody.carInfo[0].car_infostatus_companny,
      car_categaryid: dataBody.carInfo[0].car_categaryid,
      car_typeid: dataBody.carInfo[0].car_typeid,
      car_band: dataBody.carInfo[0].car_band,
      car_tier: dataBody.carInfo[0].car_tier,
      car_color: dataBody.carInfo[0].car_color,
      car_remarks: dataBody.carInfo[0].car_remarks,
    }
    const dataSmartBill_Header = await billData.SmartBill_CreateForms(reqSmartBill_Header);
    if (dataSmartBill_Header[0].sb_code) {
      if (parseInt(dataBody.smartBill_Header[0].group_status) === 1) {
        for (const element of dataBody.smartBill_Operation) {
          await billData.SmartBill_CreateOperation({ data: element, sb_code: dataSmartBill_Header[0].sb_code });
        }
        for (let i = 0; i < dataBody.smartBill_Associate.length; i++) {
          await billData.SmartBill_CreateAssociate({ data: dataBody.smartBill_Associate[i], sb_code: dataSmartBill_Header[0].sb_code });
          if (i + 1 === dataBody.smartBill_Operation.length) {
            res.status(200).send(dataSmartBill_Header[0].sb_code);
          }
        }
      } else {
        for (let i = 0; i < dataBody.smartBill_Operation.length; i++) {
          await billData.SmartBill_CreateOperation({ data: dataBody.smartBill_Operation[i], sb_code: dataSmartBill_Header[0].sb_code });
          if (i + 1 === dataBody.smartBill_Operation.length) {
            res.status(200).send(dataSmartBill_Header[0].sb_code);
          }
        }
      }
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_CarInfoSearch = async (req, res, next) => {
  try {
    const dataBody = req.body;
    const data = await billData.SmartBill_CarInfoSearch(dataBody);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_files = async (req, res) => {
  try {
    let newpath = 'D:' + "/files/smartBill/";
    const file = req.files.file;
    const st_code = req.body.sb_code;
    const filename = file.name;
    const usercode = 'SYSTEM' //SYSTEM (users)
    const url = 'http://vpnptec.dyndns.org:33080/smartBill/'

    const attach = 'ATT'
    const new_path = await query_OPS_mobile.FA_Control_Running_NO(attach)
    if (new_path) {
      file.mv(`${newpath}${new_path[0].ATT}.${filename.split('.').pop()}`, async (err) => {
        if (err) {
          res.status(500).send({ message: "File upload failed", code: 200 });
        }
        const body = { "st_code": st_code, "url": `${url}${new_path[0].ATT}.${filename.split('.').pop()}`, "user": usercode, "description": st_code }
        await query_OPS_mobile.NonPO_Attatch_Save(body)
        res.status(200).send({ message: "successfully", code: new_path });
      });
    }
  } catch (error) {
    res.status(201).send(error.message);
  }

}

const SmartBill_SelectHeaders = async (req, res, next) => {
  try {
    const data = await billData.SmartBill_SelectHeaders();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_SelectAllForms = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_SelectAllForms(body);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_ESGQuery = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_ESGQuery(body);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_Withdraw_Save = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_Withdraw_Save(body);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_Withdraw_SelectAllForms = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_Withdraw_SelectAllForms(body);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_CreateCost = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_CreateCost(body[0]);
    if (data[0][0].Cost_id) {
      for (const element of body) {
        await billData.SmartBill_CreateCostAllowance({
          sbwdtl_id: element.sbwdtl_id,
          cost_id: data[0][0].Cost_id,
          category_id: element.category_id,
          usercode: element.usercode,
          amount: element.amount,
        });
      }
    }
    res.setHeader("Content-Type", "application/json; charset=utf-8");
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_WithdrawDtl_SelectCategory = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_WithdrawDtl_SelectCategory(body);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_WithdrawDtl_SaveChangesCategory = async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    for (let i = 0; i < body.length; i++) {
      const data = await billData.SmartBill_WithdrawDtl_SaveChangesCategory(body[i])
      if (i + 1 === body.length) {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.status(200).send(data);
      }
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_WithdrawDtl_DeleteCategory = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_WithdrawDtl_DeleteCategory(body)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_Withdraw_Delete = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_Withdraw_Delete(body)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_WithdrawDtl_SaveChangesHotelGroup = async (req, res, next) => {
  try {
    const body = req.body;
    for (let i = 0; i < body.length; i++) {
      const data = await billData.SmartBill_WithdrawDtl_SaveChangesHotelGroup(body[i])
      if (i + 1 === body.length) {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.status(200).send(data);
      }
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_WithdrawDtl_SelectHotelGroup = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_WithdrawDtl_SelectHotelGroup(body)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_WithdrawDtl_DeleteHotelGroup = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_WithdrawDtl_DeleteHotelGroup(body)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_Withdraw_Addrow = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_Withdraw_Addrow(body)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_Withdraw_AddrowDtl = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_Withdraw_AddrowDtl(body)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_WithdrawDtl_Delete = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_WithdrawDtl_Delete(body)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_Withdraw_updateSBW = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_Withdraw_updateSBW(body)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_Withdraw_SelectCostOther = async (req, res, next) => {
  try {
    const data = await billData.SmartBill_Withdraw_SelectCostOther()
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const NonPO_Delete_Attach_By_attachid = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.NonPO_Delete_Attach_By_attachid(body)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const SmartBill_AcceptHeader = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await billData.SmartBill_AcceptHeader(body)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

module.exports = {
  SmartBill_CreateForms,
  SmartBill_CarInfoSearch,
  SmartBill_files,
  SmartBill_SelectHeaders,
  SmartBill_SelectAllForms,
  SmartBill_ESGQuery,
  SmartBill_Withdraw_Save,
  SmartBill_Withdraw_SelectAllForms,
  SmartBill_CreateCost,
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
// SmartBill_CreateFormsUploadFile