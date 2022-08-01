'use strict';

const utils = require('../untils');
const config = require('../../config');
const sql = require('mssql');



const getsUser = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlOueries = await utils.loadSqlOueries('users');
        const list = await pool.request().query(sqlOueries.userslist);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getById = async (UserCode) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlOueries = await utils.loadSqlOueries('users');
        const oneUser = await pool.request()
                        .input('UserCode', sql.VarChar(10), UserCode)
                        .query(sqlOueries.usersbylD);
        return oneUser.recordset;
    } catch (error) {
        return error.message;
    }
}

const getByEmailAndCode = async (loginuser) => {
    // console.log(loginuser);
    try {
        let pool = await sql.connect(config.sql);
        const sqlOueries = await utils.loadSqlOueries('users');
        const login = await pool.request()
                        // .input('UserID', sql.BigInt, loginuser.UserID)
                        .input('UserCode', sql.VarChar(20), loginuser.UserCode)
                        // .input('BranchID', sql.Int, loginuser.BranchID)
                        // .input('Email', sql.VarChar(50), loginuser.Email)
                        .input('Password' ,sql.VarChar(20), loginuser.Password)
                        .query(sqlOueries.User_Login);
        return login.recordset;
    } catch (error) {
        return error.message;
    }
}

const createUser = async (userData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlOueries = await utils.loadSqlOueries('users');
        const insertUser = await pool.request()
                        .input('UserID', sql.BigInt, userData.UserID)
                        .input('UserCode', sql.VarChar(10), userData.UserCode)
                        .input('Name', sql.VarChar(100), userData.Name)
                        .input('BranchID', sql.Int, userData.BranchID)
                        .input('DepID', sql.Int, userData.DepID)
                        .input('SecID', sql.Int, userData.SecID)
                        .input('PositionID', sql.Int, userData.PositionID)
                        .input('Password', sql.VarBinary(50), userData.Password)
                        .input('Email', sql.VarChar(50), userData.Email)
                        .input('Tel', sql.VarChar(50), userData.Tel)
                        .input('Actived', sql.Bit, userData.Actived)
                        .query(sqlOueries.createUser);
        return insertUser.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateUser = async (UserID,userData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlOueries = await utils.loadSqlOueries('users');
        const update = await pool.request()
                        .input('UserID', sql.BigInt, UserID)
                        .input('UserCode', sql.VarChar(10), userData.UserCode)
                        .input('Name', sql.VarChar(100), userData.Name)
                        .input('BranchID', sql.Int, userData.BranchID)
                        .input('DepID', sql.Int, userData.DepID)
                        .input('SecID', sql.Int, userData.SecID)
                        .input('PositionID', sql.Int, userData.PositionID)
                        .input('Password', sql.VarBinary(50), userData.Password)
                        .input('Email', sql.VarChar(50), userData.Email)
                        .input('Tel', sql.VarChar(50), userData.Tel)
                        .input('Actived', sql.Bit, userData.Actived)
                        .query(sqlOueries.updateUser);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteUser = async (UserID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlOueries = await utils.loadSqlOueries('users');
        const deleted = await pool.request()
                        .input('UserID', sql.BigInt, UserID)
                        .query(sqlOueries.deleteUser);
        return deleted.recordset;
    } catch (error) {
        return error.message;
    }
}


// Control Assets
const AutoDeapartMent = async (autoDeapartMent) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlOueries = await utils.loadSqlOueries('users');
        const auto_DeapartMent = await pool.request()
                        .input('UserCode', sql.VarChar(10), autoDeapartMent.UserCode)
                        .query(sqlOueries.FA_Control_select_value);
        return auto_DeapartMent.recordset;
    } catch (error) {
        return error.message;
    }
}

const ChackUserWeb = async (UserWeb) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlOueries = await utils.loadSqlOueries('users');
        const auto_DeapartMent = await pool.request()
                        .input('usercode', sql.VarChar(10), UserWeb.usercode)
                        .query(sqlOueries.chackUserWeb);
        return auto_DeapartMent.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getsUser,
    getById,
    createUser,
    updateUser,
    deleteUser,
    getByEmailAndCode,
    AutoDeapartMent,
    ChackUserWeb
}