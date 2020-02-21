/**
 * Application middlewares
 */
module.exports = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	
	req.flash('warning', 'You need to be logged in to proceed!');

	res.redirect('/auth/login');
};