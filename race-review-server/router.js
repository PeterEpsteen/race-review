const Auth = require('./controllers/authentication');
const Comment = require('./controllers/comments');
const Race = require('./controllers/race');
const passportService = require('./services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send('authenticated...');
    });
    // Auth
    app.post('/signin', requireSignin, Auth.signin);
    app.post('/signup', Auth.signup);

    //Race
    app.get('/race/params', Race.raceParams)    
    app.post('/race', requireAuth, Race.createRace);
    app.put('/race', requireAuth, Race.editRace);
    app.put('/race/rate', requireAuth, Race.rateRace);
    app.delete('/race', requireAuth, Race.deleteRace);
    app.get('/race', requireAuth, Race.getRaces);

    //Comments
    app.post('/comment/new', requireAuth, Comment.createCommentThread);
    app.post('/comment/reply', requireAuth, Comment.replyComment);
    app.get('/comment', requireAuth, Comment.getComments);
    app.put('/comment', requireAuth, Comment.editComment);
    app.delete('/comment', requireAuth, Comment.deleteComment);
}