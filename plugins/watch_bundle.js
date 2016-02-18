var watchify    = require("watchify");

module.exports = function(b, bundleShare){
  var w = watchify(b);

  var obj = {
    addFactorBundle:function(output){
      w.plugin("factor-bundle", { outputs:output() });
      return obj;
    }
    , startWatching:function(fileStream){
       w.on("update", function(d){
        bundleShare(w, fileStream);
      });
    }
  }

  return obj;
}
