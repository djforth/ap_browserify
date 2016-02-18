var _ = require("lodash")
  , utils  = require("@djforth/ap_utils").config
  , path        = require("path")



var defaults = {
    ext        : ['.js', ".es6.js"]
  , files      : ["components.es6.js"]
  , externals  : []
  , input      : path.resolve("app", "assets_uncompiled", "javascripts")
  , ignore     : []
  , minify     : false
  , factor     : false
  , output     : path.resolve("app", "assets", "javascripts")
  , outputFile : "main.js"
  , shared     : "common.js"
  , seperate   : false
  , required   : []
  , transforms : [
      ["babelify", {presets: ["es2015"]}]
    ]
  , vendor     : "vendor.js"
}

var config = utils(defaults, "javascripts")

// var pckage    = require(path.resolve("./package.json"));

// if(!_.isUndefined(pckage.assets)){

//   if(pckage.assets.assets_in){
//     defaults = _.defaults({input:path.join(pckage.assets.assets_in, "javascripts")}, defaults)
//   }

//   if(pckage.assets.assets_out){
//     defaults = _.defaults({output:path.join(pckage.assets.assets_out)}, defaults);
//   }

//   if(pckage.assets.javascript){
//     var js_config = _.defaults(pckage.assets.javascript, defaults);
//   }
// }

module.exports = config;
// js_config || defaults