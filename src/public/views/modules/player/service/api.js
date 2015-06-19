angular.module("player").service("player.service.api", [

    "Restangular",

    function (Restangular) {
        var all = Restangular.all("player");

        this.create = function (player) {
            return all.post(player);
        };
    }
]);