//Requiring node_modules
const express = require('express');
const router = express.Router({mergeParams: true});
//Requiring application routes
const [Campground, Comment] = [require('./../models/campground'), require('./../models/comment')];
//Requiring application middlewares.
const isLoggedIn = require('./../middlewares/isLoggedInMiddleware');
const verifyCommentUserOwnership = require('./../middlewares/verifyCommentUserOwnership');

/**
 * CREATE comment route.
 */
router.get('/create', isLoggedIn, (req, res) => {
	//Getting the campground id
	const id = req.params.id;
	//finding the campground.
	Campground
		.findById(id)
		.then(campground => {
			if (!campground) throw new Error('Campground not found!');

			res.render('comments/create', {campground, title: `Adding a comment to ${campground.name}`});
		})
		.catch(err => {
			req.flash('error', err.message);
			res.redirect('back');
		});
});

/**
 * STORE comment route.
 */
router.post('/', isLoggedIn, (req, res) => {
	//Getting the campground id
	const id = req.params.id;
	//finding the campground.
	Campground
		.findById(id)
		.then(campground => {
			if (!campground) throw new Error('Campground not found!');

			//Getting the commnet's values from the form and the logged in user.
			const newCommentData = {
				text: req.body.comment,
				author: {
					id: req.user._id,
					username: req.user.username,
				},
			};

			//Creating a new comment instance and then appending it to the campground
			Comment.create(newCommentData).then(newCreatedComment => {
				//Adding the new comment to campground
				campground.comments.push(newCreatedComment);
				//Saving and redirecting to the campground show page
				campground
					.save()
					.then(campground => {
						req.flash('success', `Comment added to ${campground.name}`);
						res.redirect(`/campgrounds/${campground._id}`);
					});
			}).catch(() => {
				req.flash('error', 'Unable to create comment. Please try again later');
				res.redirect('back');
			});
		}).catch(err => {
			req.flash('error', err.message);
			res.redirect('back');
		});
});


/**
 * EDIT comment route.
 */
router.get('/:comment_id/edit', [isLoggedIn, verifyCommentUserOwnership], (req, res) => {
	const commentId = req.params.comment_id; 
	
	Comment
		.findById(commentId)
		.then(comment => {
			if (!comment) throw new Error('Comment not found!');

			res.render('comments/edit', { campground_id: req.params.id, comment, title: "Edit your comment"});
		})
		.catch(err => {
			req.flash('error', err.message);
			res.redirect('back');
		});
});


/**
 * UPDATE comment route.
 */
router.put('/:comment_id', [isLoggedIn, verifyCommentUserOwnership], (req, res) => {
	//Mounting the new comment's content
	const commentId = req.params.comment_id;
	const newCommentData = {
		text: req.body.comment,
	};
	//Finding the right comment and updating it.
	Comment
		.findByIdAndUpdate(commentId, newCommentData)
		.then(() => {
			res.redirect(`/campgrounds/${req.params.id}`);
		})
		.catch(() => {
			req.flash('danger', 'It was not possible to update the comment');
			res.redirect('back');
		});
});

/**
 * DESTROY comment route.
 */
router.delete('/:comment_id', [isLoggedIn, verifyCommentUserOwnership], (req, res) => {
	Comment
		.findByIdAndDelete(req.params.comment_id)
		.then(() => {
			req.flash('info', 'Comment deleted');
			res.redirect(`/campgrounds/${req.params.id}`);
		})
		.catch(() => {
			req.flash('It was not possible to delete comment');
			req.redirect('back');
		});
});	

module.exports = router;