var paths = require("./local-paths"),
    mongoose = require('mongoose');

module.exports = {
    tbe: require(paths.module + 'tbe/schema')(mongoose)
};
