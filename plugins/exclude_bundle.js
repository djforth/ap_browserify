var _      = require("lodash")
  , config = require("./config");

module.exports = function(b){
  var externals = config.get("externals")
  if(!_.isEmpty(externals){
    _.forEach(externals, function(ext){
      var e = (ext.match(/:/)) ? ext.split(":")[1] : ext;
      b.external(e);
    })
  }
}