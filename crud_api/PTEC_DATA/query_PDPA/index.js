"use strict";

const Ropa_addCollection = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const addOwner = await pool
    .request()
    .input("ropauserid", sql.BigInt, req.ropauserid)
    .input("ropacollectionid", sql.BigInt, req.ropacollectionid)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_addCollection] @ropauserid,@ropacollectionid,@user`);
  //sql.close()
  return addOwner.recordset;
};

const Ropa_addOwner = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid)
    .input("ownercode", sql.VarChar(20), req.ownercode)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_addOwner] @ropaid,@ownercode,@user`);

  //sql.close()
  return addOwner.recordset;
};

const Ropa_addPermissionAccess = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid)
    .input("acecode", sql.VarChar(20), req.acecode)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_addPermissionAccess] @ropaid,@acecode,@user`);

  //sql.close()
  return addOwner.recordset;
};

const Ropa_addType = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid)
    .input("typeid", sql.BigInt, req.typeid ?? 0)
    .input("typename", sql.NVarChar(255), req.typename ?? '')
    .input("user", sql.VarChar(20), req.user)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_addType] @ropaid,@typeid,@typename,@user`);
  //sql.close()
  return addOwner.recordset;
};

const Ropa_CollectionSave = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  // console.log(req.namecollection);
  
  const addOwner = await pool
    .request()
    .input("namecollection", sql.NVarChar(255), req.namecollection)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_CollectionSave] @namecollection,@user`);

  //sql.close()
  return addOwner.recordset;
};

const Ropa_removeOwner = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  // console.log(req.namecollection);
  
  const addOwner = await pool
    .request()
    .input("ropaid", sql.Int, req.ropaid)
    .input("ropaownerCode", sql.VarChar(10), req.ropaownerCode)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_removeOwner] @ropaid,@ropaownerCode,@user`);

  //sql.close()
  return addOwner.recordset;
};

const Ropa_removePermissionAccess = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  // console.log(req.namecollection);
  const addOwner = await pool
    .request()
    .input("ropaid", sql.Int, req.ropaid)
    .input("permissionaccessCode", sql.VarChar(20), req.permissionaccessCode)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_removePermissionAccess] @ropaid,@permissionaccessCode,@user`);

  //sql.close()
  return addOwner.recordset;
};

const Ropa_removeType = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  // console.log(req.namecollection);
  
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid)
    .input("ropa_type", sql.NVarChar(200), req.ropa_type)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_removeType] @ropaid,@ropa_type,@user`);

  //sql.close()
  return addOwner.recordset;
};

const Ropa_Save = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  // console.log(req);
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid ?? 0)
    .input("depcode", sql.VarChar(20), req.depcode)
    .input("name", sql.NVarChar(255), req.name)
    .input("target", sql.NVarChar(255), req.target)
    .input("collectiontype", sql.VarChar(5), req.collectiontype)
    .input("step", sql.NVarChar(255), req.step)
    .input("lastreview", sql.NVarChar, req.lastreview ?? null)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_Save] @ropaid,@depcode,@name,@target,@collectiontype,@step,@lastreview,@user`);

  //sql.close()
  return addOwner.recordset;
};

const Ropa_Close_Save = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  // console.log(req);
  
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid ?? 0)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_Close_Save] @ropaid`);

  //sql.close()
  return addOwner.recordset;
};

const Ropa_TypeSave = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  // console.log(`req.typename ${req.typename}`);
  // console.log(`req.user ${req.user}`);
  const addOwner = await pool
    .request()
    .input("typename", sql.NVarChar(255), req.typename)
    .input("user", sql.VarChar(20), req.user)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_TypeSave] @typename,@user`);

  //sql.close()
  return addOwner.recordset;
};

const Ropa_UserSave = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  // console.log(req);
  const addOwner = await pool
    .request()
    .input("ropauserid", sql.BigInt, req.ropauserid ?? 0)
    .input("ropaid", sql.BigInt, req.ropaid)
    .input("name", sql.NVarChar(255), req.name)
    .input("consentdate", sql.NVarChar, req.consentdate ?? null)
    .input("collectiondate", sql.NVarChar, req.collectiondate ?? null)
    .input("remark", sql.NVarChar(255), req.remark)
    .input("user", sql.VarChar(20), req.user)
    .input("active", sql.Bit, parseInt(req.active))
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_UserSave] @ropauserid,@ropaid,@name,@consentdate,@collectiondate,@remark,@user,@active`);
  //sql.close()
  return addOwner.recordset;
};

const Ropa_List = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const addOwner = await pool.request().query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_List]`);
  //sql.close()
  return addOwner.recordset;
};

const Ropa_List_By_ID = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const addOwner = await pool
    .request()
    .input("RopaType_ID", sql.BigInt, req.RopaType_ID)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[RopaType_List_By_ID] @RopaType_ID`);

  //sql.close()
  return addOwner.recordset;
};

const Ropa_List_User = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const addOwner = await pool
    .request()
    .input("ropaid", sql.BigInt, req.ropaid)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_List_User] @ropaid`);

  //sql.close()
  return addOwner.recordset;
};

const Ropa_List_Dep = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const addOwner = await pool.request().query(`SELECT [DepCode] FROM [PTEC_USERSRIGHT].[dbo].[Department]`);
  //sql.close()
  return addOwner.recordset;
};

const Ropa_List_Collection = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const addOwner = await pool
    .request()
    .input("ropauserid", sql.Int, req.ropauserid)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_List_Collection] @ropauserid`);
  //sql.close()
  return addOwner.recordset;
};

const Ropa_SetActive_User = async (req) => {
  const sql = require("mssql");
  const config = require('../../config');
  let pool = await sql.connect(config.PTEC.objcn_pdpa.sql);
  const addOwner = await pool
    .request()
    .input("ropaid", sql.Int, req.ropaid)
    .input("ropauserid", sql.Int, req.ropauserid)
    .query(`exec [${config.PTEC.objcn_pdpa.sql.database}].[dbo].[Ropa_SetActive_User] @ropaid, @ropauserid`);
  //sql.close()
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
