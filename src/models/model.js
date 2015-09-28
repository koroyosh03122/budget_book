var fs = require('fs');
var path = require('path');
var myfile = path.basename(__filename).replace(".js", "");

fs.readdirSync(__dirname).forEach(function(file) {
  var file = file.replace(".js", "");
  if (myfile !== file){
    module.exports[file] = require(__dirname + '/' + file);
  }
});
