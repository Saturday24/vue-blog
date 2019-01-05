var express = require('express');
var app = express();
var fs = require('fs');
var cp = require('child_process');
var path = require('path');

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});

// 遍历获取markdown文件夹
// cp.exec('cp -r ./markdown/test.md ./markdown/cp.md');
var md_name = [];
var md_ctx = [];
fs.readdir('./markdown/', (err, files) => {
	for(let i = 0; i < files.length; i++) {
		let fileName = path.parse(files[i])['name'].toString();
		let idx = fileName.indexOf('&');
		md_name.push(fileName.substr(0,idx));
		md_ctx.push({
			time: fileName.substr(0,idx),
			desc: 'This is the description!',
			title: fileName.substr(idx+1,fileName.length),
			who: 'me'
		});
		mdList(md_name, md_ctx);
		mdTxt(fileName.substr(0,idx), fileName);
	}
});

// md_list
function mdList(md_name, md_ctx) {
	app.get('/mdlist', (req,res) => {
		res.json({list: md_name, md_ctx});
	});
}

// // generate api
function mdTxt (file, path) {
	app.get('/md/' + file, function (req,res) {
		res.sendfile('./markdown/' + path + '.md');
	});
}

// // 监听3001端口
var server = app.listen(3001);
console.log('http://localhost:3001/md');

