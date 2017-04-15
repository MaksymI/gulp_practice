var gulp = require('gulp'), // подключаем gulp
    gulpLoadPlugins = require('gulp-load-plugins'), // подключаем gulp-load-plugins
   // plugins = gulpLoadPlugins(); // вызываем gulp-load-plugins -> получаем объект со всеми плагинами
// Т.е. любой плагин будет доступен как свойство объекта plugins:

// note!! that by default gulp-load-plugins
// will only work with NPM packages that
// are prefixed with 'gulp-'.
	plugins = gulpLoadPlugins({
        pattern: '*'
    });

gulp.task('js', function () {
   return gulp.src('js/*.js') // берем файлы с расширением .js в директории js
    //gulp.src(['js/**/*.js', '!js/**/*.min.js']) - все файлы .js в директории js, кроме уже минифицированных
      .pipe(plugins.jshint()) // detects errors and potential problems in JavaScript code
      .pipe(plugins.jshint.reporter('default')) // выводим результат работы JSHint
      .pipe(plugins.uglify()) // минифицируем js
      .pipe(plugins.concat('app.min.js')) // объединяем их в один файл app.min.js
      .pipe(gulp.dest('build')); // потом сохраняем его в директории build
});

gulp.task('common-js', function() {
	return gulp.src([
		'app/js/common.js',
		])
	.pipe(plugins.concat('common.min.js'))
	.pipe(plugins.uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
        'app/libs/jQuery.mmenu/dist/jquery.mmenu.all.min.js',
        'app/libs/owl.carousel/dist/owl.carousel.min.js',
        'app/libs/jQuery.equalHeights/jquery.equalheights.min.js',
		'app/js/common.min.js', // Всегда в конце
		])
	.pipe(plugins.concat('scripts.min.js'))
	.pipe(plugins.uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(plugins.browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	plugins.browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(plugins.sass({outputStyle: 'expand'}).on("error", plugins.notify.onError()))
	.pipe(plugins.rename({suffix: '.min', prefix : ''}))
	.pipe(plugins.autoprefixer(['last 15 versions']))
	.pipe(plugins.cleanCss()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(plugins.browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', plugins.browserSync.reload);
});

gulp.task('default', ['watch']);

// Названием свойства будет camel case от названия плагина, т.е modify-css-urls преобразуется в modifyCssUrls.

// gulp-load-plugins избавляет от необходимости явно подключать плагин в gulpfile.js, но не от необходимости устанавливать npm-модуль. Т.е. все плагины, которые мы используем в сборке, должны быть установлены.

// gulp-load-plugins загружает плагины «лениво», т.е. плагин загружается только перед использованием. 1) это увеличивает производительность сборки, 2) не нужно беспокоиться о неиспользуемых плагинах в package.json