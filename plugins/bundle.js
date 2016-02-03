var _       = require("lodash")
 , Base     = require("./base")
 , config   = require("./config")
 , excludes = require("./exclude_bundle")
 , includes = require("./include_bundle");

module.exports = function(minify){
  watch  = watch || false;
  var bundle = base(config.files, minify).addTransforms()
  var factor = false;
  var obj = {
      build:function(watch){
        if(watch){
          bundle.watch(factor)
        } else {
          bundle.build(factor)
        }
      }
    , setFactor(f){
      factor = f;
      return obj;
    }
    , setVendors:function(v){
      if(v){
        includes(bundle.getBundle());
      } else {
        excludes(bundle.getBundle());
      }

      return obj;
    }
  }

  return obj;
}
