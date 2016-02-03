var _ = require("lodash")
  , path        = require("path")


function setPaths(key, def){
  return function(path, obj){
    obj[key] =(_.isUndefined(path)) ? def : path;
    return obj;
  }
}

var defaults = {
    ext        : ['.js', ".es6.js"]
  , files      : ["components.es6.js"]
  , externals  : []
  , input      : path.join("app", "assets_uncompiled", "javascripts")
  , ignore     : []
  , output     : path.join("app", "assets", "javascripts")
  , outputFile : "main.js"
  , shared     : "common.js"
  , transforms : [
      ["babelify", {presets: ["es2015"]}]
    ]
  , vendor     : "vendor.js"
}

var pckage    = require(path.resolve("./package.json"));

if(!_.isUndefined(pckage.assets)){

  if(pckage.assets.assets_in){
    defaults = _.defaults({input:path.join(pckage.assets.assets_in, "javascripts")}, defaults)
  }

  if(pckage.assets.assets_out){
    defaults = _.defaults({output:path.join(pckage.assets.assets_out)}, defaults);
  }

  if(pckage.assets.javascript){
    var js_config = _.defaults(pckage.assets.javascript, defaults);
  }
}

module.exports = js_config || defaults