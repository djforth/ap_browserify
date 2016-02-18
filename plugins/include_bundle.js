var _      = require("lodash")
  , config = require("./config");

module.exports = function(b){
  var included = config.get("externals").concat(config.get("required"))
  if(!_.isEmpty(included)){
    _.forEach(included, function(ext){
      if(ext.match(/:/)){
        var e = ext.split(":");
        b.require(e[0], {expose:e[1]})
      } else {
        b.require(ext);
      }

    })
  }
}