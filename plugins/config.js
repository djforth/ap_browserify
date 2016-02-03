var _ = require("lodash")
  , path        = require("path")


function setPaths(key, def){
  return function(path, obj){
    obj[key] =(_.isUndefined(path)) ? def : path;
    return obj;
  }
}

var defaults = {
    ext       : ['.js', ".es6.js"]
  , files     : ["components.es6.js"]
  , externals : []
  , input     : path.join("app", "assets_uncompiled", "javascripts")
  , ignore    : []
  , output    : path.join("app", "assets", "javascripts")
  , shared    : "common.js"
  , transforms: {transform:"babelify", options:{presets: ["es2015"]}}
}



if(!_.isUndefined(process.env.npm_package_assets)){

  if(process.env.npm_package_assets.assets_in){
    defaults = _.defaults(defaults, {input:path.join(process.env.npm_package_assets.assets_in, "javascripts")})
  }

  if(process.env.npm_package_assets.assets_out){
    defaults = _.defaults(defaults, {output:path.join(process.env.npm_package_assets.assets_out)});
  }

  if(process.env.npm_package_assets.javascript){
    var js_config = _.defaults(defaults,process.env.npm_package_assets.javascript);
  }
}



console.log("FOOOOO >>>>", js_config)

module.exports = js_config || defaults