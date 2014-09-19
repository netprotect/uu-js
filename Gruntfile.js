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
        
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['jshint', 'requirejs']
      }
    }
    
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Default
  grunt.registerTask('default', ['jshint', 'requirejs', 'watch']);
   
};