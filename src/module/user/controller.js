module.exports = (function () {
    var passport = require('passport'),
        //bcrypt = require('bcrypt'),
        LocalStrategy = require('passport-local').Strategy,
        User = require('./model/User'),
        isValidPassword = function(user, password){
            //return bCrypt.compareSync(password, user.password);
            return true;
        },
        createHash = function(password){
            //return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
            return password;
        };

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) { 
        // Todo: Returns a 404, but runs correctly. Investigate.
        // check in mongo if a user with username exists or not
        User.findOne({ 'username' :  username }, 
            function(err, user) {
                // In case of any error, return using the done method
                if (err) {return done(err); }
                // Username does not exist, log error & redirect back
                if (!user) {
                    console.log('User Not Found with username '+username);
                    return done(null, false, 
                    req.flash('message', 'User Not found.'));                 
                }
                // User exists but wrong password, log the error 
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false, req.flash('message', 'Invalid Password'));
                }
                // User and password both match, return user from 
                // done method which will be treated like success
                return done(null, user);
            }
        );
    }));

    passport.use('signup', new LocalStrategy({
        passReqToCallback : true
      },
      function(req, username, password, done) {
        findOrCreateUser = function(){
          // find a user in Mongo with provided username
          User.findOne({'username':username},function(err, user) {
            // In case of any error return
            if (err){
              console.log('Error in SignUp: '+err);
              return done(err);
            }
            // already exists
            if (user) {
              console.log('User already exists');
                console.log(req.constructor.name);
              //return done(null, false, 
                 //req.flash('message','User Already Exists'));
                //req.send({message: 'User Already Exists'}));
            } else {
              // if there is no user with that email
              // create the user
              var newUser = new User();
              // set the user's local credentials
              newUser.username = username;
              newUser.password = createHash(password);
              newUser.email = req.param('email');
              newUser.firstName = req.param('firstName');
              newUser.lastName = req.param('lastName');
     
              // save the user
              newUser.save(function(err) {
                if (err){
                  console.log('Error in Saving user: '+err);  
                  throw err;  
                }
                console.log('User Registration succesful');    
                return done(null, newUser);
              });
            }
          });
        };
         
        // Delay the execution of findOrCreateUser and execute 
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
      })
    );

    return {
        authenticated: function (req, res) {
            res.send(req.session);
            // req.session.passport.user has the mongo id
            // find the user with db.users.find({_id: ObjectId(id)})
        },
        // Todo: Login usually has a second function which runs immediately after
        /*login: passport.authenticate('login', {
            //successRedirect: '/home',
            //failureRedirect: '/',
            //failureFlash : true 
        }),*/
        login: function (req, res, next) {
            var response = {
                code: "error",
                type: "unknown",
                message: "An unknown error has occurred."
            };

            passport.authenticate('login', function(err, user, info) {
                if (err) {
                    response.message = err;
                } else {
                    if (!user) {
                        response.type = "nouser";
                        response.message = "There is no user with that name/password combination.";
                    } else {
                        req.logIn(user, function(loginError) {
                            if (loginError) {
                                response.type = "login";
                                response.message = loginError;
                            } else {
                                response.code = "success";
                                response.type = "";
                                response.message = "";
                            }
                        });
                    }
                }
                res.send(response);
            })(req, res, next);
        },
        register: function (req, res, next) {
            //res.send(req.session);
            //return req.session;
            passport.authenticate('signup', {
                //successRedirect: '/home',
                //failureRedirect: '/signup',
                //failureFlash : true 
            })(req, res, next);
            res.send(req.session);
        }
    };
}());