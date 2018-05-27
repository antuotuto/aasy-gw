var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var bs = require('browser-sync');
var rename = require('gulp-rename');
var zip = require('gulp-zip');
var plumber = require('gulp-plumber');
var del = require('del');
var js = 'develop/scripts/*.js';
var sty = 'develop/styles/*.css';
var htm = 'develop/html/*.html';
var img = 'develop/images/**';
gulp.watch([js, sty, htm, img], ['reload', 'zip']);
gulp.task('nanoJs', () => {
    return gulp.src(js).pipe(plumber()).pipe(gulp.dest('public/scripts/')).pipe(uglify()).pipe(gulp.dest('nano/scripts/'));
});
gulp.task('nanoCss', () => {
    return gulp.src(sty).pipe(plumber()).pipe(autoprefixer()).pipe(gulp.dest('public/styles/')).pipe(cleanCSS()).pipe(gulp.dest('nano/styles/'));
});
gulp.task('moveHtml', () => {
    return gulp.src(htm).pipe(plumber()).pipe(gulp.dest('nano/html/')).pipe(gulp.dest('public/html/'));
});
gulp.task('moveImg', () => {
    return gulp.src(img).pipe(plumber()).pipe(gulp.dest('nano/images/')).pipe(gulp.dest('public/images/'));
});
gulp.task('reload', () => {
    bs.reload();
});
gulp.task('clean', () => {
    del.sync(['public/**', 'nano/**']);
});
gulp.task('zip', ['clean', 'nanoJs', 'nanoCss', 'moveHtml', 'moveImg'], () => {
    console.log('执行压缩');
    return gulp.src('develop/**').pipe(zip('project.zip')).pipe(gulp.dest('public/'));
});
gulp.task('default', ['clean', 'nanoJs', 'nanoCss', 'moveHtml', 'moveImg', 'zip'], function () {
    bs.init({
        server: './develop',
        index: 'html/index.html',
        browser: 'google chrome',
        port: '8222',
        open: 'external',
        ui: {
            port: 8223,
        }
    })
});