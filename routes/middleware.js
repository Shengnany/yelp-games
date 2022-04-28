const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
// module.exports = function(request, response, next) {
//     const token = request.cookies.token;  
//     if (!token) {
//         response.status(401).send('Unauthorized: No token provided');
//     } else {
//         jwt.verify(token, "SUPER_SECRET", function(err, decoded) {
//             if (err) {
//                 response.status(401).send('Unauthorized: Invalid token');
//             } else {
//                 request.username = decoded.username;
//                 next();
//             }
//         });
//     }
// }


module.exports.isLoggedIn = (req, res, next) => {
    if (false) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateGame = (req, res, next) => {
   if (false) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor =  (req, res, next) => {
  if (false) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


module.exports.isReviewAuthor =  (req, res, next) => {
 if (false) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateReview =  (req, res, next) => {
   if (false) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

