const { response } = require('express');
const axios=require("axios").default;
// Important: If axios is used with multiple domains, the information will be sent to all of them.
const cheerio=require("cheerio");
const nodemailer=require("nodemailer");
const User=require("../models/user");
const Product = require('../models/product')
const sendEmail = require('../utils/email')
const crypto = require('crypto');
const ProductFactory = require('../service/productFactory');
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
//Detailed Page
async function open_detailed_page(req,res){
  const detail1=req.body.DetailList;
  console.log("Details yaha hai");
  try {
    // await User.updateOne(
    //   { _id: ObjectId(req.user._id) },
    //   { $push: { itemsAdded: { productURL: item1, expectedPrice: item2 } } }
    // )
    const CurrentProduct=await User.findOne({'itemsAdded.productURL': detail1 },{ 'itemsAdded.$': 1 });
    const checkDetails=await Product.findOne({url:detail1});
    console.log("Find hogya mai");
    const detail2=CurrentProduct.itemsAdded[0].expectedPrice;
  res.render("details",{
    ProductURL:detail1,
    expectedPrice:detail2,
    currentPrice:checkDetails.price,
    imageUrl:checkDetails.imageUrl
  })
}catch (err) {
  console.log(err);
}
}

//Delete database
async function deleteDatabase(req,res){
  const URLToDelete = req.body.deleteItemId;
  console.log("delete delete");
    console.log(URLToDelete);
  try {
    await User.updateMany({"itemsAdded.productURL": URLToDelete}, {$pull: {itemsAdded: {productURL: URLToDelete}}});
    await Product.deleteOne({url: URLToDelete});
    console.log("delete hogya mai");
    const xyz=req.user.email;
    const checkPrice=await Product.find({},{price:1,_id:0})
    const result = await  User.findOne({ email : req.user.email})
    const checkImage=await Product.find({},{imageUrl:1,_id:0})
    const checkName=await Product.find({},{name:1,_id:0})
    let products ={
      listTitle:xyz,
      listItems: result.itemsAdded,
      listprice: checkPrice,
      listImage: checkImage,
      listName:checkName
    }
    res.render("searchpage",products)

  } catch (err) {
    console.log(err);
  }
}

//Add product urls in database

async function addUrlinDatabase(req,res){
  const data = {productURL:req.body.ProductURL , expectedPrice : req.body.expectedPrice}
  await fetchPrice(data.productURL,data.expectedPrice);
  await User.updateOne({ email : req.user.email ,'itemsAdded.productURL' :{$ne:data.productURL} },{ $push: {itemsAdded:data}})  //Uniquely adds url in database
  const user = await  User.findOne({ email : req.user.email})
  const checkPrice=await Product.find({},{price:1,_id:0})
  const checkImage=await Product.find({},{imageUrl:1,_id:0})
  const checkName=await Product.find({},{name:1,_id:0})
  

  let products = {
    listTitle:user.email,
    listItems: user.itemsAdded,
    listprice: checkPrice,
    listImage: checkImage, 
    listName:checkName
  }
  console.log("lisitems");
  console.log(user.itemsAdded);
  
  res.render("searchpage",products)
}

//Add new producturls and expectedprice in existing database using plus button
async function add_new_data_in_existing_database(req,res,next){
  const xyz=req.user.email;
  try {
    // await User.updateOne(
    //   { _id: ObjectId(req.user._id) },
    //   { $push: { itemsAdded: { productURL: item1, expectedPrice: item2 } } }
    // )
    const data = {productURL:req.body.newProductURL , expectedPrice : req.body.newexpectedPrice}
    await fetchPrice(data.productURL,data.expectedPrice);
    // CurrentUser.itemsAdded.push({productURL:item1,expectedPrice:item2});
    // await CurrentUser.save();
    await User.updateOne({ email : req.user.email ,'itemsAdded.productURL' :{$ne:data.productURL} },{ $push: {itemsAdded:data}})
    console.log("Add hogya mai");
    const checkPrice=await Product.find({},{price:1,_id:0})
   // const xyz=req.user.email;
   const result = await  User.findOne({ email : req.user.email})
   const checkImage=await Product.find({},{imageUrl:1,_id:0})
   const checkName=await Product.find({},{name:1,_id:0})
  let products ={
    listTitle:xyz,
    listItems: result.itemsAdded,
    listprice: checkPrice,
    listImage: checkImage,
    listName:checkName
  }
  res.render("searchpage",products)
  } catch (err) {
    console.log(err);
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

async function fetchPrice(url,expectedPrice){
  const userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0";
  
  //console.log(`I have reached here ${url}`);
 
  console.log(url)
  const response=await axios.get(url,{
    headers: {
      "User-Agent": userAgent,
      "Sec-Ch-Ua-Full-Version-List":"\"Not_A Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"120.0.6099.71\", \"Microsoft Edge\";v=\"120.0.2210.61\"",
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Model": '""',
      "Sec-Ch-Ua-Platform": '"Linux"',
      "Sec-Ch-Ua-Platform-Version": '"6.5.0"',
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1"
    }
  });
  const html=response.data;
  const vh=cheerio.load(html);
  let attributes = ProductFactory.getProductTags(url)
  //To parse the html response from the url 
    let priceElementText= vh(attributes.price).text();
    let productName = vh(attributes.name).text().trim();
    console.log(productName);
    let imageUrl = vh(attributes.image).attr().src;
    //the method returns the array of elements belonging to the same class in the 
    //html document so split it using the . operator and return the first value
    // let price =    priceElementText.split('.');
    priceElementText=priceElementText.split('.');
    // priceElementText=priceElementText.replace(", ", "");
    newPrice= priceElementText[0];
    newPrice = parseFloat(newPrice.replace(/\D/g,""));
    console.log(imageUrl);
    console.log(productName);
    console.log(newPrice);
    let product = {
      name : productName,
      url :  url, 
      imageUrl : imageUrl,
      price : newPrice
  }  
    await Product.findOneAndUpdate({ url },product , {upsert : true})
    if(expectedPrice>newPrice){
      await sendmail();
    }

    return newPrice;
  }

// async function searchResult(req,res){
//     try{
//       const url=req.body.ProductURL;
//       const expectedPrice=req.body.expectedPrice;
//       addUrlinDatabase(url,expectedPrice);


// //we didn't call the function that is why code didn't execute 

// } catch (error) {
//   console.error(error);     // NOTE - use "error.response.data` (not "error")
// }

// }


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
  defaultPage,checkforemail,renderResetPassword,resetPassword,forgotPassword,addUrlinDatabase,deleteDatabase,add_new_data_in_existing_database,open_detailed_page
};
