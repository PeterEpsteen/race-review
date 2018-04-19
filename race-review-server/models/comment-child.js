const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentChild = new Schema({
    parent: {type: Schema.Types.ObjectId, ref: 'CommentThread'},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    body: {type: String, required: true, minlength: 8},
    date: {type: Date, default: Date.now},
});

const ModelClass = mongoose.model('CommentChild', commentChild);

module.exports = ModelClass;