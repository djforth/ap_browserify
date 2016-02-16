# Asset Pipeline - browserify

This is a wrapper for browserify that will eventually become a plugin for a larger project to manage the whole build process.

It can be used however on it's own.  To install run:

```bash
npm install @djforth/ap_browserify -g
```


Now add the configuration details to your package.json like so (N.B. These are the defaults):




```bash
asset-pipeline-browserify -h

  Usage: asset-pipeline-browserify [options]

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -e, --external <modules>  external modules
    -f, --factorbundle        use factor bundle
    -m, --minify              minify scripts
    -s, --input <name>        input file
    -o, --output <name>       output file
    -i, --ignore              ignore <modules>
    -r, --required            required <modules>
    -w, --watch               Watch scripts
    -v, --vendors             Vendor Bundle
```