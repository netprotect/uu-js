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
          'dev/uu.min.js': ['dev/uu.js']
        }
      },
      web: {
        options: {
          banner: '/*!\n' +
                  ' * jQuery <%= pkg.name %> Plugin v<%= pkg.version %>\n' +
                  ' * \n' +
                  ' * <%= pkg.url %>\n' +
                  ' * \n' +
                  ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                  ' * Released under the <%= pkg.license %> license\n' + 
                  ' */\n\n',
          beautify: {
            indent_level: 2,
            beautify: true
          },
          compress: {
            drop_console: true
          }
        },
        files: {
          'web/jquery.uu.min.js': ['src/plugins/jquery.uu.js']
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
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Default
  grunt.registerTask('dev', ['jshint', 'requirejs', 'uglify:dev', 'watch']);
   
  // Default
  grunt.registerTask('web-plugin', ['jshint', 'uglify:web']);
   
};