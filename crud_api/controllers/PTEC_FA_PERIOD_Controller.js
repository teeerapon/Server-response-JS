'use strict';

const query_fa_control_period = require('../PTEC_DATA/query_fa_control_period');

const period_login = async (req, res, next) => {
  try {
    const period_loginData = req.body;
    const period_loginDateTrue = await query_fa_control_period.period_login(period_loginData);
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
    const all_period = await query_fa_control_period.getsperiod_round(period_loginData);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(all_period);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const permission_branch = async (req, res, next) => {
  try {
    const permission_branch = req.body;
    const period_login_permission_branch = await query_fa_control_period.fa_permission_branch(permission_branch);
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
    const period_loginDateTrue = await query_fa_control_period.period_login(craete_period);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (craete_period.BranchID == 0) {
      const craete_period_branch = await query_fa_control_period.craete_period(craete_period);
      res.status(200).send(JSON.stringify({ message: "success", data: craete_period_branch }));
    } else {
      const check_BranchID = await query_fa_control_period.check_BranchID({ BranchID: craete_period.BranchID })
      if (check_BranchID.length != 0) {
        const craete_period_branch = await query_fa_control_period.craete_period(craete_period);
        res.status(200).send(JSON.stringify({ message: "success", data: craete_period_branch }));
      } else {
        res.status(400).send(JSON.stringify({ message: "unsuccess", data: "ข้อมูลสาขาที่บันทึกไม่ถูกต้อง" }));
      }
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const update_period = async (req, res, next) => {
  try {
    const craete_period = req.body;
    await query_fa_control_period.update_period(craete_period)
    res.status(200).send(JSON.stringify({ message: "ทำการแก้ไขข้อมูลรอบตรวจนับที่ " + craete_period.PeriodID + ' เสร็จสิ้น' }));
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const delete_period = async (req, res, next) => {
  try {
    const delete_period = req.body;
    const check_assets_in_period = await query_fa_control_period.check_assets_in_period(delete_period)
    if (check_assets_in_period.length != 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่สามารถลบได้ เนื่องจากมีการตรวจนับทรัพย์สิน" }));
    }
    else {
      await query_fa_control_period.delete_period(delete_period)
      res.status(200).send(JSON.stringify({ message: "ทำการลบข้อมูลรอบตรวจนับที่ " + delete_period.PeriodID + ' เสร็จสิ้น' }));
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const select_priod = async (req, res, next) => {
  try {
    const data = req.body;
    const call_period = await query_fa_control_period.select_priod(data);
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

const round_website = async (req, res, next) => {
  try {
    const period_loginData = req.body;
    const all_period = await query_fa_control_period.round_website(period_loginData);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(all_period);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const FA_Period_GroupBy = async (req, res, next) => {
  try {
    const all_period = await query_fa_control_period.FA_Period_GroupBy();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(all_period);
  } catch (error) {
    res.status(400).send(error.message);
  }
}


module.exports = {
  period_login,
  getAllround_period,
  permission_branch,
  craete_period,
  update_period,
  delete_period,
  select_priod,
  round_website,
  FA_Period_GroupBy
}