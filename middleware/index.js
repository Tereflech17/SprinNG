const sharp = require('sharp');
const { cloudinary } = require('../cloudinary');

// function escapeRegExp(string) {
//   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
// }


const middleware = {
    asyncErrorHandler: (fn) => 
		(req, res, next) => {
			Promise.resolve(fn(req, res, next))
				.catch(next);
		}, 
    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()) return next();
        req.session.error = 'You need to be logged in!';
        req.session.redirectTo = req.originalUrl;
        res.redirect('/login');
    },
    multerFilter: (req, file, cb) => {
      // check file type extension
      if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else {
        let error = 'Not an image! Please upload only images.'
        req.session.error = error;
        cb(req.session.error, false)
      }
    },
    resizeUserPhoto: async (req, res, next) => {
      if (!req.file) return next();
      console.log("photo resize ==============> ", req.file);
      req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
      // req.body.authorProfile.photo = req.file
      //resize image upload
      console.log("buffer field ====>>>>> ", req.file.buffer);
      await sharp(req.file.buffer)
          .resize(128, 128)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/images/users/${req.file.filename}`);
      
      next();
  },
  deleteProfileImage: async req => {
      if (req.file) await cloudinary.v2.uploader.destroy(req.file.public_id);
  }
  // async search(req, res, next) {
  //   console.log("search middleware ====> ", req.query);
  //   const queryKeys = Object.keys(req.query);
  //   console.log("queryKeys =====> ", queryKeys);

  //   if(queryKeys.length) {
  //     const dbQueries = [];
  //     let { search } = req.query

  //     if(search) {
  //         search = new RegExp(escapeRegExp(search), 'gi');
  //         dbQueries.push({ $or: [
  //                         { firstName: search },
  //                         { lastName: search },
  //                         { location: search }
  //         ]
  //       });
  //       console.log("dbQueries ===> ", dbQueries);
  //     }
  //   }

  //   res.locals.query = req.query;

  //   queryKeys.splice(queryKeys.indexOf('page'), 1);
  //   const delimiter = queryKeys.length  ? '&' : '?';
  //   res.locals.paginateUrl = req.originalUrl.replace(/(\?|\&)page=\d+/g, '') + `${delimiter}page=`;

  //   next();
  // }
    
};

module.exports = middleware;
