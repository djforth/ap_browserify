var _      = require("lodash")
  , config = require("./config");

module.exports = function(b){
  if(!_.isEmpty(config.externals)){
    _.forEach(config.externals, function(ext){
      if(ext.match(/:/)){
        var e = ext.split(":");
        b.require(e[0], {expose:e[1]})
      } else {
        b.require(ext);
      }

    })
  }
}