/*importando plug-ins*/
var gulp=require("gulp"); /*automatizador de tareas*/
var webserver=require("gulp-webserver"); /*te permite levantar un webserver*/
var stylus=require("gulp-stylus");
var nib=require("nib"); /*agrega los prefijos a los atributos para el fallback*/
var minifyCSS=require("gulp-minify-css"); /*automatiza el procesado de stylus a css*/
var browserify=require("browserify");
var uglify=require("gulp-uglify");
var source=require("vinyl-source-stream");
var buffer=require("vinyl-buffer");
var smoosher = require('gulp-smoosher');
var imageOP = require ('gulp-image-optimization');

var config={

	styles:{
		main:"./src/styles/main.styl",
		watch:"./src/styles/**/*.styl",
		output:"./build/css"
	},
	html:{

		watch:"./build/*.html"
	},
	scripts:{

		main:"./src/scripts/main.js",
		watch:'./src/scripts/**/*.js',
		output:'./build/js'
	},
	images:{
		watch:['./build/img/*.jpg','./build/img/*.png'],
		output: './dist/img'
	}
}
/*implementando las tareas*/
gulp.task("server",function(){

	gulp.src("./build")
	.pipe(webserver({
		port:8080,
		host:"0.0.0.0",
		livereload:true
		}));
});/*f) Usando Browserify para JavaScript*/

gulp.task('build:js',function(){
	return browserify(config.scripts.main)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest(config.scripts.output));
});
gulp.task("build:css",function(){

	gulp.src(config.styles.main)
		.pipe(stylus({
		use:nib(),
		"include css":true
		}))
	.pipe(minifyCSS())
	.pipe(gulp.dest(config.styles.output));
});
gulp.task('images', function(){
	gulp.src(config.images.watch)
	.pipe(imageOP({
		optimizationLevel: 5,
		progressive: true,
		interlaced: true
	}))
	.pipe(gulp.dest(config.images.output))
})
gulp.task('inline',function(){
	gulp.src('./build/index.html')
	.pipe(smoosher())
	.pipe(gulp.dest('./dist'))
})
gulp.task("watch",function(){
	gulp.watch(config.images.watch,['images']);
  gulp.watch(config.scripts.watch,["build:js"]);
	gulp.watch(config.styles.watch,["build:css"]);
	gulp.watch(config.html.watch,["build"]);

});

gulp.task("build",["build:css",'build:js','images','inline']);
gulp.task("default",["server","watch","build"]);
