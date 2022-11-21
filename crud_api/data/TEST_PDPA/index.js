"use strict";

const utils = require("../untils");

const Ropa_addCollection = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("ropauserid", sql.BigInt, req.ropauserid)
    .input("ropacollectionid", sql.BigInt, req.ropacollectionid)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec Ropa_addCollection @ropauserid,@ropacollectionid,@user`);

  return addOwner.recordset;
};

const Ropa_addOwner = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid)
    .input("ownercode", sql.VarChar(20), req.ownercode)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec Ropa_addOwner @ropaid,@ownercode,@user`);

  return addOwner.recordset;
};

const Ropa_addPermissionAccess = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid)
    .input("acecode", sql.VarChar(20), req.acecode)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec Ropa_addPermissionAccess @ropaid,@acecode,@user`);

  return addOwner.recordset;
};

const Ropa_addType = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid)
    .input("typeid", sql.BigInt, req.typeid ?? 0)
    .input("typename", sql.NVarChar(255), req.typename ?? '')
    .input("user", sql.VarChar(20), req.user)
    .query(`exec Ropa_addType @ropaid,@typeid,@typename,@user`);

  return addOwner.recordset;
};

const Ropa_CollectionSave = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  console.log(req.namecollection);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("namecollection", sql.NVarChar(255), req.namecollection)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec Ropa_CollectionSave @namecollection,@user`);

  return addOwner.recordset;
};

const Ropa_removeOwner = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  console.log(req.namecollection);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("ropaid", sql.Int, req.ropaid)
    .input("ropaownerCode", sql.VarChar(10), req.ropaownerCode)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec Ropa_removeOwner @ropaid,@ropaownerCode,@user`);

  return addOwner.recordset;
};

const Ropa_removePermissionAccess = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  console.log(req.namecollection);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("ropaid", sql.Int, req.ropaid)
    .input("permissionaccessCode", sql.VarChar(20), req.permissionaccessCode)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec Ropa_removePermissionAccess @ropaid,@permissionaccessCode,@user`);

  return addOwner.recordset;
};

const Ropa_removeType = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  console.log(req.namecollection);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid)
    .input("ropa_type", sql.NVarChar(200), req.ropa_type)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec Ropa_removeType @ropaid,@ropa_type,@user`);

  return addOwner.recordset;
};

const Ropa_Save = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  console.log(req);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid ?? 0)
    .input("depcode", sql.VarChar(20), req.depcode)
    .input("name", sql.NVarChar(255), req.name)
    .input("target", sql.NVarChar(255), req.target)
    .input("collectiontype", sql.VarChar(5), req.collectiontype)
    .input("step", sql.NVarChar(255), req.step)
    .input("lastreview", sql.DateTime, req.lastreview ?? null)
    .input("user", sql.VarChar(20), req.user)
    .query(
      `exec Ropa_Save @ropaid,@depcode,@name,@target,@collectiontype,@step,@lastreview,@user`
    );

  return addOwner.recordset;
};

const Ropa_Close_Save = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  console.log(req);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid ?? 0)
    .query(
      `exec Ropa_Close_Save @ropaid`
    );

  return addOwner.recordset;
};

const Ropa_TypeSave = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  console.log(`req.typename ${req.typename}`);
  console.log(`req.user ${req.user}`);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("typename", sql.NVarChar(255), req.typename)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec Ropa_TypeSave @typename,@user`);

  return addOwner.recordset;
};

const Ropa_UserSave = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  console.log(req);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("ropauserid", sql.BigInt, req.ropauserid ?? 0)
    .input("ropaid", sql.BigInt, req.ropaid)
    .input("name", sql.NVarChar(255), req.name)
    .input("consentdate", sql.DateTime, req.consentdate ?? null)
    .input("collectiondate", sql.DateTime, req.collectiondate ?? null)
    .input("remark", sql.NVarChar(255), req.remark)
    .input("user", sql.VarChar(20), req.user)
    .input("active", sql.Bit, parseInt(req.active))
    .query(
      `exec Ropa_UserSave @ropauserid,@ropaid,@name,@consentdate,@collectiondate,@remark,@user,@active`
    );

  return addOwner.recordset;
};

const Ropa_List = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool.request().query(`exec Ropa_List`);

  return addOwner.recordset;
};

const Ropa_List_By_ID = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("RopaType_ID", sql.BigInt, req.RopaType_ID)
    .query(
      `exec RopaType_List_By_ID @RopaType_ID`
    );

  return addOwner.recordset;
};

const Ropa_List_User = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid)
    .query(
      `exec Ropa_List_User @ropaid`
    );

  return addOwner.recordset;
};

const Ropa_List_Dep = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool.request().query(`SELECT [DepCode] FROM [PTEC_USERSRIGHT].[dbo].[Department]`);

  return addOwner.recordset;
};

const Ropa_List_Collection = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("ropauserid", sql.Int, req.ropauserid)
    .query(
      `exec [Ropa_List_Collection] @ropauserid`
    );

  return addOwner.recordset;
};

const Ropa_SetActive_User = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const sqlOueries = await utils.loadSqlOueries("TEST_PDPA");
  const addOwner = await pool
    .request()
    .input("ropaid", sql.Int, req.ropaid)
    .input("ropauserid", sql.Int, req.ropauserid)
    .query(
      `exec [Ropa_SetActive_User] @ropaid, @ropauserid`
    );

  return addOwner.recordset;
};

module.exports = {
  Ropa_addCollection,
  Ropa_addOwner,
  Ropa_addPermissionAccess,
  Ropa_addType,
  Ropa_CollectionSave,
  Ropa_removeOwner,
  Ropa_removePermissionAccess,
  Ropa_removeType,
  Ropa_Save,
  Ropa_Close_Save,
  Ropa_TypeSave,
  Ropa_UserSave,
  Ropa_List,
  Ropa_List_Collection,
  Ropa_List_User,
  Ropa_List_By_ID,
  Ropa_List_Dep,
  Ropa_SetActive_User
};
