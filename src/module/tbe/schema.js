// All schemas here.
// Todo: Investigate how schemas and models are created.
module.exports = (function () {
    "use strict";

    var mongoose = require('mongoose'),
        schemas = {},
        setSchema = function (name, fields) {
            var schema = mongoose.Schema(fields);
            schemas[name] = {
                schema: schema,
                newModel: function () {return mongoose.model(name, schema);}
            };
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
        battle_factory: String,
        participants: [schemas.Character.schema]
    });
    return schemas;
}());
