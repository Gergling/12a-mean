<!-- public/views/index.html -->
<!doctype html>
<html lang="en">
<head>
 <meta charset="UTF-8">

 <%
  var replace = function (path) {return path.replace("src/public/views/", "");};
  grunt.file.expand(css.vendor.concat(css.styles)).forEach(function (path) {
   %><link rel="stylesheet" type="text/css" href="<%- replace(path) %>"><%- "\n" %><%
  });
 %>

 <%
  grunt.file.expand(paths.vendor.concat(paths.client)).forEach(function (path) {
   %><script src='<%- replace(path) %>'></script><%- "\n" %><%
  });
 %>
 <!--<script src="vendor/jquery/jquery.js"></script>
 <script src="vendor/angular/angular.js"></script>
 <script src="vendor/angular-route/angular-route.js"></script>
 <script src="modules/NGModule.js"></script>
 <script src="index.js"></script>
 <script src="modules/application/module.js"></script>
 <script src="modules/application/routing/core.js"></script>
 <script src="modules/test/module.js"></script>
 <script src="modules/test/controller/test1.js"></script>-->

 <title>12a MEAN</title>

</head>
<body data-ng-controller="application.controller.index">
    <div data-ng-view>(Loading...)</div>
</body>
</html>