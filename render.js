//
// This script will render the response and write it to the index.html file.
//
// Usage:
// `node render`
//

var fs = require('fs');
// var resume = require("resume-schema").resumeJson;
var yaml = require('js-yaml');
var theme = require("./index.js");
var path = require('path');
var _ = require('lodash');

// config file
var config = 'config.yml';
// default preset



// load the preset
var preset = process.argv[2];
var config = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, 'config.yml'), 'utf8'));
if (!config) {
  chalk.yellow('config.yaml does not exist');
}
var defaults = config.presets.default;
_.assign(defaults, config.presets[preset]);


// load resume
var resume = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, defaults.folder+"/"+defaults.file), 'utf8'));

fs.writeFile("./build/index." + defaults.ext, render(), function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("index.html written to build folder.");
  }
});

function render() {
  try {
    return theme.render(resume, 'themes/' + defaults.theme + '/resume.hbs', 'themes/' + defaults.theme + '/style.css');
  } catch (e) {
    console.log(e.message);
    return "";
  }
}

// var file = process.cwd() + '/resume.json';
// fs.readFile(file, function(err, resumeJson) {
//     var resumeJson;
//     if (err) {
//         console.log(chalk.yellow('resume.json does not exist'));
//         return;
//     } else {
//         resumeJson = JSON.parse(resumeJson);
//     }
//     var render = require(process.cwd() + '/index').render;
//     fs.writeFileSync(process.cwd() + '/index.html', render(resumeJson));
// });
