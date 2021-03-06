var _       = require("lodash")
 , Base     = require("./base")
 , config   = require("./config")
 , excludes = require("./exclude_bundle")
 , includes = require("./include_bundle");

module.exports = function(minify, input, server){
  // watch  = watch || false;
  var files = (_.isUndefined(input)) ? config.get("files") : input;
  files = (_.isArray(files)) ? files : [files];

  var bundle = Base(files, minify)
                .addTransforms()

  var factor = false;
  var obj = {
      build:function(watch){
        bundle.setFileStream(config.get("outputFile"), server)

        if(watch){
          bundle.watch(factor)
        } else {
          bundle.build(factor)
        }
      }
    , setFactor(f){
      factor = f;
      if(factor) bundle.setFileStream(config.get("shared"), server)
      return obj;
    }
    , setOutput(output){
      if(output){
        bundle.setFileStream(output, server);
      }

       return obj;
    }
    , setVendors:function(v){
      if(v){
        bundle.setFileStream(config.get("vendor"), server)
        includes(bundle.getBundle());
      } else {
        excludes(bundle.getBundle());
      }

      return obj;
    }
  }

  return obj;
}
