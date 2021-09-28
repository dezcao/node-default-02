const fs = require('fs');
const path = require('path');
const xmldoc = require('./xmldoc_2.2.3.js');

const util = require('util');
const readFile = util.promisify(fs.readFile);

let STR = async (fileName, sqlId, queryParam) => {
    let xmlFileString = await readFile(`${process.env.ROOT}/database/sql/${fileName}`, 'utf8');
    return await xmldoc.queryParser(xmlFileString, sqlId, queryParam);
};

let EXECUTE_DEFUALT = async (fileName, sqlId, queryParam, conn) => {
    let query = await STR(fileName, sqlId, queryParam);
    console.log(query);
    return await conn.query(query, queryParam); // [rows, fields]
};

let EXECUTE = async (fileName, sqlId, queryParam, conn) => {
    let [rows] = await EXECUTE_DEFUALT(fileName, sqlId, queryParam, conn);
    // let [rows, fields] = await EXECUTE_DEFUALT(fileName, sqlId, queryParam, conn);
    return rows;
};

/**
 * @description 쿼리 자체는 같다는 가정하에 쿼리문 파싱을 한번만 하기위해 존재하는 함수입니다.
 * @param {*} fileName 
 * @param {*} sqlId 
 * @param {*} paramArray
 * @param {*} conn 
 */
let EXECUTE_ARRAY = async (fileName, sqlId, paramArray, conn) => {
    let query = await STR(fileName, sqlId, paramArray[0]);
    let result = [];
    for (var i = 0; i < paramArray.length; i++) {
        let queryParam = paramArray[i];
        // let [rows, fields] = await conn.query(query, queryParam);;
        let [rows] = await conn.query(query, queryParam);
        result.push(rows);
    }
    return result;
};

exports.STR = STR;
exports.EXECUTE_DEFUALT = EXECUTE_DEFUALT;
exports.EXECUTE = EXECUTE;
exports.EXECUTE_ARRAY = EXECUTE_ARRAY;
