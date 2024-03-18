const { response } = require('express');
const axios = require("axios");
// Important: If axios is used with multiple domains, the information will be sent to all of them.
const cheerio=require("cheerio");
const nodemailer=require("nodemailer");
const User=require("../models/user");
const sendEmail = require('../utils/email')
const crypto = require('crypto')
var newPrice;
async function defaultPage(req,res){
try{
  if (!req.user) return res.render("homepage");
  const xyz=req.user.email;
  return res.render("homepage", {
    user: xyz,
  });

  // console.log('reached here')
  // res.render("homepage.ejs");
} catch(error){
  console.log(error);
}
}
//Forget password email
async function checkforemail(req,res){
  try{
    const abc=req.body.emailforget;
    console.log(abc);
    return res.redirect('/forgotPassword')
  }
  catch(error){
    console.log(error);
  }
}

async function searchResult(req,res){
  async function fetchPrice(){
    const userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";
    const url=req.body.ProductURL;
    //console.log(`I have reached here ${url}`);
    const expectedPrice=req.body.expectedPrice;
    const response=await axios.get(url,{
      headers: {
        "User-Agent": userAgent
      }
    });
    const html=response.data;
    const vh=cheerio.load(html);
    //To parse the html response from the url 
      let priceElementText= vh(".a-price-whole").text();
      //the method returns the array of elements belonging to the same class in the 
      //html document so split it using the . operator and return the first value
      // let price =    priceElementText.split('.');
      priceElementText=priceElementText.split('.');
      // priceElementText=priceElementText.replace(", ", "");
      newPrice= priceElementText[0];
      newPrice = parseFloat(newPrice.replace(",",""));
      console.log(newPrice);
      
      if(expectedPrice>newPrice){
        await sendmail();
      }
    }
      
    try{
    await fetchPrice()
    res.render("result.ejs",{
      currprice:newPrice
    })
    var bodyParser = require('body-parser');
const axios=require("axios").default;



//we didn't call the function that is why code didn't execute 


async function sendmail(){
    const nodemailer = require("nodemailer");
    const user = "zen.jaiswal34@gmail.com";
    const pass="ejbtxdljmgevlkmw"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user,
    pass
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Lavkesh" <${user}>`, // sender address
    to: "lavkesh.jaiswal34@gmail.com, btech10237.22@bitmesra.ac.in", // list of receivers
    subject: "Price fell down ✔", // Subject line
    text: `The price of ${url} fell down, check it out!!!`, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
main().catch(console.error);

}
} catch(error){
  console.log(error);
}

}

/*
Method to render the reset password webpage when a user clicks 
on the link on the email
*/
let renderResetPassword = (req,res)=>{
    
  res.render('resetPassword',{
      token : req.params.token
  })
}

/*
reset Password method to fire when the user submits a new password using 
link sent to email , this method stores the new password along with deletion 
of the resetToken 
*/
let resetPassword=async (req,res)=>{
  try{
  const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
  const user = await User.findOne({passwordResetToken:token, passwordResetTokenExpires:{$gt: Date.now()}})
  if(!user){
      return res.status(400).json({message:'Token is invalid or expired'})
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined
  user.passwordResetTokenExpires = undefined
  user.save()
  return res.status(200).json('password changed')
  }catch(err){
      console.log(err.message+"and stack is /n"+err.stack)
  }
}

/*
  Method to fire when user request for a forgot password 
  This function creates a reset token to be stored in db 
  create a reset password url 
  send that url to user using nodemailer 
*/
async function forgotPassword(req,res){
  const user = await User.findOne({email : req.body.email})
  console.log(req.body.email);
  if(!user){
     return res.status(400).json({message:"Cannot find user with that email"});
  }
  const resetToken = user.createToken();
  await user.save();
  const resetUrl = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`
  const message = `We have received a password reset request. Please use the below link to reset your password\n\n${resetUrl}`;
  let mail = {
      type : 'Password Reset Email',
      body :{
          from : 'zen.jaiswal34@gmail.com',
          to : user.email,
          subject : 'Password Reset ',
          text : message
      }
  }
  try{
       sendEmail(mail);
      res.status(200).json({
          status: 'success',
          message: 'password reset link sent to email'
      })
  }catch(err){
      user.passwordResetToken = undefined
      user.passwordResetTokenExpires = undefined
      user.save()
      console.log(err.message)
      res.status(400)
      res.json({
          status: 'error',
          message: 'Could not send email'
      })
  }
}

module.exports = {
  defaultPage,searchResult,checkforemail,renderResetPassword,resetPassword,forgotPassword
};
