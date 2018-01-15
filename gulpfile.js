const gulp = require('gulp')
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const standard = require('gulp-standard')

// Static server
gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './build'

    },
    port: 8080
  })
})

// Transform Pug => HTML
gulp.task('pug', () =>
  gulp.src('./src/views/main.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('build'))
)

// Transform SASS => CSS
gulp.task('sass', () =>
  gulp.src('./src/style.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream())
)

// Transform ESNext => ES5
gulp.task('js', () =>
  gulp.src('./src/scratchpad.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('build'))
)

// Auto Format to Standard
gulp.task('standard', () =>
  gulp.src('./src/scratchpad.js')
    .pipe(standard({
      fix: true
    }))
    .pipe(gulp.dest('src'))
)

// Format Gulpfile
gulp.task('gulpfile', () =>
  gulp.src('./gulpfile.js')
    .pipe(standard({
      fix: true
    }))
    .pipe(gulp.dest('./'))
)

// Watchers
gulp.task('watch', function () {
// Watch source and transform
  gulp.watch('./src/**/*.sass', ['sass'])
  gulp.watch('./src/**/*.pug', ['pug'])
  gulp.watch('./src/**/*.js', ['js', 'standard'])

// Watch Build and Update BrowserSync
  gulp.watch('build/*.html').on('change', browserSync.reload)
  gulp.watch('build/*.js').on('change', browserSync.reload)
})


// Runs all Transforms
gulp.task('build', ['pug', 'js', 'sass', 'standard'])

// Default Task - Start Browser and Watch Files
gulp.task('default', ['browser-sync', 'watch', 'build'])
