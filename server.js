// require express and other modules
var express = require('express'),
    app = express(),
    db = require('./models');

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Claiming this site is like DaVinci signing a kindergarten crayon drawing. PS Yes I know DaVinci neither had crayons nor called it kindergarten.",
    documentationUrl: "https://github.com/poliholic/poliholicAPI/README.md",
    baseUrl: "https://poliholic.herokuapp.com",
    endpoints: [
        {method: "GET", path: "/api", description: "Describes all available endpoints."},
        {method: "GET", path: "/api/profile", description: "Who I am and where I'm from."},
        {method: "GET", path: "/api/nudates", description: "Shows all the posted dates where The Bullpen may be needed."},
        {method: "POST", path: "/api/nudates", description: "Posts a planned Tinder etc date that, let's face it, will go horribly."},
        {method: "PUT", path: "/api/nudates/:id", description: "Edit a posted date, because someone's late or the location moved."},
        {method: "DELETE", path: "/api/nudates/:id", description: "Well whaddaya know? This is turning out okay. Delete! Delete!"}
    ]
  })
});

// Profile.
app.get('/api/profile', function profile(req, res) {
    res.json({
        name: 'Ryan Kelly',
        githubUsername: 'poliholic',
        githubLink: 'https://github.com/poliholic',
        githubProfileImage: 'https://avatars2.githubusercontent.com/u/27571263?v=3&u=0b102a04db3ca719b4848b76e6da9bd024332168&s=400',
        personalSiteLink: 'https://poliholic.github.io/',
        currentCity: 'Russian Hill, San Francisco',
        pets: [{name: 'Bandito', type: 'Duck', breed: 'Rubber'},
              {name: 'Triumph', type: 'Thunderbird', breed: 'Cafe Racer'},
              {name: 'Lou', type: 'Seal', breed: 'World Champion'}]
    })
});


// Index: Get all nudates.
app.get('/api/nudates', function showNudates(req, res) {
    db.Nudate.find({}).exec(function(err, nudates) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(nudates);
    })
})

// Show.
app.get('/api/nudates/:id', function showOneNudate(req, res) {
    db.Nudate.findById(req.params.id)
        .exec(function(err, nudate) {
        if (err) {
            res.sendStatus(404);
            return;
        }
        res.json(nudate);
    })
})

// Create.
app.post('/api/nudates', function addNudate(req, res) {
    console.log(req.body);
    db.Nudate.create({
        name: req.body.name,
        location: req.body.location,
        moment: req.body.moment,
        secretSign: req.body.secretSign,
        image: req.body.image
    }, function(err, nudate) {
        if (err) {
            return console.log('This is a save err: ' + err);
        }
        console.log(nudate.name, ' is saved! Yay!');
        // send back the date.
        res.json(nudate);
    });
})

// Update.
app.put('/api/nudates/:id', function(req, res) {
    let nudate = db.Nudate.findById(req.params.id, function(err, nudate) {
        if (err) {
           console.log('error, date not found');
        }
        let formData = {
            name: req.body.name || nudate.name,
            location: req.body.location  || nudate.location,
            moment: req.body.moment || nudate.moment,
            secretSign: req.body.secretSign || nudate.secretSign,
            image: req.body.image || nudate.image
        };
        db.Nudate.update(nudate, formData, function(err, updatedNudateListings) {
            if (err) {
               console.log('update date failed!');
            }
            res.send(updatedNudateListings);
            console.log('nudate updated!');
        });
    });
});

// Delete.
app.delete('/api/nudates/:id', function (req, res) {
    db.Nudate.findOneAndRemove({ _id: req.params.id }, function (err, deletedNudate) {
        res.json(deletedNudate);
    })
})


/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function(){
    console.log('Beuller? Bueller? Bueller?');
});
