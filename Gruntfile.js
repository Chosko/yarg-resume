'use strict';

var _ = require('lodash');

module.exports = function(grunt) {

  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  // Read configuration from _config.yml
  var configuration = grunt.file.readYAML('config.yml');
  var defaults = configuration.presets.default;
  var config_preset = 'default';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    configuration: configuration,
    defaults: defaults,
    config_preset: config_preset,

    watch: {
      options: {
        livereload: true
      },
      resume: {
        files: ['<%= defaults.folder %>/*.{json,jpg,yaml,yml}'],
        tasks: ['shell:build'],
        options: {
          event: ['added', 'changed'],
        }
      },
      template: {
        files: ['themes/<%= defaults.theme %>/resume.{hbs,template}'],
        tasks: ['shell:build'],
        options: {
          event: ['added', 'changed'],
        }
      }
    },
    shell: {
      convert: {
        command: 'node convertJSONtoYAML <%= defaults.folder %> <%= defaults.file %>'
      },
      build: {
        command: function (preset) {
                    return 'node render ' + preset;
                }
      },
    },
    connect: {
      options: {
        port: 8880,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        base: 'build',
        livereload: true
      },
      dist: {
        options: {
          open: false,
        }
      },
    },
  });

  grunt.registerTask('convert', 'convert json resume in yaml', function(preset){
    // passed resume presets
    if (preset) {
      _.assign(defaults, configuration.presets[preset]);
    }
    grunt.task.run('shell:convert');
  });

  grunt.registerTask('build', 'build html', function(preset){
    // passed resume presets
    if (preset) {
      config_preset = preset;
      grunt.task.run(['shell:build:'+preset]);
      return;
    }
    grunt.task.run('shell:build');
  });

  grunt.registerTask('serve', 'build and watch', function(preset){
    // passed resume presets
    if (preset) {
      config_preset = preset;
      grunt.task.run(['shell:build:'+preset, 'connect:dist', 'watch']);
      return;
    }
    grunt.task.run(['shell:build', 'connect:dist', 'watch']);

  });

  grunt.registerTask('default', ['serve']);

};
