This will take a templated index.html and add a list of JS files as script tags.

```
<!DOCTYPE html>
<html ng-app="example-app">
<head>
  <title>AngularJS Example</title>
</head>
<body>

<div ui-view></div>

<% scripts.forEach( function ( file ) { %>
<script type="text/javascript" src="<%= file %>"></script>
<% }); %>

</body>
</html>
```

becomes:

```
<!DOCTYPE html>
<html ng-app="example-app">
<head>
  <title>AngularJS Example</title>
</head>
<body>

<div ui-view></div>


<script type="text/javascript" src="vendor/angular/angular.js"></script>

<script type="text/javascript" src="vendor/angular-ui-router/release/angular-ui-router.js"></script>

<script type="text/javascript" src="src/app/app.js"></script>

<script type="text/javascript" src="src/app/login/login.js"></script>

<script type="text/javascript" src="templates-app.js"></script>


</body>
</html>
```

YOu configure it like this:

```
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-index-html-template');

  var taskConfig = {


    index: {
      build: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= build_dir %>/src/**/*.js',
          '<%= html2js.app.dest %>'
        ]
      }
    }


  };
};
```

It assumes that the index is in 'src/index.html' and will target index.html in dir. This can be overridden with some options:

```
index: {
      options: {
          src: 'src-other-src/index.html',
          target: 'alt-index.html'
        },
      build: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= build_dir %>/src/**/*.js',
          '<%= html2js.app.dest %>'
        ]
      }
    }
```