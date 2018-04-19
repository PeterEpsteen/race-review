const CommentThread = require('../models/comment-thread');
const CommentChild = require('../models/comment-child');
const Race = require('../models/race');

exports.getComments = function(req, res, next) {
    Race.findOne({_id: req.params.id})
    .exec()
    .then((race) => {
        if (!race) {
            return res.status(404).send({message: "No race found"});
        }
        CommentThread.find({race: race})
        .populate('children')
        .populate('user')
        .exec()
        .then((comment) => {
            if (!comment)
                return res.status(404).send({message: 'No comments found'});
            res.json({comments: comment});
        })
    })
    .catch(err => next(err));
}

exports.createCommentThread = function(req, res, next) {
    const commentThread = new CommentThread(req.body.comment);
    const race = new Race();
    Race.findOne({name: req.body.race.name})
    .exec()
    .then((race) => {
        if (!race) return res.status(500).send({message: 'No race found'});
        commentThread.set({race: race});
        commentThread.set({user: req.user.id});
        commentThread.save((err, comment) => {
            if (err) return next(err);
            if (!comment) return res.status(500).send({error: true, message: 'Problem saving comment'});
            res.json(comment);
        });
    })
    .catch((err) => next(err));   
}

exports.replyComment = function(req, res, next) {
    const comment = new CommentChild(req.body.comment);
    comment.set({user: req.user.id});
    comment.set({parent: req.body.threadId});
    CommentThread.findById(req.body.threadId)
    .exec()
    .then((thread) => {
        if (!thread) return res.status(404).send({message: "Thread no found"});
        thread.children.push(comment);
        thread.save((err, thread) => {
            if (err) return next(err);
            if (!thread) return res.status(500).send({message: "Error saving thread"});
            comment.save((err, comment) => {
                if (err) return next(err);
                if (!comment) return res.status(500).send({message: "Error saving comment"});
                return res.json({comment});
            });
        });
    })
    .catch(err => next(err));
}

exports.deleteComment = function(req, res, next) {
    // Delete comment body
}

exports.editComment = function(req, res, next) {

}