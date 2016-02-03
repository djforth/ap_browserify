var _          = require("lodash")
 , browserify  = require("browserify")
 , config      = require("./config")
 , concat      = require("concat-stream")
 , es          = require("event-stream")
 , folder      = require("@djforth/ap_utils").folder_helpers
 , fs          = require("fs")
 , path        = require("path")
 , Uglify      = require("./uglify_bundle")
 , utils       = require("./utils")
 , watcher     = require("./watch_bundle")


var inPaths  = utils.fileIn(config.input)
var outPaths = utils.fileRegExp(config.ext, config.output);

function bundleShare(b, fileStream) {
  b.bundle()
   .on("data", function(err){
    if(err.message)
      console.log(err.toString());
      // this.close();
    })
   .pipe(fileStream());
}


module.exports = function(files, minify){
  minify = minify || false;

  var fileStream;

  var inputs = _.map(files, function(f){
    return inPaths(f);
  })

  var output = utils.setOutpaths(files, minify);
  var uglify = (minify) ? Uglify(files) :  null;

  var bundle = browserify({entries:inputs, extensions:config.ext, debug:true, cache: {}, packageCache: {}})
  if(!_.isEmpty(config.ignore)){
    _.forEach(config.ignore, function(ig){
      bundle.ignore(ig)
    })
  }
  var obj = {
    addTransforms:function(){
      _.forEach(config.transforms, function(t){
        if(_.isArray(t)){
          bundle.transform(t[0], t[1]);
        } else {
          bundle.transform(t)
        }

      })

      return obj;
    }
    , build:function(factor){
      if(_.isUndefined(fileStream)) return;
      if(factor){
        bundle.plugin("factor-bundle", { outputs:output() });
      }

      bundleShare(bundle, fileStream);
    }
    , getBundle:function(){return bundle;}
    , setFileStream:function(name, server){
      if(_.isUndefined(fileStream)){
        fileStream = utils.writeFile(name, uglify, server);
      }

      return obj;
    }
    , watch:function(factor){
      if(_.isUndefined(fileStream)) return;
      var w = watcher(bundle, bundleShare);
      if(factor) w.addFactorBundle(output)
      w.startWatching(fileStream)
    }

  }

  return obj;

}