'use strict';

const e = require('express');
const periodData = require('../data/period');

const period_login = async (req, res, next) => {
  try {
    const period_loginData = req.body;
    const period_loginDateTrue = await periodData.period_login(period_loginData);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (period_loginDateTrue.length == 0) {
      res.status(400).send(JSON.stringify({ message: "unsuccess", data: "ไม่พบการเปิดช่วงเวลานี้" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", PeriodRound: period_loginDateTrue[0].PeriodID }));
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getAllround_period = async (req, res, next) => {
  try {
    const period_loginData = req.body;
    const all_period = await periodData.getsperiod_round(period_loginData);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(all_period);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const permission_branch = async (req, res, next) => {
  try {
    const permission_branch = req.body;
    const period_login_permission_branch = await periodData.fa_permission_branch(permission_branch);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (period_login_permission_branch.length == 0) {
      res.status(400).send(JSON.stringify({ message: "unsuccess", data: "ไม่พบสิทธิ์" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: period_login_permission_branch }));
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const craete_period = async (req, res, next) => {
  try {
    const craete_period = req.body;
    const period_loginDateTrue = await periodData.period_login(craete_period);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (period_loginDateTrue.length != 0) {
      res.status(400).send(JSON.stringify({ message: "unsuccess", data: "มีการเปิดช่วงเวลาทับกัน", wrongPeriod: period_loginDateTrue[0].PeriodID }));
    } else {
      if (craete_period.BranchID == 0) {
        const craete_period_branch = await periodData.craete_period(craete_period);
        res.status(200).send(JSON.stringify({ message: "success", data: craete_period_branch }));
      } else {
        const check_BranchID = await periodData.check_BranchID({ BranchID: craete_period.BranchID })
        if (check_BranchID.length != 0) {
          const craete_period_branch = await periodData.craete_period(craete_period);
          res.status(200).send(JSON.stringify({ message: "success", data: craete_period_branch }));
        } else {
          res.status(400).send(JSON.stringify({ message: "unsuccess", data: "ข้อมูลสาขาที่บันทึกไม่ถูกต้อง" }));
        }
      }
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const update_period = async (req, res, next) => {
  try {
    const craete_period = req.body;
    const period_loginDateTrue = await periodData.store_check_periodForUpdate(craete_period);
    if (!period_loginDateTrue) {
      const check_assets_in_period = await periodData.check_assets_in_period(craete_period)
      if (check_assets_in_period.length != 0) {
        res.status(400).send(JSON.stringify({ message: "ไม่สามารถแก้ไขได้ เนื่องจากมีการตรวจนับทรัพย์สิน" }));
      }
      else {
        await periodData.update_period(craete_period)
        res.status(200).send(JSON.stringify({ message: "ทำการแก้ไขข้อมูลรอบตรวจนับที่ " + craete_period.PeriodID + ' เสร็จสิ้น' }));
      }
    } else {
      res.status(400).send(JSON.stringify({ message: "unsuccess", data: "มีการเปิดช่วงเวลาทับกัน", wrongPeriod: period_loginDateTrue[0].PeriodID }));
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const delete_period = async (req, res, next) => {
  try {
    const delete_period = req.body;
    const check_assets_in_period = await periodData.check_assets_in_period(delete_period)
    if (check_assets_in_period.length != 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่สามารถลบได้ เนื่องจากมีการตรวจนับทรัพย์สิน" }));
    }
    else {
      await periodData.delete_period(delete_period)
      res.status(200).send(JSON.stringify({ message: "ทำการลบข้อมูลรอบตรวจนับที่ " + delete_period.PeriodID + ' เสร็จสิ้น' }));
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const select_priod = async (req, res, next) => {
  try {
    const data = req.body;
    const call_period = await periodData.select_priod(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (call_period.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: call_period }));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}


module.exports = {
  period_login,
  getAllround_period,
  permission_branch,
  craete_period,
  update_period,
  delete_period,
  select_priod
}