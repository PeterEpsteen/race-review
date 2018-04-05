const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    username: {type: String, lowercase: true, unique: true, required: true},
    email: {type: String, lowercase: true, unique: true, required: true},
    password: {type: String, required: true}
});

userSchema.pre('save', function(next){
    console.log('pre called...');
    const user = this;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) 
            return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) 
                return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
}

const ModelClass = mongoose.model('User', userSchema);

module.exports = ModelClass;