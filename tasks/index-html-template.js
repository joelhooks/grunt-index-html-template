/*
 * grunt-html2js
 * https://github.com/karlgoldstein/grunt-html2js
 *
 * Copyright (c) 2013 Karl Goldstein
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  function filterForJS(files) {
    return files.filter(function (file) {
      return file.match(/\.js$/);
    });
  }

  grunt.registerMultiTask('index', 'Process index.html template', function () {
    var dirRE = new RegExp('^(' + grunt.config('build_dir') + ')\/', 'g');
    var jsFiles = filterForJS(this.filesSrc).map(function (file) {
      return file.replace(dirRE, '');
    });

    var options = this.options({
      src: 'src/index.html',
      target: this.data.dir + '/index.html',
    });

    grunt.file.copy(options.src, options.target, {
      process: function (contents, path) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles,
            version: grunt.config('pkg.version')
          }
        });
      }
    });
  });
};
