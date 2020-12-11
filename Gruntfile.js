module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      dist: {
        src: ['bower_components/jquery/dist/jquery.js', 'src/js/readmore.js'],
        dest: 'dist/js/readmore-plus-jquery.js',
      },
    },
    connect: {
      server: {
        options: {
          port: 8000
        }
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**'],
            dest: 'dist/'
          }
        ],
      },
    },
    jshint: {
      all: [
        'src/js/readmore.js'
      ],
      options: {
        jshintrc: true
      }
    },
    jscs: {
      src: [
        'src/js/readmore.js'
      ],
      options: {
        config: ".jscsrc"
      }
    },
    uglify: {
      options: {
        preserveComments: 'some',
        sourceMap: true
      },
      dist: {
        files: {
          'dist/js/readmore.min.js': ['src/js/readmore.js'],
          'dist/js/readmore-plus-jquery.min.js': ['dist/js/readmore-plus-jquery.js']
        }
      }
    },
    watch: {
      jshint: {
        files: ['src/js/readmore.js'],
        tasks: ['jshint', 'jscs']
      }
    },
    cssmin: {
      minify: {
          src: 'dist/css/readmore.css',
          dest: 'dist/css/readmore.min.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks("grunt-jscs");

  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('test', ['jshint', 'jscs']);
  grunt.registerTask('build', ['jshint', 'jscs', 'copy:dist', 'concat', 'uglify', 'cssmin:minify']);
};
