var fs = require('fs');
var path = require('path');
var myfile = path.basename(__filename).replace(".js", "");

// このファイルが置かれているフォルダパス
fs.readdirSync(__dirname).forEach(function(file) {
  // .js を除き、keyにする
  var file = file.replace(".js", "");
  if (myfile !== file){
    module.exports[file] = require(__dirname + '/' + file);
    // console.log(__dirname + '/' + file);
  }
});
