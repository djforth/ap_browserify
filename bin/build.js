#! /usr/bin/env node

var _      = require("lodash")
 , Bundle  = require("../plugins/bundle")
 , config  = require("../plugins/config")
 , program = require('commander');

program
  .version('0.1.0')
  .option('-e, --external <modules>', 'external modules', "externals")
  .option('-f, --factorbundle', "use factor bundle")
  .option('-m, --minify' , 'minify scripts')
  .option('-s, --input <name>', 'input file')
  .option('-o, --output <name>', 'output file')
  .option('-i, --ignore', 'ignore <modules>', "ignore", [])
  .option('-r, --required', 'required <modules>', "required", [])
  .option('-x, --separate', 'compile file list into separate bundles')
  .option('-w, --watch', 'Watch scripts')
  .option('-v, --vendors', 'Vendor Bundle')
  .parse(process.argv);

function build(files, program){
  Bundle(program.minify, files)
    .setVendors(program.vendors)
    .setFactor(program.factorbundle)
    .build(program.watch)
}

var files;
if(program.input){
  files = program.input;
} else if(program.vendors) {
  files = []
}

var options = ["external", "factor", "minify", "output", "required", "separate"]

options.forEach(function(op){
  if(!_.isEmpty(program[op]) || program[op]){
    config.set(op, program[op])
  }
});

files =  files || config.get("files");

if(program.separate){
  files.forEach(function(f){
    Bundle(program.minify, f)
    .setOutput(f)
    .setVendors(program.vendors)
    .setFactor(program.factorbundle)
    .build(program.watch)
  })
} else {
  Bundle(program.minify, files)
    .setVendors(program.vendors)
    .setFactor(program.factorbundle)
    .build(program.watch)
}




