const passport = require("passport");

const isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (error, user, info)=>{
        if(error || !user){
            return res.status(401).json({
                message: info ? info?.message : "Unauthorized",
                error: error ? error?.message : undefined
            })
        }
        req.user = user?._id;
        return next();

    })(req, res, next);
    
};

module.exports = isAuthenticated;