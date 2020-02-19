const express = require('express');
const router = express.Router({mergeParams: true});

/**
 * First application endpoint. Index page
 */
router.get("/", (req, res) => res.render("index", {title: "Home"}));


module.exports = router;