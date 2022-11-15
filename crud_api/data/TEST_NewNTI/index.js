"use strict";

const utils = require("../untils");
const config = require("../../config");
const sql = require("mssql");

const NewNTI_Station_InPut = async (req) => {
  console.log(req);
  let pool = await sql.connect(config.PTEC.objcn_ops.sql);
  const sqlOueries = await utils.loadSqlOueries("TEST_NewNTI");
  const addOwner = await pool
    .request()
    .input("Name", sql.NVarChar(255), req.Name)
    .input("Tell", sql.NVarChar(15), req.Tell)
    .input("Email", sql.VarChar(30), req.Email)
    .input("Latitude", sql.VarChar(100), req.Latitude)
    .input("Longitude", sql.VarChar(100), req.Longitude)
    .input("Remark", sql.NVarChar(255), req.Remark)
    .input("Area_width", sql.Float, req.Area_width)
    .input("Area_road", sql.Float, req.Area_road)
    .input("Area_total", sql.Float, req.Area_total)
    .input("NumberArea", sql.NVarChar(255), req.NumberArea)
    .input("Owner_Name", sql.NVarChar(50), req.Owner_Name)
    .input("Owner_Tell", sql.NVarChar(50), req.Owner_Tell)
    .query(`exec NewNTI_Station_InPut @Name,@Tell,@Email,@Latitude,@Longitude,@Remark,@Area_width,@Area_road,@Area_total,@NumberArea,@Owner_Name,@Owner_Tell`);
  return addOwner.recordset;
};
module.exports = {
  NewNTI_Station_InPut,
};