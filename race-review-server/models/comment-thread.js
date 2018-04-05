
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentThread = new Schema({
    race: {type: Schema.Types.ObjectId, ref: 'Race', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    body: String,
    date: {type: Date, default: Date.now},
    children: [{type: Schema.Types.ObjectId, ref: 'CommentChild'}]
});

const ModelClass = mongoose.model('CommentThread', commentThread);

module.exports = ModelClass;