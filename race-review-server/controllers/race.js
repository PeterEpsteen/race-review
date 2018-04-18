const Race = require('../models/race');
const User = require('../models/user');
const raceParams = require('../models/raceConstants'); 

exports.getRaces = function(req, res, next) {
    Race.find()
    .populate('postedBy')
    .exec()
    .then((data) => res.send(data))
    .catch(err => res.status(500).send({err: err}));
}

exports.getRaceById = (req, res, next) => {
    Race.findById(req.params.id)
    .populate('postedBy')
    .populate('CommentThread')
    .exec()
    .then(race => {
        return res.send(race);
    })
    .catch(err => res.status(404).send({err}));
}

exports.createRace = function(req, res, next) {
    // Add race
    const raceObj = req.body.race;
    const race = new Race(raceObj);
    race.set('postedBy', req.user.id);

    race.save((err) => {
        if (err)
            return next(err);
        res.json({success: true, saved: race});
    });
}

exports.rateRace = function(req, res, next) {
    const raceId = req.body.raceId;
    const userId = req.user.id;
    const newRating = req.body.rating;
    User.findById(userId)
    .exec()
    .then(user => {
        if (!user) return res.status(400).send({message: "no user"});
        if (user.ratedRaces.indexOf(raceId) > -1) return res.status(400).send({message: 'You already rated this race'});
        user.ratedRaces.push(raceId);
        user.save((err) =>{
            if (err) return res.status(400).send({err: err});
            Race.findById(raceId)
            .exec()
            .then(race => {
                if (!race) return res.status(400).send({message: "no race"});
                let rating = race.rateValue;
                let rateCount = race.ratingCount || 0;
                race.set({rateValue: rating + newRating});
                race.set({ratingCount: rateCount + 1});
                race.save((err, race) => {
                    if (err) return res.status(400).send({error: true, message: err});
                    return res.json(race);
                });
            }); 
        });
    });
}

exports.deleteRace = function(req, res, next) {

}

exports.editRace = function(req, res, next) {
    const oldName = req.body.oldName;
    const raceObj = req.body.race;

    Race.findOneAndUpdate({postedBy: req.user.id, name: oldName}, raceObj, (err, race) => {
        if (err) return next(err);
        if (!race) res.status(500).send({error: 'No race found.'});
        res.json(race);
    });
}

exports.raceParams = function (req, res, next) {
    res.send({params: raceParams});
}