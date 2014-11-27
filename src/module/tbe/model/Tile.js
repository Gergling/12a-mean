module.exports = function () {
    "use strict";

    var x = 0,
        y = 0,
        map,
        characters = [ ],
        maximumCharacters = 1;

    this.map = function (value) {
        if (value) {map = value; }
        return map;
    };
    this.x = function (value) {
        if (value || value === 0) {x = value; }
        return x;
    };
    this.y = function (value) {
        if (value || value === 0) {y = value; }
        return y;
    };

    this.maximumCharacters = function (value) {
        if (!(value === undefined)) {
            maximumCharacters = value;
        }
        return maximumCharacters;
    };
    this.character = function (character) {
        // Sets and gets the character at this tile.
        // Need to handle case where multiple characters 
            // can inhabit the same tile.
        if (character !== undefined) {
            // Adding a character
            if (characters.length < maximumCharacters) {
                characters.push(character);
            } else {
                throw new Error([
                    "Maximum characters met for Tile (",
                    x,
                    ",",
                    y,
                    ")."
                ].join(""));
            }
        }
        return maximumCharacters === 1 ? characters[0] : characters;
    };
    this.view = function () {
        var view = {
            x: this.x(),
            y: this.y(),
            characters: [ ]
        };

        characters.forEach(function (character) {
            view.characters.push(character.view());
        });

        return view;
    };
};
