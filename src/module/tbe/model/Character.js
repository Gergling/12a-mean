var Character = function (props) {
    // Attach properties.
    this.attributes = props.stats || { };
    this.abilities = props.abilities || { };
    this.corpse = props.corpse || false;
};

module.exports = Character;
