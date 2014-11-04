module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
      all: ['src/**/*.js']
    },
    
    requirejs: {
      compile: {
        options: {
          baseUrl: 'src',
          name: 'main',
          mainConfigFile: 'src/main.js',
          out: 'dev/uu.js',
          optimize: 'none',
          paths: {
            requireLab: 'libs/require'
          },
          include: 'requireLab'
        }
      }
    },
    
    uglify: {
      options: {
        mangle: false
      },
      dev: {
        files: {
          'dev/uu.min.js': ['dev/uu.js'],
          'demo/jquery.uu.js': ['dev/uu.js']
        },
        beautify: {
          width: 80,
          beautify: true
        }
      },
      build: {
        options: {
          banner: '/*!\n' +
                  ' * jQuery <%= pkg.name %> Plugin v<%= pkg.version %>\n' +
                  ' * \n' +
                  ' * <%= pkg.url %>\n' +
                  ' * \n' +
                  ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                  ' * Released under the <%= pkg.license %> license\n' + 
                  ' */\n\n',
          compress: {
            drop_console: true
          }
        },
        files: {
          'build/jquery.uu.min.js': ['src/plugins/jquery.uu.js']
        }
      }
    },

    removelogging: {
      dist: {
        src: 'src/plugins/jquery.uu.js',
        dest: 'build/jquery.uu.js',
        options: {
          replaceWith: '/* */'
        }
      }
    },
    
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['jshint', 'requirejs']
      }
    }
    
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-remove-logging");
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Default
  grunt.registerTask('dev', ['jshint', 'requirejs', 'uglify:dev', 'watch']);
   
  // Build
  grunt.registerTask('build', ['jshint', 'removelogging', 'uglify:build']);
   
};