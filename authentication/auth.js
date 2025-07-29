const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Optionally, you can use ExtractJwt.fromAuthHeaderAsBearerToken() for Authorization header
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

//this middleware saves the information provided by the user to the database
// and then sends the user information to the next middleware if successful
// otherwise it sends an error message

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.create({ email, password });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// this middleware authenticates the user based on the email and password provided by the user
// if the user is found then it sends the user information to the next middleware
// otherwise it sends an error message

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
          return done(null, false, { message: "Invalid credentials" });
        }

        return done(null, user, { message: "logged in successfuly" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
