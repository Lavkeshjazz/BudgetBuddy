const { v4: uuidv4 } = require('uuid');
const User = require("../models/user");
const { setUser } = require("../service/auth");
const { containsOnlyDigits } = require("../middlewares/utils");
const jwt=require('jsonwebtoken');

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
        let user;
        if (!check_phonenumber && !check_email) {

            user = await User.create({
                firstName,
                lastName,
                phone_number,
                email,
                password,
                userType
            });
            console.log("user type:", userType);
            return res.status(200).json({
                user
            })
        }
        else if(check_phonenumber && !check_email){
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                error: {
                    code: "Phone number already registered",
                    message: "Please try again with another phone number.",
                },
            })  
        }
        else if(!check_phonenumber && check_email){
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                error: {
                    code: "Email already registered",
                    message: "Please try again with another email.",
                },
            })  
        }
        else{
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                error: {
                    code: "Email and Phone number already registered",
                    message: "Please try again with another email and phone number.",
                },
            })  
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
    // await User.create({
    //     firstName,
    //     lastName,
    //     phone_number,
    //     email,
    // })
}

async function handleUserLogin(req, res) {
    console.log("hello from handleUserLogin")
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
        res.cookie("uid", token, {
            httpOnly: true,
            secure: true, // Always use secure for HTTPS
            sameSite: 'none', // Required for cross-site cookie
            //maxAge: 24 * 60 * 60 * 1000, // 24 hours
            path: '/', // Ensure the cookie is sent for all paths
            domain: 'https://budget-buddy-one-beta.vercel.app/' // Replace with your actual domain
        });
        console.log("Cookie set:", token);
        return res.status(200).json({
            user_exist
        })
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
const secret = "Lavkesh@123";
async function handleUserAuth(req, res) {
    const uid = req.cookies.uid;
    console.log("uid=");
    console.log(uid);
    if (uid) {
        const decoded=jwt.verify(uid,secret);
        console.log(decoded)
        const user_exist = await User.findOne({ email: decoded.email });
        return res.status(200).json({
            user_exist,
            status: 'success',
            message: 'Authorizeddddddd',
            uid: uid
        });
    }
    else {
        return res.status(401);
    }
}
module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserAuth
}