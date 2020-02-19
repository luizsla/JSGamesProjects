//Requiring node_modules
const express = require('express');
const router = express.Router({mergeParams: true});
//Requiring application routes.
const Campground = require('./../models/campground');
//Requiring middlewares
const isLoggedIn = require('./../middlewares/isLoggedInMiddleware');
const verifyCampgroundUserOwnership = require('./../middlewares/verifyCampgroundUserOwnership');

/**
 * SHOW campgrounds route.
 * params {req, res}
 */
router.get("/", (req, res) => {
	//Pegando os campgrounds e renderizando a página de campos.
	Campground.find({}).then(campgrounds => {
		res.render("campgrounds/index", {campgrounds: campgrounds, title: "Campgrounds"});
	});
});

/**
 * CREATE campgrounds route
 */
router.get("/create", isLoggedIn, (req, res) => res.render("campgrounds/create", {title: "Add a new campground"}));

/**
 * STORE campground route
 */
router.post("/", isLoggedIn, (req, res) => {
	//Recebendo os valores via post Request
	let newCampground = {
		name: req.body.campground.name,
		image: req.body.campground.image_url,
		description: req.body.campground.description,
		author: {
			id: req.user._id,
			username: req.user.username,
		},
	};
	
	//Instanciando um novo modelo
	newCampground = new Campground(newCampground);
	//Salvando o novo modelo e retornando a página de campgrounds
	newCampground.save().then(() => res.redirect('/campgrounds')).catch(err => console.log('Sorry, try again!'));
});

/**
 * SHOW campground route
 */
router.get("/:id", (req, res) => {
	const id = req.params.id;
	
	Campground.findById(id).populate('comments').then(campground => res.render('campgrounds/show', {
		campground: campground,
		title: `Campground ${campground.name}`,
	}));
});

/**
 * EDIT campground route
 */
router.get('/:id/edit', [isLoggedIn, verifyCampgroundUserOwnership], (req, res) => {
	const id = req.params.id;

	Campground.findById(id).then(campground => res.render('campgrounds/edit', {
		campground: campground,
		title: `Edit campground ${campground.name}`,	
	}));
});

/**
 * UPDATE campground route
 */
router.put('/:id', [isLoggedIn, verifyCampgroundUserOwnership], (req, res) => {
	//Getting the campground's id
	const id = req.params.id;
	//Building the object with the new data
	const newCampgroundData = {
		name: req.body.campground.name,
		image: req.body.campground.image_url,
		description: req.body.campground.description,
	};
	//Finding and updating the campground
	Campground.findByIdAndUpdate(id, newCampgroundData).then(newlyUpdatedCampground => {
		res.redirect('/campgrounds');
	}).catch(err => console.log(err));
});

/**
 * DESTROY campground route
 */
router.delete('/:id', [isLoggedIn, verifyCampgroundUserOwnership], (req, res) => {
	const id = req.params.id;

	Campground.findByIdAndDelete(id).then(() => res.redirect('/campgrounds'));
});


module.exports = router;