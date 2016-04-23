var gulp = require('gulp');
var sync = require('browser-sync');
var $ = require('gulp-load-plugins')({lazy: true});


var paths = {
  // all our client app js files, not including 3rd party js files or any existing dist files
  scripts: ['client/app/**/*.js', '!client/lib/**/*.js', '!client/dist/*.js'],
  server: ['server/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  css: ['client/assets/css/style.css'],
  test: ['specs/**/*.js'],
  dist: './client/dist'
};

gulp.task('lint', function() {
  return gulp.src(paths.scripts.concat(paths.server))
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
      .pipe($.jshint.reporter('fail'));
});

gulp.task('optimise', function() {
  return gulp.src(paths.scripts)
      .pipe($.sourcemaps.init())
      .pipe($.concat('app.js'))
      .pipe(gulp.dest(paths.dist))
      .pipe($.rename('app.min.js'))
      .pipe($.uglify())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dist))
      .on('error', function(err) {
        console.error(err);
      });
});

// nodemon equivalent for browser
gulp.task('sync', function () {
  sync.init({
    notify: true,
    injectChanges: true,
    files: paths.scripts.concat(paths.html, paths.css),
    proxy: 'localhost:3000',
    port: 5000
  });
});


// Tasks 'sass' for setting up bootstrap-sass and sass compiling
var config = {
  sassDir: './client/assets/sass',
  bowerDir: './client/lib'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function() {
  return gulp.src(config.sassDir + '/style.scss')
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        outputStyle: 'compressed',
        includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
      })
      .on('error', $.sass.logError)
    )
    .pipe($.autoprefixer(autoprefixerOptions))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./client/assets/css'))
    .pipe($.cssmin())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist));
});

// Rerun the 'sass' task when a file changes
gulp.task('watch', function() {
  gulp.watch(config.sassDir + '/*.scss', ['sass']);
});


// start our node server using nodemon
gulp.task('nodemon', function (cb) {
  var called = false;

  var nodeOptions = {
    script: './server/server.js',
    delayTime: 1,
    ignore: [
      'Gulpfile.js',
      'node_modules/**/*.js'
    ]
  };

  return $.nodemon(nodeOptions)
      .on('start', function () {
          if (!called) {
            called = true;
            cb();
          }
        })
        .on('restart', function () {
          setTimeout(function () {
            sync.reload({ stream: false });
          }, 1000);
        });
});

gulp.task('default', ['sass', 'nodemon', 'sync']);

gulp.task('deploy', [/*'lint',*/ /*'test',*/ 'optimise', 'sass']);