var gulp = require('gulp'), // подключаем gulp
    gulpLoadPlugins = require('gulp-load-plugins'), // подключаем gulp-load-plugins
    plugins = gulpLoadPlugins(); // вызываем gulp-load-plugins -> получаем объект со всеми плагинами
// Т.е. любой плагин будет доступен как свойство объекта plugins:

gulp.task('js', function () {
   return gulp.src('js/*.js') // берем файлы с расширением .js в директории js
    //gulp.src(['js/**/*.js', '!js/**/*.min.js']) - все файлы .js в директории js, кроме уже минифицированных
      .pipe(plugins.jshint()) // detects errors and potential problems in JavaScript code
      .pipe(plugins.jshint.reporter('default')) // выводим результат работы JSHint
      .pipe(plugins.uglify()) // минифицируем js
      .pipe(plugins.concat('app.min.js')) // объединяем их в один файл app.min.js
      .pipe(gulp.dest('build')); // потом сохраняем его в директории build
});

// Названием свойства будет camel case от названия плагина, т.е modify-css-urls преобразуется в modifyCssUrls.

// gulp-load-plugins избавляет от необходимости явно подключать плагин в gulpfile.js, но не от необходимости устанавливать npm-модуль. Т.е. все плагины, которые мы используем в сборке, должны быть установлены.

// gulp-load-plugins загружает плагины «лениво», т.е. плагин загружается только перед использованием. 1) это увеличивает производительность сборки, 2) не нужно беспокоиться о неиспользуемых плагинах в package.json