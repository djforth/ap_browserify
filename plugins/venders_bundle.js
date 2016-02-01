var _       = require("lodash")
 , Base     = require("./base")
 , config   = require("./config")
 , includes = require("./includes_bundle");

module.exports = function(files, minify, watch, factor){
  watch  = watch || false;
  var bundle = base(files, minify).addTransforms()
  includes(bundle.getBundle());

  if(watch){
    bundle.watch(factor)
  } else {
    bundle.build(factor)
  }
}