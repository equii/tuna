
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { username: req.user.username, msg : req.session.messages });
};