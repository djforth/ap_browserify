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
  .option('-i, --ignore', 'ignore <modules>', "ignore", [])
  .option('-r, --required', 'required <modules>', "required", [])
  .option('-w, --watch', 'Watch scripts')
  .option('-v, --vendors', 'Vendor Bundle')
  .parse(process.argv);

Bundle(program.minify, program.vendors)
   .setVendors(program.vendors)
   .setFactor(program.factorbundle)
   .build(program.watch)
