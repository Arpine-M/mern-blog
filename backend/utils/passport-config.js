const passport = require("passport");
const User = require("../models/User/User");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy; 
const ExtractJWT = require("passport-jwt").ExtractJwt; 
const GoogleStrategy = require("passport-google-oauth20");

//! Configure passport local strategy


passport.use(
  new LocalStrategy(
    {
      usernameField: "username", //username/email
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "Invalid login details" });
        }
        //verify the password
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid login details" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

const options = {
  jwtFromRequest: ExtractJWT.fromExtractors([(req)=>{
    let token = null;
    if(req && req.cookies){
      token = req.cookies["token"];
      return token;
    }
    
  }]),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(options, async (userDecoded, done) => {
    try {
      const user  = await User.findById(userDecoded.id)
      if(!user){
        return done(null, user);
      } else
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;