module.exports = function (context) {
    "use strict";

    // Ship is in pursuit of another ship.
    // Abilities generally include speeding up and
    // trying to slow down the target with persuasion 
    // or weapons, depending on how the engineer/tactical
    // has buffed the ship.
    context.setCharacterFactory("vessel", {
        capacitors: {
            distance: new Capacitor(),
            speed: new Capacitor()
        }
    });
};
