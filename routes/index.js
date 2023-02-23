const express = require('express');
const router = express.Router({mergeParams: true});
const multer = require('multer');


const { asyncErrorHandler, isLoggedIn, multerFilter, resizeUserPhoto } = require('../middleware/index');

const { landingPage, getRegister, postRegister, getLogin, postLogin, getLogout,                      getProfileTest, getProfile, profileEdit, profileUpdate, getWelcomeProfileForm, postProfileInfoSetup,
 getForgotPw, putForgotPw, getReset, putReset } = require('../controllers/index');

// const { router } = require('../app');

const multerStorage = multer.memoryStorage();
// configure middleware
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

// const upload = multer({dest: 'public/img/users'})

// root route - landing page
router.get('/', landingPage);

/* GET /signup */
router.get('/signup', getRegister);

/* POST /signup */
router.post('/signup', asyncErrorHandler(postRegister));

/* GET /login */
router.get('/login', getLogin);

/* POST /login */
router.post('/login', asyncErrorHandler(postLogin));

/* GET /logout */
router.get('/logout', getLogout)

/* GET /welcome profile steup */ 
router.get('/welcome', isLoggedIn, getWelcomeProfileForm);

/* POST /welcome */
router.post('/welcome', isLoggedIn,  asyncErrorHandler(postProfileInfoSetup));

router.get("/myprofile", isLoggedIn, asyncErrorHandler(getProfileTest));

/* GET /profile */
router.get('/author/myprofile',  asyncErrorHandler(getProfile))

router.get('/author/myprofile/:id/edit', asyncErrorHandler(profileEdit));

router.put('/author/myprofile/:id', upload.single('user[photo]'), resizeUserPhoto, asyncErrorHandler(profileUpdate))

/* GET /forgot */
router.get('/forgot-password', getForgotPw);

/* PUT /forgot */
router.put('/forgot-password', asyncErrorHandler(putForgotPw));

/* GET /reset/:token */
router.get('/reset/:token', asyncErrorHandler(getReset));

/* PUT /reset/:token */
router.put('/reset/:token', asyncErrorHandler(putReset));

module.exports = router;
