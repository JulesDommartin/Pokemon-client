'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  var appConfig = {
    app : require('./bower.json').appPath || 'client/app'
  };

  grunt.initConfig({

    client:appConfig,

    clean: {
      local: {
        files: [
          {
            dot: true,
            src: [
              '.tmp'
            ]
          }
        ]
      }
    },

    includeSource: {
      options: {
        basePath: 'client/app',
        baseUrl: '/',
        templates: {
          html: {
            js: '<script src="{filePath}"></script>',
            css: '<link rel="stylesheet" href="{filePath}" />'
          }
        }
      },
      local: {
        files: {
          '<%= client.app %>/index.html': '<%= client.app %>/index.tpl.html'
        },
        options: {
          baseUrl: '/'
        }
      },
      dist: {
        files: {
          '<%= client.dist %>/index.html': '<%= client.app %>/index.tpl.html'
        }
      }
    },

    wiredep: {
      local: {
        src: [
          '<%= client.app %>/index.html'
        ],
        ignorePath: /\.\.\//
      },
    }


  });

  grunt.registerTask('build', [
    'clean:local',
    'includeSource:local',
    'wiredep:local'
  ]);


};
