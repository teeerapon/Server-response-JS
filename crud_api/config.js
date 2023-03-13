'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const { PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER } = process.env;

const sqlEncrypt = process.env.ENCRYPT === "true";

assert(PORT, 'PORT is required');
assert(HOST, 'HPST is required');


const PTEC = {
  port: PORT,
  HOST: HOST,
  HOST_URL: HOST_URL,
  object_ptec_ops: {
    sql: {
      server: SQL_SERVER,
      database: "PTEC_OPS",
      user: SQL_USER,
      password: SQL_PASSWORD,
      options: {
        encrypt: sqlEncrypt,
        enableArithAbort: true,
        trustedconnection: true,
      },
    },
  },
  objcn_usersright: {
    sql: {
      server: SQL_SERVER,
      database: "PTEC_USERSRIGHT",
      user: SQL_USER,
      password: SQL_PASSWORD,
      options: {
        encrypt: sqlEncrypt,
        enableArithAbort: true,
        trustedconnection: true,
      },
    },
  },
  object_test_ops: {
    sql: {
      server: SQL_SERVER,
      database: "TEST_OPS",
      user: SQL_USER,
      password: SQL_PASSWORD,
      options: {
        encrypt: sqlEncrypt,
        enableArithAbort: true,
        trustedconnection: true,
      },
    },
  },
  objcn_pdpa: {
    sql: {
      server: SQL_SERVER,
      database: "TEST_PDPA",
      user: SQL_USER,
      password: SQL_PASSWORD,
      options: {
        encrypt: sqlEncrypt,
        enableArithAbort: true,
        trustedconnection: true,
      },
    },
  },
};

module.exports = {
  PTEC
}