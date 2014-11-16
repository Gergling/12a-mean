module.exports = function (defaults, Character) {

    var CharacterFactory = function (stats, generator) {
        var scope = this;
        /*this.getCharacter = function (args) {
            return angular.extend(
                new Character(stats),
                generator(args)
            );
        };*/
        this.generate = function () {
            var character = new Character();
            generator(character);
            return character;
        };
    };

    return CharacterFactory;
};
