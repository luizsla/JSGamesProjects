
//Requiring node_modules
const [express, passport] = [require('express'), require('passport')];
const router = express.Router({mergeParams: true});
//Requirering application modules.
const User = require('./../models/user');
//Getting middlewares
const isLoggedIn = require('./../middlewares/isLoggedInMiddleware');

/**
 * CREATE Auth user route.
 */
router.get('/register', (req, res) => {
	res.render('auth/register', {title: 'Register to YelpCamp'});
});	

/**
 * STORE Auth user route.
 */
router.post('/register', (req, res) => {
	//Criating new user
	const newUser = new User({username: req.body.username});
	//Registering their password.
	User.register(newUser, req.body.password).then(user => {
		//Authenticating the user
		passport.authenticate('local')(req, res, () => {
			req.flash('success', `Welcome to YelpCamp ${req.user.username}!`);
			res.redirect('/campgrounds');
		});
	}).catch(err => {
		req.flash('error', 'Something went wrong, please try again later!');
		res.redirect('/auth/register');
	});
});

/**
 * Login Auth create route.
 */
router.get('/login', (req, res) => {
	res.render('auth/login', {title: 'Login to YelpCamp'});
});

/**
 * Login Auth route.
 */
router.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/auth/login',
	failureFlash: 'Wrong credentials, please try again!',
	successFlash: `Welome to YelpCamp!`,
	successMessage: "Bem vindo ao sistema!",
}), (req, res) => {});

/**
 * Logout Auth route.
 */
router.get('/logout', isLoggedIn, (req, res) => {
	req.flash('info', `We'll miss you ${req.user.username} :)`);
	req.logout();
	res.redirect('/auth/login');
});

module.exports = router;