var _      = require("lodash")
  , config = require("./config");

module.exports = function(b){
  if(!_.isEmpty(config.externals)){
    _.forEach(config.externals, function(ext){
      var e = (ext.match(/:/)) ? ext.split(":")[1] : ext;
      b.external(e);
    })
  }
}