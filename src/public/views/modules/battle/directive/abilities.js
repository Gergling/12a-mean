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
                    });

                    $scope.abilities = { };

                    $scope.scroll = (function () {
                        var ret = {
                            current: 0,
                            offset: 0,
                            visible: 5,
                            width: 0,
                            scale: 40,
                            left: function () {
                                ret.current += ret.current < 0 ? 1 : 0;
                                ret.update();
                            },
                            right: function () {
                                ret.current -= ret.current > ret.visible - $scope.abilities.length ? 1 : 0;
                                ret.update();
                            },
                            update: function () {
                                console.log(ret.current);
                                ret.pixels = ret.current * ret.scale;
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
