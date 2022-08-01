'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER} = process.env;

const sqlEncrypt = process.env.ENCRYPT === "true";

assert(PORT, 'PORT is required');
assert(HOST, 'HPST is required');

module.exports = {
    port: PORT,
    HOST : HOST,
    HOST_URL : HOST_URL,
    sql : {
        server : SQL_SERVER,
        database : SQL_DATABASE,
        user : SQL_USER,
        password : SQL_PASSWORD,
        options : {
            encrypt : sqlEncrypt,
            enableArithAbort : true,
            trustedconnection : true,
        }
    }

}