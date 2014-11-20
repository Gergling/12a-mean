var Character = function (props) {
    "use strict";

    var label = "(Unnamed Character)";

    props = props || { };
    // Attach properties.
    this.attributes = props.stats || { };
    this.abilities = props.abilities || { };
    this.corpse = props.corpse || false;

    this.attribute = function () {return true; };
    this.capacitor = function () {return true; };
    this.label = function (value) {
        if (value) {
            label = value;
        }
        return label;
    };
    this.description = function () {return true; };
    this.on = function () {
        // Return a list of possible character events.
        return {
            death: function () {
                // Returns a list of possible actions the character
                    // might be able to take during death.
                return {
                    spawn: function (characterFactory) {
                        // Sets a character factory which will be
                            // used to generate a character.
                        return characterFactory;
                    }
                };
            }
        };
    };
};

module.exports = Character;
