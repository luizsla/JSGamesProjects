const Comment = require('./../models/comment');

const verifyCommentUserOwnership = (req, res, next) => {
    const id = req.params.comment_id;
    const userId = req.user._id;

    Comment.findById(id).then(comment => {
        //If the campground belongs to the user that is trying to edit/modify it they should be allowed
        if (comment.author.id.equals(userId)) {
            next();
        } else {
            res.redirect('back');
        }        
    }).catch(err => res.redirect('back'));
};


module.exports = verifyCommentUserOwnership;