//Carregndo os node_modules da aplicação.
const [express, bodyParser, mongoose, passport, localStrategy, methodOverride] = [require('express'), require('body-parser'), require('mongoose'), require('passport'), require('passport-local'), require('method-override')];
//Loading the application routes.
const [indexRoutes, authRoutes, campgroundRoutes, commentsRoutes] = [require('./routes/index'), require('./routes/auth'), require('./routes/campgrounds'), require('./routes/comments')];
//Carregando o modelo do usuário para ser usado pelo passport.
const User = require('./models/user');
//O objeto de configurações.
const config = require('./config');
//Loading and configuring the db.
mongoose.connect(config.db.connection, config.db.options);
//Configuring the app.
const app = express();

//Setting up view engine to be ejs.
app.set("view engine", config.viewEngine);
//Configuring static folders file
app.use(express.static(__dirname + '/public'));
//Setting up body-parser to be listening to post requests.
app.use(bodyParser.urlencoded({extended: true}));
//Setting up the method override
app.use(methodOverride((req, res) => {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		const method = req.body._method;
		delete req.body._method;
		return method;
	}
}));
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

//Registering the application routes.
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentsRoutes);

//Setting the server and the port to run the express app.
app.listen(config.port, () => {
	console.log(`Server started at port ${config.port}`);
});
