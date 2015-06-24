module.exports = (function () {

    "use strict";

    var q = require("q"),
        Player = require("../player/model/Player"),
        findPlayer = function (userId) {
            var deferred = q.defer();
            Player.findOne({userId: userId}, function (err, player) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(player);
                }
            });
            return deferred.promise;
        };

    var controller = { };
    /*return {
        findOrCreate: function (userId) {
            var deferred = q.defer();
            return findPlayer(userId).catch(function () {
                // No player found
                findUser(userId).then(function (response) {
                    // Create player
                    response.player = new Player();
                    deferred.resolve(response);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            });
        },
        profile: function (userId, done, error) {
            findPlayer(userId, function (player) {
                done({
                    userId: userId,
                    name: player.name,
                    gender: {
                        male: player.male,
                        female: player.female
                    }
                });
            }, error);
        },
        edit: function (userId, data, done, error) {
            findPlayer(userId, function (player) {
                // Todo: Validate data
                // Save to player
                player.name = data.name;
                player.save(function (err, p) {
                    if (err) {throw err; }
                    done(p);
                });
            }, error);
        }
    }*/
    controller.list = function (req, res) {
        // Get full list of player characters for user.
        res.send({ success: false, message: "I would like to tell you the message updated successfully. I'd like to tell you that..." });
    };
    controller.profile = function (req, res) {
        // Get specific player character profile information.
        res.send({ success: false, message: "I would like to tell you the message updated successfully. I'd like to tell you that..." });
    };
    controller.create = function (req, res) {
        // Create a new player character
        // Respond with character profile
        var player = new Player({
            name: req.body.name,
            userId: req.session.passport.user
        });
        player.save(function () {
            res.send(player);
        });
    };
    controller.edit = function (req, res) {
        // Send an edit of a player profile... this might not have an application
        res.send({ success: false, message: "I would like to tell you the message updated successfully. I'd like to tell you that..." });
    };
    return controller;
}());