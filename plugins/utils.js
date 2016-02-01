var _      = require("lodash")
  , config = require("./config")


var outPaths = fileRegExp(config.ext, config.output);

function fileRegExp(exts_in, output, ext){
  ext = ext || ".js"
  var ext_str  = exts_in.join("|");
  var regex    = new RegExp("("+ext_str+")$");
  var out_path = output
  return function(name){
    return path.join(out_path, name.replace(regex, ext));
  }
}

module.exports = {
  fileRegExp:fileRegExp

  , fileIn: function(input){
    var in_path= input;
    return function(file){
      return path.join(in_path, file)
    }
  }

  , setOutpaths:function(files) {
    return function(){
      return _.map(files, function(f){
        return outPaths(f);
      });
    }
  }

  ,  writeFile: function(file, minify, bs){
    var filePath = outPaths(file);
    var mini     = minify
    return function(){
      var wr = fs.createWriteStream(filePath);
      wr.on("error", function(err) {
          console.error('err', err);
        });
      wr.on("close", function(ex) {
        //Minifiy if required
        if(_.isFunction(mini)) mini(filePath);
        if(_.isFunction(bs)) bs();
      });

      return wr
    }
  }
}
