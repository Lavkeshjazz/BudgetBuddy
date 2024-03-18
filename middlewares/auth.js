const { getUser } = require("../service/auth");
const User=require("../models/user");
const jwt = require('jsonwebtoken');

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  
  //if (userUid) {
    const user = getUser(userUid);
    //if (user) {
     // console.log(req.user);
      req.user = user;
    //}
 // }

  next();
}
//   if (userUid) {
//       jwt.verify(userUid,'Lavkesh@123',async (err, decodedToken)=>{
//         if(err){
//           console.log(err.message);
//           res.redirect('/login');
//         } else{
//           console.log(`${decodedToken._id} hear`);
//           next();
//         }
//       });
//     }
//   else{
//     res.redirect('/login');
// }
async function restrictToSearchRoute(req, res, next) {
  // If user is not logged in, redirect to login page
  if (!req.user) return res.redirect("/login");

  // If user is logged in, allow access to the search route
  next();
}

//Check current User
// const checkUser=(req,res,next)=>{
//   const userUid=req.cookies?.uid;
//   if (userUid) {
//       jwt.verify(userUid,'Lavkesh@123',async (err, decodedToken)=>{
//         if(err){
//           console.log(err.message);
//           res.locals.user=null;
//           next();
//         } else{
//           console.log(`${decodedToken._id} deer`);
//           let user=await User.findById(decodedToken._id);
//           res.locals.user=user;
//           next();
//         }
//       })
//     }
//   else{
//     res.locals.user=null;
//     next();
//   }
//   next();
// }

// function restrictTo(roles=[]){
//   return function(req,res,next){
//     if(!req.user){
//       return res.render("homepage");
//     }
//     if(!roles.includes(req.user.role)){
//       return res.end("UnAuthorized");
//     }
//     return next();
//   };
// }

module.exports = {
  restrictToSearchRoute,
  restrictToLoggedinUserOnly,
  checkAuth,
  //checkUser
};