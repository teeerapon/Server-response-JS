'use strict';

const userData = require('../PTEC_DATA/query_ptec_user');
const TokenManager = require('./token_manager');

const getsUser = async (req, res, next) => {
  try {
    const users = await userData.getsUser();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(users);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const getUserCode = async (req, res, next) => {
  try {
    const UserCode = req.params.body;
    const oneUser = await userData.getById(UserCode);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(oneUser);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const login = async (req, res, next) => {
  try {
    const codeAndpassword = req.body;
    const loginData = await userData.getByEmailAndCode(codeAndpassword);
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (loginData[0] != null) {
      if (loginData[0].password == 1) {
        const accessToken = TokenManager.getGenarateToken({ "UserCode": loginData[0].password });
        res.status(200).send(JSON.stringify({ message: "success", data: loginData, token: accessToken, date: today.toLocaleString("sv-SE") }));
      } else {
        res.status(400).send(JSON.stringify({ message: "usuccess", data: "invaild password" }));
      }
    } else {
      res.status(400).send(JSON.stringify({ message: "usuccess", data: "Not found UserCode" }));
    }
  } catch (error) {
    res.send(error);
  }
}

const getsUserForAssetsControl = async (req, res, next) => {
  try {
    const users = await userData.getsUser();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(JSON.stringify({ message: "usuccess", data: users }));
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const AutoDeapartMent = async (req, res, next) => {
  try {
    const data = req.body;
    const auto_DeapartMent = await userData.AutoDeapartMent(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (auto_DeapartMent.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: auto_DeapartMent }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const ChackUserWeb = async (req, res, next) => {
  try {
    const data = req.body;
    const chackUserWeb = await userData.ChackUserWeb(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (chackUserWeb.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: chackUserWeb }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const get_branch_period = async (req, res, next) => {
  try {
    const data = req.body;
    const branch_period = await userData.get_branch_period(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (branch_period.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: branch_period }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const select_Permission_Menu_NAC = async (req, res, next) => {
  try {
    const data = req.body;
    const permission_Menu_NAC = await userData.select_Permission_Menu_NAC(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(JSON.stringify({ message: "success", data: permission_Menu_NAC }));
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const Permission_Menu_NAC = async (req, res, next) => {
  try {
    const data = req.body;
    const permission_Menu_NAC = await userData.Permission_Menu_NAC(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (permission_Menu_NAC.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: permission_Menu_NAC }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const Fix_Assets_Control_UPDATE_Permission = async (req, res, next) => {
  try {
    const data = req.body;
    const permission_Menu_NAC = await userData.Fix_Assets_Control_UPDATE_Permission(data);
    console.log(permission_Menu_NAC);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(JSON.stringify({ message: "success", data: permission_Menu_NAC }));
  } catch (error) {
    res.status(201).send(error.message);
  }
}

module.exports = {
  getsUser,
  getUserCode,
  login,
  getsUserForAssetsControl,
  AutoDeapartMent,
  ChackUserWeb,
  get_branch_period,
  select_Permission_Menu_NAC,
  Permission_Menu_NAC,
  Fix_Assets_Control_UPDATE_Permission
}