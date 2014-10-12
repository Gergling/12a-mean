ngModules.get("skill").component(function (ngm, mod) {
    "use strict";

    ngm.service(mod.getModuleName("service", "tree"), [

        "Restangular",

        function (Restangular) {
            var skills = Restangular.one("skills"),
                scope = this,
                fetch = function () {
                    scope.loading = true;
                    skills.get().then(function (tree) {
                        scope.loading = false;
                        scope.root = tree;
                    });
                };

            this.loading = false;
            this.tree = { };

            this.get = function (reference) {
                var parent = reference.shift();
            };

            fetch();
        }
    ]);
});
