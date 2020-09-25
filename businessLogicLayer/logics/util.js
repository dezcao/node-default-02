/**
  Copyright (c) 2019 asdaisy
  Licensed under the Apache License, Version 2.0 (the “License”)
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at asdaisy@hanmail.net
  */
const path = require('path');
const chars = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'];
const numbers = [...'0123456789'];
const crypto = require('crypto');
const s3 = require(path.join(process.env.ROOT, '/middleware/s3'));
var multer  = require('multer');
var multerS3 = require('multer-s3');

function randomStr(strLength) {
    return [...Array(strLength)]
        .map(() => chars[Math.trunc(Math.random() * chars.length)])
        .join('');
}

function uid(prefix, strLength = 6) {
    const now = String(Date.now());
    const middlePos = Math.ceil(now.length / 2);
    let output = `${now.substr(0, middlePos)}-${randomStr(strLength)}-${now.substr(middlePos)}`;
    if (prefix) output = `${prefix}-${output}`;
    return output;
}

function VPageUtils(totalCount = 0, reqPage = 1, pagePerNum = 5) {
    let totalPages = Number(totalCount);
    let requestPage = Number(reqPage);
    let perNumber = Number(pagePerNum);
    let startRow = requestPage > 1 ? (requestPage * perNumber - perNumber) : 0;
    let page_total = Math.ceil(totalPages / perNumber); // 바닥에 깔리는 페이지 넘버링의 갯수를 의미
    return { start_rownum: Number(startRow), page_per_num: perNumber, currentPage: requestPage, page_total, rows: totalPages }
}

function getAccessToken(str) {
    return crypto.createHash('sha512').update(`${process.env.TOKEN_STR}${Date.now()}${str}`).digest('base64');
}

function pagination(page = 1, get_count = 10) {
    let start_row = (Number(page)-1)*Number(get_count);
    return [start_row, get_count];
}

function s3RollBack (req) {
    let files = req.files;
    if (files) {
        for (var i = 0; i < files.length; i++) {
            let file = files[i];
            let params = {
                Bucket: file.bucket,
                Key: file.key
            };
        
            s3.deleteObject(params, function (err, data) {
                if (err) console.log(err, err.stack);
                else console.log(data);
            });
        }
    }
}

exports.uid = uid;
exports.VPageUtils = VPageUtils;
exports.getAccessToken = getAccessToken;
exports.pagination = pagination;
exports.s3RollBack = s3RollBack;
