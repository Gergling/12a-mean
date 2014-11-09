var ngModules = (function ($) {
    "use strict";

    $(function () {
        //ngModules.bootstrap(document);
        console.log(angular, angular.bootstrap);
        angular.bootstrap(document, ["application"]);
    });

    return new NGModuleCollection();
}(jQuery));
