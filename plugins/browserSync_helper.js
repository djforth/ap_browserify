var Bundle = require("./bundle")
 , config = require("./config")

function bundle(file, bs){
    Bundle(false, file, bs())
      .setOutput(file)
      .setFactor(config.get("factor"))
      .build(true)
}

module.exports = function(bs){
  if(config.get("separate")){
    config.get("files").forEach(function(file){
      bundle(file, bs)
    })
  } else {
    bundle(undefined, bs)
  }
}
