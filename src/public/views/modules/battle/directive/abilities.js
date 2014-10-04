ngModules.get("battle").component(function (ngm, mod) {
    "use strict";

    ngm.directive("battleAbilities", function () {
        return {
            scope: {width: "@"},
            templateUrl: 'modules/' + mod.getPartialUrl("abilities"),
            controller: [

                "$scope",
                "battle.service.fetch",

                function ($scope, battleFetcher) {
                    battleFetcher.state().success(function (response) {
                        $scope.abilities = response.abilities;
                        $scope.scroll.total = Object.keys($scope.abilities).length;
                    });

                    $scope.abilities = { };

                    $scope.scroll = (function () {
                        var ret = {
                            offset: 0,
                            visible: 5,
                            width: 0,
                            scale: 40,
                            total: 0,
                            left: function () {
                                ret.offset += ret.offset < 0 ? 1 : 0;
                                ret.update();
                            },
                            right: function () {
                                ret.offset -= ret.offset > ret.visible - ret.total ? 1 : 0;
                                ret.update();
                            },
                            update: function () {
                                ret.pixels = ret.offset * ret.scale;
                            }
                        };
                        ret.width = ret.visible * ret.scale;
                        return ret;
                    }());
                }
            ]
        };
    });
});
