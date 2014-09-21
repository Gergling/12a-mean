var ngModules = (function ($) {
    "use strict";

    $(function () {
        ngModules.bootstrap(document);
    });

    return new NGModuleCollection();
}(jQuery));
