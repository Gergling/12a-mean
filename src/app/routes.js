module.exports = function(app) {
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