import rev from "gulp-rev";
import gulp from "gulp";
import cssnano from "gulp-cssnano";
import uglify from "gulp-uglify-es";
import imagemin from "gulp-imagemin";
import {deleteAsync} from "del";


// const gulp =require("gulp");
// const cssnano = require("gulp-cssnano");
// const rev = require("gulp-rev");
// const rev = require("./node_modules/gulp-rev/index");

gulp.task("css",async function(done){
    console.log("minifying css.....");
    await gulp.src("./assets/css/**/*.css")
    .pipe(cssnano())
    .pipe(gulp.dest("./assets/css"));
    
    await gulp.src("./assets/**/*.css")
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(rev.manifest({
        cwd : "public",
        merge : true
    }))
    .pipe(gulp.dest("./public/assets"));
    await done();
})

gulp.task("js",async function(done){
    console.log("minifying js.....");
    await gulp.src("./assets/**/*.js")
    .pipe(uglify.default())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(rev.manifest({
        cwd:"public",
        merge:true
    }))
    .pipe(gulp.dest("./public/assets"));
    await done();
})

gulp.task("images",async function(done){
    console.log("compressing images.....");
    await gulp.src("./assets/**/*.+(png|jpg|gif|svg|jpeg)")
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(rev.manifest({
        cwd:"public",
        merge:true
    }))
    .pipe(gulp.dest("./public/assets"));
    await done();
})

gulp.task("clean:assets",async function(done){
    await deleteAsync("./public/assets");
    console.log("Assests is clean.....")
    await done();
})

gulp.task("build",gulp.series("clean:assets","css","images","js"),function(done){
    console.log("Building assets");
    done();
})