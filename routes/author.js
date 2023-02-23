const express = require('express');
const router = express.Router({mergeParams: true});
const { asyncErrorHandler } = require('../middleware/index');
const { getAuthorProfiles, getAuthorShow } = require('../controllers/index');


/* GET /search */
router.get('/search',  asyncErrorHandler(getAuthorProfiles));

/* GET author/:id */
router.get('/:id', asyncErrorHandler(getAuthorShow));

module.exports = router;

