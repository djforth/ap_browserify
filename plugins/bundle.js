var _       = require("lodash")
 , Base     = require("./base")
 , config   = require("./config")
 , excludes = require("./exclude_bundle")
 , includes = require("./include_bundle");

module.exports = function(minify, vendor, server){
  // watch  = watch || false;
  var files = (vendor) ? [] : config.files
  var bundle = Base(files, minify)
                .addTransforms()

  var factor = false;
  var obj = {
      build:function(watch){
        bundle.setFileStream(config.outputFile, server)

        if(watch){
          bundle.watch(factor)
        } else {
          bundle.build(factor)
        }
      }
    , setFactor(f){
      factor = f;
      if(factor) bundle.setFileStream(config.shared, server)
      return obj;
    }
    , setVendors:function(v){
      if(v){
        bundle.setFileStream(config.vendor, server)
        includes(bundle.getBundle());
      } else {
        excludes(bundle.getBundle());
      }

      return obj;
    }
  }

  return obj;
}
