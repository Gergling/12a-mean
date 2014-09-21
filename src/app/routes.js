module.exports = function(app, mongoose) {
    var characterSchema = mongoose.Schema({
        id: Number,
        name: String,
        health: Number
    });
    var Character = mongoose.model('Character', characterSchema);

    // API
    app.get('/api/nerds', function(req, res) {
        // use mongoose to get all nerds in the database
        Nerd.find(function(err, nerds) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    });

    app.get('/count', function(req, res) {
        var count = 5;
        console.log(res.constructor.prototype);
        res.send(count + "");
    });

    app.post('/test', function(req, res) {
        // battle_id can be authenticated against any involved players (probably just the one for these purposes)
        // delta: a complete game state object including only changes to the game state, so that the game state should be extendable with that data.
        // - while efficient for sending the data, may be impractical to implement
        // - for now just return the full game state
        var health = 0;
        Character.findOne({id: 2}, function (err, character) {
            if (!character) {
                // create
                character = new Character({id: 2, health: 0});
            }
            character.health += 1;
            character.save(function(err) {
                if (err) {
                    console.log('error saving character');
                    console.log(err);
                } else {
                    console.log('character saved'); 
                }
            });

            res.send({game_state: {battle_id: 1, characters: {2: {health: character.health}}}});
        });
    });

    // route to handle creating (app.post)
    // route to handle delete (app.delete)

    // Frontend
    app.get('/', function(req, res) {
        res.locals.stuff = "more stuff!";
        res.sendFile('public/index.html');
    });

    // Everything else
    app.get('*', function(req, res) {
        res.send("404'd");
        res.status(404).end();
    });

};