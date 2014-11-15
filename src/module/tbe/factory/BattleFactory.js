module.exports = function () {
    return function (generator) {
        var scope = this;
        this.getBattle = function (args) {
            return generator(args);
        };
    };
};
