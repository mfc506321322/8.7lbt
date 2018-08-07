var gulp = require('gulp'),
loader = require('gulp-load-plugins')();
console.log(loader);
var fs = require('fs'),
path = require('path'),
url = require('url');

gulp.task('sass',function(){
    gulp.watch('./src/css/*.scss',function(){
        setCss('./src/css/')
    })
})

function setCss(url){
    return gulp.src('./src/css/*.scss')
        .pipe(loader.sass())
        .pipe(loader.autoprefixer({
            browsers:['last 2 versions']
        }))
        .pipe(loader.cleanCss())
        .pipe(gulp.dest(url))
}
function server(tagurl){
    return gulp.src('./'+tagurl+'/')
        .pipe(loader.webserver({
            port:8080,
            open:true,
            middleware:function(req,res,next){
                if(req.url == '/favicon.ico'){
                    return;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname == '/'?'index.html':pathname;
                if(/^\/api/.test(pathname)){
                    res.end('json数据')
                }else{
                    res.end(fs.readFileSync(path.join(__dirname,tagurl,pathname)));
                }
            }
        }))
}
gulp.task('mincss',function(){
    return setCss('./build/css/')
})
gulp.task('minjs',function(){
    return gulp.src(['./src/js/**/*.js','!./src/js/lib/*.js'])
        .pipe(loader.babel({
            presets:"es2015"
        }))
        .pipe(loader.uglify())
        .pipe(gulp.dest('./build/js'))
})
gulp.task('minhtml',function(){
    return gulp.src('./src/index.html')
        .pipe(loader.htmlmin({
            collapseWhitespace:true,
            collapseBooleanAttributes:true,
            removeEmptyAttributes:true,
            removeScriptTypeAttributes:true,
            removeStyleLinkTypeAttributes:true,
            minifyJS:true
        }))
        .pipe(gulp.dest('./build/'))
})
gulp.task('copylibjs',function(){
    return gulp.src('./src/js/lib/*.js')
        .pipe(gulp.dest('./build/js/lib'))
})
gulp.task('copyimg',function(){
    return gulp.src('./src/img/*')
        .pipe(gulp.dest('./build/img'))
})
gulp.task('dev',gulp.series('sass',function(){
    server('src');
}))
gulp.task('build',gulp.series(gulp.parallel('mincss','minjs','minhtml','copylibjs','copyimg'),function(){
    server('build');
}))
