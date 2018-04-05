const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bikeType = ['Mountain', 'Road', 'Cyclocross', 'Track', 'Fixed'];
const raceType = ['XC', 'Enduro', 'Road Race', 'Criterium', 'Circuit Race', 'Downhill', 'Track'];

const raceSchema = new Schema({
    name: {type: String, required: true, unique: true, minlength: 6, index: true},
    bikeType: {type: String, enum: bikeType, required: true},
    raceType: {
        type: String,
        enum: raceType, 
        required: true
    },
    location: {
        street: String,
        city: {type: String, required: true}, 
        state: {type: String, required: true}, // Validate 
        region: String, // Validate
        country: String 
    },
    organizer: String,
    postedBy: {type: Schema.Types.ObjectId, ref:'User', required: true},
    postDate: {type: String, default: Date.now},
    ratingCount: {type: Number, default: 0},
    rateValue: {type: Number, default: 0},
    commentThreads: [{type: Schema.Types.ObjectId, ref: 'CommentThread'}],
    currentRaceDate: Date,
    pastRaceDates: [{date: Date}]
});

const ModelClass = mongoose.model('race', raceSchema);

module.exports = ModelClass;