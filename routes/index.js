/*
* GET home page.
*/
exports.index = function(req, res, next){
    var message = '';

    var user =  req.session.user,
    userId = req.session.userId;

    if(userId == null)
    {
    	//direct to home page
      	res.render('index',{message: message});
      	return;
    }
    else
    {
    	//the use is logged in
		res.redirect('/messaging/home');
    }
};

