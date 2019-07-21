
# **Proyecto**

## - Librerias
1. Bootstrap (framework de css/js) -> [Link](https://getbootstrap.com/)
2. Normalize   -> [Link](https://necolas.github.io/normalize.css/)

## - Datos extras

### Estructura gulp
```
gulp.task('task-name', function () {   
   return gulp.src('source-files')  // Obtenga los archivos de origen
          .pipe(aGulpPlugin())     // Envíelo a través de un complemento de gulp 
          .pipe(gulp.dest('destination'))   // Salida a destino 
})
```

## Run project

```
npm start || gulp
```