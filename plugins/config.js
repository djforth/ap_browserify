
var assets_in   = npm_package_assets.assets_in || path.join("app", "assets_uncompiled", "assets");
var assets_out  = npm_package_assets.assets_out || path.join("/", "public", "assets");
assets_out = path.join(assets_out)

var js = npm_package_assets.javascript;

module.exports = {
    ext       : js.ext || ['.js', ".es6.js"]
  , files     : js.files || ["components.es6.js"]
  , externals : js.externals
  , input     : path.join(assets_in, "javascripts")
  , ignore    : js.ignore
  , output    : js.output || path.join("app", "assets", "javascripts")
  , shared    : js.shared || "common.js"
  , transforms: js.transform
}