// All schemas here.

module.exports = function (mongoose) {
    "use strict";

    var schemas = {}, setSchema = function (name, fields) {
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
};
