const { bcrypt } = require("../middlewares/auth");
const { v4: uuidv4 } = require('uuid');
const User = require("../models/user");
<<<<<<< HEAD
const {setUser} = require("../service/auth");
const {containsOnlyDigits} = require("../middlewares/utils");

async function handleUserSignup(req,res){
    let { firstName,lastName,phone_number,email,password,userType } = req.body;
    firstName =  firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    lastName =  lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
    email = email.toLowerCase();
    try{
    const valid_email=email.indexOf('@');
    if(valid_email==-1){
         //    return res.render("login",{
        return res.status(404).json({
            status: "error",
            statusCode: 404,
            error: {
                code: "INVALID_EMAILID",
                message: "The email provided is invalid",
                timestamp: new Date().toISOString(),
                suggestion: "Please check if the email is valid or not"
              },
            }
        );
    }
    if(password.length<8){
        return res.status(404).json({
            status: "error",
            statusCode: 404,
            error: {
                code: "PASSWORD_TOO_WEAK",
                message: "Password is too weak",
                timestamp: new Date().toISOString(),
                suggestion: "Create a stronger password"
              },
            }
        );
    }
    if(!containsOnlyDigits(phone_number) || phone_number.length!=10){
        return res.status(404).json({
            status: "error",
            statusCode: 404,
            error: {
                code: "INVALID_PHONE_NUMBER",
                message: "Phone number given is invalid",
                timestamp: new Date().toISOString(),
                suggestion: "Enter a Valid Phone Number"
              },
            }
        );
    }
    const check_phonenumber= await User.findOne({phone_number});
    const check_email= await User.findOne({email});

    if(!check_phonenumber && !check_email){
=======
const { setUser } = require("../service/auth");
const { containsOnlyDigits } = require("../middlewares/utils");
const jwt = require('jsonwebtoken');

async function handleUserSignup(req, res) {
    let { firstName, lastName, phone_number, email, password, userType } = req.body;
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
    email = email.toLowerCase();
    try {
        const valid_email = email.indexOf('@');
        if (valid_email == -1) {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                error: {
                    code: "INVALID_EMAILID",
                    message: "The email provided is invalid",
                    timestamp: new Date().toISOString(),
                    suggestion: "Please check if the email is valid or not"
                },
            }
            );
        }
        if (password.length < 8) {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                error: {
                    code: "PASSWORD_TOO_WEAK",
                    message: "Password is too weak",
                    timestamp: new Date().toISOString(),
                    suggestion: "Create a stronger password"
                },
            }
            );
        }
        if (!containsOnlyDigits(phone_number) || phone_number.length != 10) {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                error: {
                    code: "INVALID_PHONE_NUMBER",
                    message: "Phone number given is invalid",
                    timestamp: new Date().toISOString(),
                    suggestion: "Enter a Valid Phone Number"
                },
            }
            );
        }
        const check_phonenumber = await User.findOne({ phone_number });
        const check_email = await User.findOne({ email });

        if (!check_phonenumber && !check_email) {
            await User.create({
                firstName,
                lastName,
                phone_number,
                email,
                password,
                userType
            });
        }
        console.log("user type:", userType);
        if (userType == 'user') {
            //console.log("mai yaha hu")
            return res.redirect("http://localhost:3000/collections");
        }
        if (userType == 'trader') {
            // Render a message asking the user to verify their email
            //console.log("herer")
            return res.redirect("/mail");
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            statusCode: 400,
            error: {
                code: "SOMETHING_WENT_WRONG",
                message: "An error occurred. Please try again.",
            },
        })
    }
>>>>>>> f203fcf (feat: added frontend)
    await User.create({
        firstName,
        lastName,
        phone_number,
        email,
<<<<<<< HEAD
        password,
        userType 
    });
    }
    console.log("user type:",userType);
<<<<<<< HEAD:controller/auth.js
    if(userType =='user')
    {
        //console.log("mai yaha hu")
=======

    if(userType =='user'){
        console.log("mai yaha hu")
>>>>>>> d1cbfac (chore : folder restructuring):Backend/controller/auth.js
        return res.redirect("/login");
    }
    if(userType =='trader') {
        // Render a message asking the user to verify their email
        //console.log("herer")
        return res.redirect("/mail");
    }
    }catch (error) {
    // Handle any other errors
    // return res.render("login", {
    //     error: "An error occurred. Please try again.",
    // });
    return res.status(404).json({
        status: "error",
        statusCode: 404,
        error: {
            code: "SOMETHING_WENT_WRONG",
            message: "An error occurred. Please try again.",
          },
    })
    }
    }

async function handleUserLogin(req,res){
<<<<<<< HEAD:controller/auth.js
    const email = req.body.email;
    const password = req.body.password;
    try{
    const valid_email=email.indexOf('@');
    if(valid_email==-1){
         //    return res.render("login",{
        return res.status(404).json({
            status: "error",
            statusCode: 404,
            error: {
                code: "INVALID_EMAILID",
                message: "The email provided is invalid",
                details: "The user with the email " + email + " does not exist in our records.",
                timestamp: new Date().toISOString(),
                suggestion: "Please check if the email is correct"
              },
            }
        );
    }
    const user_exist = await User.findOne({email}); 
    if(!user_exist){
         //    return res.render("login",{
        return res.status(404).json({
            status: "error",
            statusCode: 404,
            error: {
                code: "USER_NOT_EXIST",
                message: "User does not exist",
                details: "The user with the email " + email + " does not exist in our records.",
                timestamp: new Date().toISOString(),
                suggestion: "Please create your account first"
              },
            }
        );
    }
        if(user_exist.password!=password){
            //return res.render("login",{
            return res.status(404).json({
            status: "error",
            statusCode: 404,
            error: {
                code: "INCORRECT_PASSWORD",
                message: "Password is incorrect",
                timestamp: new Date().toISOString(),
                suggestion: "Please check your password or else click on forget password"
              },
            }
        );
        }
            console.log("Correct Credentials");
            const token = setUser(user_exist);
            res.cookie("uid", token);
            return res.redirect("/");
    }catch (error) {
    // Handle any other errors
    // return res.render("login", {
    //     error: "An error occurred. Please try again.",
    // });
    return res.status(404).json({
        status: "error",
        statusCode: 404,
        error: {
            code: "SOMETHING_WENT_WRONG",
            message: "An error occurred. Please try again.",
          },
        }
    )
}
=======
    const {email,password} = req.body;
    const user = await User.findOne({ email, password});
    if(!user){
        return res.render("login",{error: "Invalid Username or Password",});
    }
    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
>>>>>>> d1cbfac (chore : folder restructuring):Backend/controller/auth.js
=======
    })
}
async function handleUserLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const valid_email = email.indexOf('@');
        if (valid_email == -1) {
            //    return res.render("login",{
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                error: {
                    code: "INVALID_EMAILID",
                    message: "The email provided is invalid",
                    details: "The user with the email " + email + " does not exist in our records.",
                    timestamp: new Date().toISOString(),
                    suggestion: "Please check if the email is correct"
                },
            }
            );
        }

        const user_exist = await User.findOne({ email });
        if (!user_exist) {
            //    return res.render("login",{
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                error: {
                    code: "USER_NOT_EXIST",
                    message: "User does not exist",
                    details: "The user with the email " + email + " does not exist in our records.",
                    timestamp: new Date().toISOString(),
                    suggestion: "Please create your account first"
                },
            }
            );
        }
        if (user_exist.password != password) {
            //return res.render("login",{
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                error: {
                    code: "INCORRECT_PASSWORD",
                    message: "Password is incorrect",
                    timestamp: new Date().toISOString(),
                    suggestion: "Please check your password or else click on forget password"
                },
            }
            );
        }
        console.log("Correct Credentials");
        const token = setUser(user_exist);
        res.cookie("uid", token);
        return res.status(200).json({
            user_exist
        })


        // return res.redirect("/");
    } catch (error) {
        // Handle any other errors
        // return res.render("login", {
        //     error: "An error occurred. Please try again.",
        // });
        return res.status(404).json({
            status: "error",
            statusCode: 404,
            error: {
                code: "SOMETHING_WENT_WRONG",
                message: "An error occurred. Please try again.",
            },
        }
        )
    }
}
async function handleUserAuth(req, res) {
    const uid = req.cookies.uid;
    if (uid) {
        return res.status(200).json({
            status: 'success',
            message: 'Authorizeddddddd',
            uid: uid
        });
    }
    else {
        return res.status(401);
    }
>>>>>>> f203fcf (feat: added frontend)
}
module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserAuth
}