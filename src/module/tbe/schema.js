// All schemas here.

module.exports = function (mongoose) {
    "use strict";

    var list = [], schemas = {}, setSchema = function (name, fields) {
        list.push({name: name, fields: fields});
    };
    setSchema("Player", {
        name: String
    });
    setSchema("Character", {
        control: Number, // Player id
        id: Number,
        name: String,
        health: Number
    });
    setSchema("Context", {
        name: String
    });
    setSchema("Battle", {
        context: Number,
        name: String,
        health: Number
    });
    list.forEach(function (item) {
        var schema = mongoose.Schema(item.fields),
            model = mongoose.model(item.name, item.fields);
        schemas[item.name] = {
            schema: schema,
            model: model
        };
    });
    return schemas;
};