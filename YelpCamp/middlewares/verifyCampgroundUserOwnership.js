const Campground = require('./../models/campground');

module.exports = (req, res, next) => {
    const id = req.params.id;
    const userId = req.user._id;

    Campground.findById(id).then(campground => {
        if (!campground) throw new Error('Campground not found!');
        
        //If the campground belongs to the user that is trying to edit/modify it they should be allowed
        campground.author.id.equals(userId) ? next() : res.redirect('back');        
    }).catch(err => {
        req.flash('error', err.message);
        res.redirect('back');
    });
};