// Generated on 2013-06-17 using generator-angular 0.2.2 (manual intervention by matt to update this file to latest generator-angular)
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    appdist: 'appdist'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      options: {
        nospawn: true
      },
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/*.sass'], // orig= files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server'],
        options: {
          nospawn: false  // override
        }
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/*.html', // orig= '<%= yeoman.app %>/{,*/,*/*/}*.html',
          '<%= yeoman.app %>/views/{,*/}*.html', // explicit folder for performance
          '{.tmp,<%= yeoman.app %>}/styles/*.css', // orig= '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '<%= yeoman.app %>/styles/special/*', // special style files
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      },
      appdist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.appdist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      appdist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.appdist %>/*',
            '!<%= yeoman.appdist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
//        httpFontsPath: '/styles/fonts',
        importPath: '<%= yeoman.app %>/components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        relativeAssets: false
      },
      dist: {},
      appdist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
     dist: {}
     },*/
//    concat: {
//      dist: {
//        files: {
//          '<%= yeoman.dist %>/scripts/scripts.js': [
//            '.tmp/scripts/{,*/}*.js',
//            '<%= yeoman.app %>/scripts/{,*/}*.js'
//          ]
//        }
//      }
//    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/,*/*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css',
            '!<%= yeoman.app %>/styles/special/*.css' // negate: special css files needs to be seperate from main.css
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
           // https://github.com/yeoman/grunt-usemin/issues/44
           //collapseWhitespace: true,
           collapseBooleanAttributes: true,
           removeAttributeQuotes: true,
           removeRedundantAttributes: true,
           useShortDoctype: true,
           removeEmptyAttributes: true,
           removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html', 'views/tumblr/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*',
            'styles/special/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      appdist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.appdist %>',
          src: [
            '**/*',
            '!styles/main.css'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.appdist %>/images',
          src: [
            'generated/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/styles',
          dest: '<%= yeoman.appdist %>/styles',
          src: [
            '*.css'
          ]
        }]
      }
    },
    concurrent: {
      server: [
        'coffee:dist',
        'compass:server'
      ],
      test: [
        'coffee',
        'compass'
      ],
      dist: [
        'coffee',
        'compass:dist',
        'imagemin',
        'htmlmin'
      ],
      appdist: [
//        'coffee:dist',
        'compass:appdist'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
//            '<%= yeoman.dist %>/scripts/scripts.js'
            '<%= yeoman.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build:dist', 'open', 'connect:dist:keepalive']);
    }

    if (target === 'appdist') {
      return grunt.task.run(['build:appdist', 'open', 'connect:appdist:keepalive']);

    }

    // if target=mild, run without opening
    if (target === 'mild') {
      return grunt.task.run([
        'clean:server',
        'concurrent:server',
        'connect:livereload',
        'watch'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build-dist']);
    }

    if (target === 'appdist') {
      return grunt.task.run(['build-appdist']);
    }

    return grunt.task.run(['build-appdist']); // default to build-appdist
  });

  grunt.registerTask('build-dist', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'cssmin:dist',
//    'concat:dist',
    'copy:dist',
    'cdnify',
    'ngmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('build-appdist', [
    'clean:appdist',
    'concurrent:appdist',
    'copy:appdist'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
