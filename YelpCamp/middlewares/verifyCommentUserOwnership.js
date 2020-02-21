const Comment = require('./../models/comment');

module.exports = (req, res, next) => {
    const id = req.params.comment_id;
    const userId = req.user._id;

    Comment.findById(id).then(comment => {
        if (!comment) throw new Error('Comment not found');

        //If the campground belongs to the user that is trying to edit/modify it they should be allowed
        comment.author.id.equals(userId) ? next() : res.redirect('back');      
    }).catch(err => {
        req.flash('error', err.message);
        res.redirect('back');
    });
};