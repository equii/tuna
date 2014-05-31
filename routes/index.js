
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title : "Tuna: index", email: req.user.email, msg : req.session.messages });
  req.session.messages = ''; // clear message after using it, not sure if this is the right way, but it seems to work
};