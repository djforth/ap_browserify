var _      = require("lodash")
  , config = require("./config");

module.exports = function(b){
  if(!_.isEmpty(config.externals)){
    _.forEach(config.externals, function(ext){
      b.external(ext);
    })
  }
}