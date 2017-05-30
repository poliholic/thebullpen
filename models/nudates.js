const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a sub Schemas?
//TODO pull OpenTable data?!? Haha who are you kidding...
const LocationSchema = new Schema({
    estName: String,
    street: String,
    hood: String
})

const MomentSchema = new Schema ({
    day: Date,
    time: Number
})
//TODO: Fix required fields vis-a-vis auto-filled field prompts. Prompts now satisfy fields.
 const NudateSchema = new Schema({
     name: {
         type: String,
         required: [true, 'Yeah but ya gotta put SOMEthing']
            },
     location: { //TODO: add LocationSchema
         type: String,
         required: [true, 'What are we supposed to guess?']
              },
     moment: { //TODO: add MomentSchema
         type: String,
         required: [true, '7? Should we say 7?']
            },
     secretSign: {
         type: String,
         required: [true, 'Something more specific than The Blonde With The Red Wine']
            },
     image: {
         type: String,
         required: [true, 'Paste a URL here, or else hit the spacebar to make up for an incompetent coder']
          }
 });

 const Nudate = mongoose.model('Nudate', NudateSchema);

 module.exports = Nudate;
