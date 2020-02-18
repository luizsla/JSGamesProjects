//Carregndo os node_modules da aplicação.
const [express, bodyParser, passport, localStrategy] = [require('express'), require('body-parser'), require('passport'), require('passport-local')];
//Carregando os modelos do app.
const [Campground, Comment, User] = [require('./models/campground'), require('./models/comment'), require('./models/user')];
//O objeto de configurações.
const config = require('./config');
//Configuring the app.
const app = express();

//Setting up view engine to be ejs.
app.set("view engine", config.viewEngine);
//Configuring static folders file
app.use(express.static(__dirname + '/public'));
//Setting up body-parser to be listening to post requests.
app.use(bodyParser.urlencoded({extended: true}));
//Setting express session up
app.use(require('express-session')({
	secret: "Luiz is a PHP and JavaScript developer",
	resave: false,
	saveUninitialized: false,
}));

//Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Injecting the user in all responses.
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});


/**
 * Application middlewares
 */
const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();

	res.redirect('/login');
};


/**
 * Application Routes
 */
app.get("/", (req, res) => res.render("index", {title: "Home"}));

app.get("/campgrounds", (req, res) => {
	//Pegando os campgrounds e renderizando a página de campos.
	Campground.find({}).then(campgrounds => {
		res.render("campgrounds/index", {campgrounds: campgrounds, title: "Campgrounds"});
	});
});


app.get("/campgrounds/create", (req, res) => res.render("campgrounds/create", {title: "Add a new campground"}));

app.post("/campgrounds", (req, res) => {
	//Recebendo os valores via post Request
	let newCampground = {
		name: req.body.camp_name,
		image: req.body.camp_image,
	};
	
	//Instanciando um novo modelo
	newCampground = new Campground(newCampground);
	//Salvando o novo modelo e retornando a página de campgrounds
	newCampground.save().then(() => res.redirect('/campgrounds'));
});

/**
 * SHOW Route to the campground.
 */
app.get("/campgrounds/:id", (req, res) => {
	const id = req.params.id;

	Campground.findById(id).populate('comments').then(campground => res.render('campgrounds/show', {
		campground: campground,
		title: `Campground ${campground.name}`,
	}));
});

app.get('/campgrounds/:id/comments/create', isLoggedIn, (req, res) => {
	//Getting the campground id
	const id = req.params.id;
	//finding the campground.
	Campground.findById(id).then(campground => res.render('comments/create', {
		campground,
		title: `Adding a comment to ${campground.name}`,
	}));
});

app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
	//Getting the campground id
	const id = req.params.id;
	//finding the campground.
	Campground.findById(id).then(campground => {
		//Getting the commnet's values from the form
		const newCommentData = req.body.comment;
		//Creating a new comment instance and then appending it to the campground
		Comment.create(newCommentData).then(newCreatedComment => {
			//Adding the new comment to campground
			campground.comments.push(newCreatedComment);
			//Saving and redirecting to the campground show page
			campground.save().then(campground => res.redirect(`/campgrounds/${campground._id}`));
		}).catch(err => console.log(err));
	}).catch(err => console.log(err));
});


app.get('/register', (req, res) => {
	res.render('auth/register', {title: 'Register to YelpCamp'});
});	

app.post('/register', (req, res) => {
	//Criating new user
	const newUser = new User({username: req.body.username});
	//Registering their password.
	User.register(newUser, req.body.password).then(user => {
		//Authenticating the user
		passport.authenticate('local')(req, res, () => {
			res.redirect('/campgrounds');
		});
	}).catch(err => {
		console.log(err);
		res.redirect('/register');
	});
});

app.get('/login', (req, res) => {
	res.render('auth/login', {title: 'Login to YelpCamp'});
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login',
	failureMessage: "Não deu amigo!",
	successMessage: "Bem vindo ao sistema!",
}), (req, res) => {});


app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/login');
})

//Setting the server and the port to run the express app.
app.listen(config.port, () => {
	console.log(`Server started at port ${config.port}`);
});
