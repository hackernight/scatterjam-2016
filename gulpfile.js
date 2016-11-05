var gulp = require('gulp');

gulp.task('dev', ['copy-bower', 'copy-graphics'], function() {});
gulp.task('prod', ['copy-bower-prod', 'copy-graphics'], function() {});

gulp.task('copy-bower', function() {
    return gulp
        .src('bower_components/phaser/build/phaser.js')
        .pipe(gulp.dest('./www/js/vendor/'));
});

gulp.task('copy-bower-prod', function() {
    return gulp
        .src('bower_components/phaser/build/phaser.min.js')
        .pipe(gulp.dest('./www/js/vendor/'));
});

gulp.task('copy-graphics', function() {
    return gulp
        .src(['assets/browser/favicon.png', 'assets/graphics/**/*'])
        .pipe(gulp.dest('./www/assets/graphics'));
});
