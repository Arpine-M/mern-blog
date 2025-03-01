const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User/User");
const sendAccVerificationEmail = require("../../utils/sendAccVerificationEmail");
const crypto = require("crypto");
//-----User Controller---

const userController = {
  // !Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    //Check if username already exist
    const userFound = await User.findOne({ username, email });
    if (userFound) {
      throw new Error("User already exists");
    }
    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Register the user
    const userRegistered = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    //send the response
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      userRegistered,
    });
  }),
  // ! Login
  login: asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      //check if user not found
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      //generate token
      const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET);
      //set the token into cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, //1 day
      });

      //send the response
      res.json({
        status: "success",
        message: "Login Success",
        username: user?.username,
        email: user?.email,
        _id: user?._id,
      });
    })(req, res, next);
  }),
  // ! googleAuth-->
  googleAuth: passport.authenticate("google", { scope: ["profile"] }),
  // ! GoogleAuthCallback
  googleAuthCallback: asyncHandler(async (req, res, next) => {
    passport.authenticate(
      "google",
      {
        failureRedirect: "/login",
        session: false,
      },
      (err, user, info) => {
        if (err) return next(err);
        if (!user) {
          return res.redirect("http://localhost:5173/google-login-error");
        }
        //generate the token

        const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
          expiresIn: "3d",
        });
        //set the token into the cooke
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, //1 day:
        });
        //redirect the user dashboard
        res.redirect("http://localhost:5173/dashboard");
      }
    )(req, res, next);
  }),
  // ! check user authentication status
  checkAuthenticated: asyncHandler(async (req, res) => {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //find the user
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ isAuthenticated: false });
      } else {
        return res.status(200).json({
          isAuthenticated: true,
          _id: user?._id,
          username: user?.username,
          profilePicture: user?.profilePicture,
        });
      }
    } catch (error) {}
    return res.status(401).json({ isAuthenticated: false, error });
  }),
  // ! Logout
  logout: asyncHandler(async (req, res) => {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({ message: "Logout success" });
  }),

  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user).populate("posts").select("-password -passwordResetToken -passwordResetExpires -accountVerificationToken -accountVerificationExpires");
    res.json({user});
  }),

  followUser: asyncHandler(async (req, res) => {
    
    const userId = req.user;
    const followId = req.params.followId;

    await User.findByIdAndUpdate(
      userId,
       { 
        $addToSet: { following: followId },
       },
       { new: true }
    );

    await User.findByIdAndUpdate(
      followId,
       { 
        $addToSet: { followers: userId },
       },
       { new: true }
    );

    res.json({ 
      message: "User followed"

     }) 
    
  }),

  unFollowUser: asyncHandler(async (req, res) => {
    
    const userId = req.user;
    const unfollowId = req.params.unfollowId;

    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowId);

    if(!user || !unfollowUser){
      throw new Error("User not found");
    }
   
    user.following.pull(unfollowId);
    unfollowUser.followers.pull(userId);

    await user.save();
    await unfollowUser.save();

    res.json({ 
      message: "User unfollowed"

    });
    
  }),

  verifyEmailAccount: asyncHandler(async (req, res) => {

    const user = await User.findById(req.user);
    if(!user){
      throw new Error("User not found");
    }

    if(!user?.email){
        throw new Error("Email not found");
    }

    const token = await user.generateAccVerificationToken();
    await user.save();

    sendAccVerificationEmail(user?.email, token);
    res.json({
      
      message: `Account verification email sent to your email.Token expires in 10 minutes`
    })

  }),
  verifyEmailAcc: asyncHandler(async (req, res)=>{
    
    const {verifyToken} = req.params
    const cryptoToken = crypto.createHash("sha256").update(verifyToken).digest("hex");

    const userFound = await User.findOne({
      accountVerificationToken: cryptoToken,
      accountVerificationExpires: { $gt: Date.now() }
    });
    if(!userFound){
      throw new Error("Account verification expired");
    }

    userFound.isEmailVerified = true;
    userFound.accountVerificationToken = null;
    userFound.accountVerificationExpires = null;
    res.json({
      message: "Account successfully verified",
      
    })
  }),

  forgotPassword: asyncHandler(async (req, res) => {

    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
      throw new Error(`User with email ${email} not found`);
    }

   if(user.authMethod !== "local"){
    throw new Error("Please login with your social account");
   }
    const token = await user.generatePasswordResetToken();
    await user.save();

    sendPasswordEmail(user?.email, token);
    res.json({
      
      message: `Password reset email sent to your ${email}`,
    });

  }),

  resetPassword: asyncHandler(async (req, res)=>{
    
    const {verifyToken} = req.params;
    const {password} = req.body;

    const cryptoToken = crypto.createHash("sha256").update(verifyToken).digest("hex");

    const userFound = await User.findOne({
      passwordResetToken: cryptoToken,
      passwordResetExpires: { $gt: Date.now() }
    });
    if(!userFound){
      throw new Error("Password reset token expired");
    }

    const salt = await bcrypt.genSalt(10);
    userFound.password = await bcrypt.hash(password, salt);
    userFound.passwordResetToken = null;
    userFound.passwordResetExpires = null;
    res.json({
      message: "Password successfully reset",
    
    })
  }),

};

module.exports = userController;