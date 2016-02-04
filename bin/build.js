#! /usr/bin/env node

var _      = require("lodash")
 , Bundle  = require("../plugins/bundle")
 // , config  = require("../plugins/config")
 , program = require('commander');

program
  .version('0.0.1')
  .option('-e, --external <modules>', 'external modules', "externals", [])
  .option('-f, --factorbundle', "use factor bundle")
  .option('-m, --minify' , 'minify scripts')
  .option('-s, --input <name>', 'input file')
  .option('-i, --ignore', 'ignore <modules>', "ignore", [])
  .option('-r, --required', 'required <modules>', "required", [])
  .option('-w, --watch', 'Watch scripts')
  .option('-v, --vendors', 'Vendor Bundle')
  .parse(process.argv);

var files;
if(program.input){
  files = program.input;
} else if(program.vendors) {
  files = []
}




Bundle(program.minify, files)
   .setVendors(program.vendors)
   .setFactor(program.factorbundle)
   .build(program.watch)
