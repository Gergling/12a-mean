angular.module("isometric").directive("isometricTile", [

    function () {
        "use strict";

        return {
            scope: {isometricTile: "="},
            templateUrl: 'modules/isometric/partial/directive-tile.html',
            compile: function () {
                return {
                    post: function ($scope, $element) {
                        var img = $element.find('img');
                        img.bind('load', function () {
                            // Todo: Chain
                            $element.find('.overlay').height(img.height());
                            $element.find('.overlay').css({top: 'initial'});
                        });
                    }
                };
            },
            controller: [

                "$scope",
                "isometric.service.tile",

                function ($scope, tileService) {
                    if (!($scope.isometricTile instanceof tileService.create().constructor)) {throw new Error("isometricTile directive: attribute value must be an isometric tile."); }

                    // Todo: Variable content settings
                    $scope.image = "modules/battle/media/image/isometric-square-100x50-empty.png";
                }
            ]
        };
    }
]);
