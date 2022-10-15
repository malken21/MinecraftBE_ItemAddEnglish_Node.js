const fs = require('fs');

const Config = require("./Config.json");

//langディレクトリがなかったら 追加
if (!fs.existsSync("./lang")) fs.mkdirSync("./lang");
//resultディレクトリがなかったら 追加
if (!fs.existsSync("./result")) fs.mkdirSync("./result");

const files = fs.readdirSync("./lang");

const add = load(`./lang/${Config.add}`);

console.log(`add ${Config.add}`);

files.forEach(file => {//全ての言語が終わるまで繰り返す
    if (file == Config.add) return;
    console.log(`load ${file}`);

    const main = langAdd(load(`./lang/${file}`), add);
    save(`./result/${file}`, main);
})


function langAdd(main, add) {// 後ろに別言語追加 関数

    let result = {};

    const keys = Object.keys(main);
    for (const key of keys) {
        const text = main[key] + Config.space + add[key];
        result[key] = text;
    }
    return result;
}


function load(path) {//langファイル読み込み 関数
    let obj = {};
    fs.readFileSync(path).toString().split(/\r\n|\n/).map(item => {
        if (item.startsWith("tile.") || item.startsWith("item.")) {
            item = item.replace(/\s\#/g, '').split(/=/);
            obj[item[0]] = item[1];
        }
    });
    return obj;
}

function save(path, data) {//langファイル保存 関数
    const keys = Object.keys(data);
    let lang = "";
    keys.forEach(key => {
        lang = `${lang}${key}=${data[key]}\n`
    });
    fs.writeFile(path, lang, (err) => {
        if (err) {
            console.log(`error ${path}`)
            throw err
        } else {
            console.log(`save ${path}`)
        }
    });
}