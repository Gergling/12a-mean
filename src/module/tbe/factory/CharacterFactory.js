module.exports = function (defaults, Character) {

    var CharacterFactory = function (stats, generator) {
        var scope = this;
        this.getCharacter = function (args) {
            return angular.extend(
                new Character(stats),
                generator(args)
            );
        };
    };

    return CharacterFactory;
};
