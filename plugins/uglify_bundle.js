var _        = require("lodash")
  , fs       = require('fs')
  , UglifyJS = require("uglify-js")



function uglifyScript(file){
  var result = UglifyJS.minify(file,
  { mangle: false,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      drop_console: true
    }
  });

  fs.writeFile(file.replace(".js", ".min.js"), result.code, function(err) {
      if(err) {
          return console.error(err);
      }

  });
}

module.exports = function (files){
  var outputs = utils.setOutpaths(files)();

  return function(common){
    uglifyScript(common);
    _.forEach(outputs, function(o, i){
      _.delay(function(){
        uglifyScript(o);
      }, 100*(i+1))
    })
  }

}