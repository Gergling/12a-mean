angular.module("player").directive("playerOptions", function () {
    return {
        templateUrl: "modules/player/partial/directive-options.html",
        controller: [

            "$scope",
            "authenticate.service.core",

            function ($scope, authenticate) {
                $scope.user = "Guest";
                $scope.player = { chosen: "(No Player Selected)" };

                authenticate.user().then(function (user) {
                    $scope.user = user.username;
                });

                // Todo: Populate player list. Needs available create player first
            }
        ]
    };
});
