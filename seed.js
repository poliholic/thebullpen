// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

 var db = require('./models'); // This is the index.js file.


let nudate_listings = [
    {
        name: 'Patty',
        location: ['Robber Baron', 'Russian Hill'],
        moment: 'Wednesday at 7pm',
        secretSign: 'Right fist stretched skyward',
        image: 'http://i.imgur.com/julGhCks.png'
    },
    {
        name: 'Sally',
        location: ['Monaghans', 'Marina'],
        moment: 'Monday at 6:30',
        secretSign: 'Holding a blank sheet of white paper',
        image: 'http://i.imgur.com/K6a5ilPs.jpg'
    },
    {
        name: 'Marci',
        location: ['The Mixx', 'Castro'],
        moment: 'Sunday Brunch',
        secretSign: 'I will put on rounded mirrored glasses',
        image: 'http://i.imgur.com/6baH2JXs.png'
    },
    {
        name: 'Little Red-Haired Girl',
        location: ['The Northstar', 'North Beach'],
        moment: 'Tuesday at 7pm',
        secretSign: 'My arms will be outstretched as if awaiting a hug',
        image: 'http://i.imgur.com/YRR9I6Js.jpg'
    }
]

// Remove everything first.
db.Nudate.remove({}, function() {
    console.log('getting rid of what is not there');
    //
    db.Nudate.create(nudate_listings, function(err, nudatesArray){
        if (err) {
          console.log(err);
          return;
        }
        console.log('If this doesnt work Ill just die');
        console.log("It worked ", nudatesArray.length, " times!");
    })

})
