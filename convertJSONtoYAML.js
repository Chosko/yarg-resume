var fs   = require('fs');
var yaml = require('js-yaml');
var path = require('path');

// file to convert
var file       = process.argv[2];
var resumeJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, file), 'utf8'));

fs.writeFile(file.replace('.json', '.yml'), render(), function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("resume.yaml written to "+file+" folder.");
  }
});

function render() {
  return yaml.safeDump(resumeJSON);
}
