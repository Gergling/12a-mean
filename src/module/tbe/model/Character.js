var Character = function (props) {
    props = props || { };
    // Attach properties.
    this.attributes = props.stats || { };
    this.abilities = props.abilities || { };
    this.corpse = props.corpse || false;

    this.attribute = function () {return true; };
    this.capacitor = function () {return true; };
};

module.exports = Character;
