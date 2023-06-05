const User = require('../models/user/user');
const Author = require("../models/user/author");
const Book = require("../models/book");
const Article = require("../models/article");
const util = require("util");
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const multer = require('multer');
const sharp = require('sharp'); 
const { read } = require('fs');
const { cloudinary } = require('../cloudinary');
const { search } = require('../routes');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// configure multer storage
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb ) => {
//         cb(null, 'public/img/users');
//     },
//     filename: (req, file, cb) => {
//         //get file extension
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user${req.user.id}-${Date.now()}.${ext}`);
//     }
// });

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

const multerStorage = multer.memoryStorage();

// verify image uploads


module.exports = {
  
    //GET / - home page 
    landingPage(req, res, next) {
        res.render('index', {title: "SprinNG - Home"});
    }, 

    //GET /register
    getRegister(req, res, next) {
        res.render('signup', {title: 'Signup', firstname: '', lastname: ''});
    },

    //POST /register
    async postRegister(req, res, next) {
        try {

            let newUser = new User({
                firstName: req.body.firstName, 
                lastName:  req.body.lastName, 
                username: req.body.username
            });
            await User.register(new User(newUser), req.body.password);
            req.login(newUser, function(err){
                if (err) return next(err);
                req.session.success = `Welcome to SprinNG Writer's Database!`;
                console.log("the reqeust object =======> ", req.user);
                console.log("the reqeust object userID =======> ", req.user._id);

                res.redirect('/welcome'); //TODO: 
            });
        }catch(err){
            const { firstname, lastname, email } = req.body;
            let error = err.message;
            if(error.includes('duplicate') && error.includes('index: email_1 dup key')){
                error = 'A user with the given username/email is already registered';
            }
            res.render('signup', {title: 'Signup', firstname, lastname, email, error: error})
        }
    },

    //GET /login
    getLogin(req, res, next){
        res.render('login', {title: 'Login'});
    },

    // POST /Login
    async postLogin(req, res, next){
        const { username, password } = req.body;
        const {user, error } = await User.authenticate()(username, password);
        console.log("user------>", JSON.stringify(user, undefined, 2));
        if(!user && error) {
            let err =  error.message;
            res.render('login', {error: err})
            //return next(error);
        }else {
        req.login(user, function(err){
            if (err) return next(err);
            req.session.success = `Welcome back, ${user.firstName} ${user.lastName}!`;
            const redirectUrl = req.session.redirectTo || '/author/myprofile';
            delete req.session.redirectTo;
            res.redirect(redirectUrl);
        })
    }
    },

    // GET /logout 
    getLogout(req, res, next){
        req.logout();
        req.session.success = 'Logged out successfully!'
        res.redirect('/');
    },

    // GET /profile-setup
    getWelcomeProfileForm(req, res, next){
        res.render('welcome');
    },

    async postProfileInfoSetup(req, res, next){
        //create author profile
        console.log("in profile setup post logic ====> ", req.user);

        req.body.userInfo.userID = req.user;

         //assign authorID referenced in books and articles
        //  req.body.bookInfo.authorID = authorInfo._id;
        //  req.body.articleInfo.authorID = authorInfo._id;

        let authorInfo = new Author(req.body.userInfo);
        let bookInfo = new Book(req.body.bookInfo);
        let articleInfo = new Article(req.body.articleInfo);

        //assign book and article information to author model
        authorInfo.books.push(bookInfo);
        authorInfo.articles.push(articleInfo);

        //save author information
        await authorInfo.save();

        //assign authorID referenced in books and articles
        bookInfo.authorID = authorInfo._id;
        articleInfo.authorID = authorInfo._id;
        
        //
        // req.user.photo = authorInfo.photo; 
        //save book and article information
        await bookInfo.save();
        await articleInfo.save();

        console.log("body parse ========>", req.body); // for debugging purposes
    
        req.session.success = 'Profile setup successfully completed!';
        res.redirect("/author/myprofile");
      
    },

    async getProfileTest(req, res, next){
        // const author = await Author.find().where('userID').equals(req.user);
        const author = await Author.find({}).populate({ 
            path: 'books', 
            populate:{
                path: 'books', 
                // model: 'Author'
            },
        }).populate({ 
            path: 'articles',
            populate:{
                path: 'articles', 
                // model: 'Author'
            } 
        }).populate({ 
            path: 'userID',
            model: 'User'
        })
        console.log("getting profile data testing ======> ", JSON.stringify(author, undefined, 2))
        res.json(author); 
    },

    async getAuthorProfiles(req, res, next){
    //    eval(require('locus'));
       let { search_key } = req.query;
       const dbQueries = [];
       if(search_key){
        let search = new RegExp(escapeRegExp(search_key), 'gi');
         const query = { 
            $or: [
                {"UserID.firstName": search},
                {"UserID.lastName": search},
                {location: search}
            ]
         };
            const profiles = await Author.find({query}).populate({
            path: 'books',
            populate: {
                path: 'authorID',
                model: 'Author'
            }
            }).populate({
                path: 'articles',
                populate:{
                    path: 'authorID', 
                    model: 'Author'
            } 
            }).populate({ 
                path: 'userID',
                model: 'User'
            })
           
        //   console.log("author profile search =======> ", profiles);
          res.render('author/index', { profiles: profiles })

       } 
    },

    async getAuthorShow(req, res, next){
        let profile = await Author.findById(req.params.id).populate({
            path: 'books',
            populate: {
                path: 'authorID',
                model: 'Author'
            }
            }).populate({
                path: 'articles',
                populate:{
                    path: 'authorID', 
                    model: 'Author'
            } 
            }).populate({ 
                path: 'userID',
                model: 'User'
            })
            console.log("show author profile ===> ", profile)
            res.render('author/show', { profile });
    },

    // GET /profile
    async getProfile(req, res, next){
        const authorProfile = await Author.find().populate({
            path: 'books',
            populate: {
                path: 'authorID',
                model: 'Author'
            }
        }).populate({
            path: 'articles',
            populate:{
                path: 'authorID', 
                model: 'Author'
            } 
        }).populate({ 
            path: 'userID',
            model: 'User'
        }).where('userID').equals(req.user);
        console.log("authorProfile ======>>>>>> ", authorProfile);
        // req.user.photo = authorProfile[0].photo  // set user object with profile photo field
        console.log("profile user request =====> ", req.user.photo);
        res.render('profile', { authorProfile });
    },

    async profileEdit(req, res, next){
        let authorProfile = await Author.findById(req.params.id);
        let userProfile = await User.findById(authorProfile.userID);
        console.log("userProfile ======>>>>>> ", userProfile);
        res.render('edit', { authorProfile, userProfile });
    },

    async profileUpdate(req, res, next){
        console.log("authorProfile update ======>>>>>> ", req.body.authorProfile);
        if(req.file) req.body.user.photo = `/images/users/${req.file.filename}`;
        await Author.findByIdAndUpdate(req.params.id, req.body.authorProfile);
        await User.findByIdAndUpdate(req.user.id, req.body.user);
        console.log("user ====== > ", req.body.user);
        req.session.success = 'Profile updated successfully';
        res.redirect('/author/myprofile');
    },

    getForgotPw(req, res, next){
        res.render('users/forgot'); 
    },

    async putForgotPw(req, res, next){
        const token = await crypto.randomBytes(20).toString('hex');
        const { email } = req.body;

        console.log("email======>")
        const user = await User.findOne({ email  });
        if(!user){
            req.session.error = 'No account with that email was found!';
            return res.redirect('/forgot-password')
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        const msg = {
            to: email,
            from: 'contact@sprinng.org',
            subject: 'SprinNG - Forgot Password / Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or copy and paste it into your browser to complete the process:
            http://${req.headers.host}/reset/${token}
            if you did not request this, please ignore this email and your password will remain unchanged.`.replace(/            /g, '')
        };
        await sgMail.send(msg);

        req.session.success = `An email has been sent to ${email} with further instructions.`;
        res.redirect('/forgot-password'); 
    },

    async getReset(req, res, next){
        const { token } = req.params;
        const user = await User.findOne({ 
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            req.session.error = 'Password reset token is invalid or has expired';
            return res.redirect('/forgot/password');
        }

        res.render('users/reset', { token })
    },
    async putReset(req, res, next){
        const { token } = req.params;
        const user = await User.findOne({ 
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        console.log("user found ====> ", user);
        if (!user) {
            req.session.error = 'Password reset token is invalid or has expired';
            return res.redirect('/forgot/password');
        }
        
        if (req.body.password === req.body.passwordConfirm) {
            console.log("req.body.password=====>", req.body.password);
            console.log("req.body.password=====>", req.body.passwordConfirm);
            await user.setPassword(req.body.password);
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            await user.save();
            const login = util.promisify(req.login.bind(req));
            await login(user);
        }else {
            req.session.error = 'Passwords do not match.';
            return res.redirect(`/reset/${ token }`);
        }

        const msg = {
            to: user.username,
            from: 'contact@sprinng.org',
            subject: 'SprinNG - Password Changed',
            text: `Hello,
            This email is to confirm that the password for your account has just been changed.
            If you did not make this change, please hit reply and notify us at once.`.replace(/     /g, '')
          };

        await sgMail.send(msg);
        req.session.success = 'Password has been successfully updated!';
        res.redirect('/author/myprofile');
    }
}
