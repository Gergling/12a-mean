angular.module("battle").directive("battleIsometricGrid", function () {

    "use strict";

    return {
        scope: {cellWidth: "@"},
        templateUrl: 'modules/battle/partial/isometric-grid.html',
        controller: [

            "$scope",

            function ($scope) {
                var x, y, row, cell;
                $scope.cellHeight = $scope.cellWidth * Math.sin(Math.PI * 30 / 360) / Math.sin(Math.PI * 60 / 360);
                $scope.grid = [];
                for (y = 0; y < 3; y += 1) {
                    row = [];
                    for (x = 0; x < 3; x += 1) {
                        cell = {x: x, y: y};
                        cell.isoX = x + y;
                        cell.isoY = x + 1 - y;
                        row.push(cell);
                    }
                    $scope.grid.push(row);
                }
            }
        ]
    };
});
