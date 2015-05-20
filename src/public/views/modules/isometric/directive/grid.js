angular.module("isometric").directive("isometricGrid", [

    function () {
        "use strict";

        return {
            scope: {cellWidth: "@"},
            templateUrl: 'modules/isometric/partial/directive-grid.html',
            controller: [

                "$scope",
                "$element",
                "$window",
                "isometric.service.point",
                "isometric.service.tiles",
                "isometric.service.view",

                function ($scope, $element, $window, pointService, tiles, view) {
                    var Drag = function () {
                            var enabled = false,
                                offset = pointService.create();

                            this.start = function ($event) {
                                offset.x($event.clientX);
                                offset.y($event.clientY);
                                enabled = true;
                            };
                            this.stop = function () {
                                enabled = false;
                            };
                            this.update = function ($event) {
                                if (enabled) {
                                    view.camera().add($event.clientX - offset.x(), $event.clientY - offset.y());
                                    offset.x($event.clientX);
                                    offset.y($event.clientY);
                                    tiles.update();
                                }
                            };
                        },
                        tileOp = function ($event, fnc, always) {
                            var el = $element.find('.isometric-grid'),
                                x = $event.clientX - el.offset().left + $window.scrollX,
                                y = $event.clientY - el.offset().top + $window.scrollY;

                            $scope.tiles.forEach(function (tile) {
                                always(tile);
                                if (tile.boundsCheck(x - tile.left(), y - tile.top())) {
                                    fnc(tile);
                                }
                            });
                        },
                        drag = new Drag();

                    $scope.cellHeight = $scope.cellWidth / 2;
                    tiles.onChange(function () {$scope.tiles = tiles.visible(); });
                    $scope.click = function ($event) {
                        tileOp($event, function (tile) {
                            tile.select(true);
                        }, function (tile) {
                            tile.select(false);
                        });
                    };
                    $scope.mousedown = function ($event) {
                        drag.start($event);
                    };
                    $scope.mouseup = function () {
                        drag.stop();
                    };
                    $scope.mousemove = function ($event) {
                        drag.update($event);
                        tileOp($event, function (tile) {
                            tile.hover(true);
                        }, function (tile) {
                            tile.hover(false);
                        });
                    };
                }
            ]
        };
    }
]);
