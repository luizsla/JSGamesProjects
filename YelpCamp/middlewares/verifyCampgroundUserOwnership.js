const Campground = require('./../models/campground');

const verifyCampgroundUserOwnership = (req, res, next) => {
    const id = req.params.id;
    const userId = req.user._id;

    Campground.findById(id).then(campground => {
        //If the campground belongs to the user that is trying to edit/modify it they should be allowed
        if (campground.author.id.equals(userId)) {
            next();
        } else {
            res.redirect('back');
        }        
    }).catch(err => res.redirect('back'));
};


module.exports = verifyCampgroundUserOwnership;