#!/usr/bin/env zx
$.verbose = false;
const path = require("path");

// 1,2番目はnodeとzxのパスのため、3番目の引数以降を取り出す
const args = process.argv.slice(3);

// 日付取得
const today = (await $`date "+%Y%m%d"`).stdout.trim();

// ファイルの作成
var filePath = "";
switch (args[0]) {
  case "article":
    // articleファイルの作成
    var result = (await $`zenn new:article`).stdout.trim();
    // 作成したファイル名の取得
    filePath = result.match(/articles\/.*\.md/)[0];
    break;

  case "book":
    // bookフォルダとファイルの作成
    var result = (await $`zenn new:book`).stdout.trim();
    // 作成したフォルダ名の取得
    filePath = result.match(/books\/.*(?=\/)/)[0];
    break;

  default:
    // 引数が不正の場合は例外をスロー
    throw "error: invalid arguments.";
}

// 日付付きslugの生成
let { dir, base: fileName } = path.parse(filePath);
let newPath = `${dir}/${today}-${fileName}`;

// ファイルのリネーム
$`mv ${filePath} ${newPath}`;

var green = '\x1B[32m';
var reset = '\x1B[39m';
console.log("created: " + green + newPath + reset);
