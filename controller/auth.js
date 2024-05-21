const {v4: uuidv4} = require('uuid');
const User = require("../models/user");
const {setUser} = require("../service/auth");


async function handleUserSignup(req,res){
    const { firstName,lastName,phone_number,email,password,userType } = req.body;
    await User.create({
        firstName,
        lastName,
        phone_number,
        email,
        password,
        userType 
    });
    console.log("user type:",userType);

    if(userType =='user')
    {
        console.log("mai yaha hu")
        return res.redirect("/login");
    }
    if(userType =='trader') {
        // Render a message asking the user to verify their email
        console.log("herer")
        return res.redirect("/mail");
    }
}

async function handleUserLogin(req,res){
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
}

module.exports={
    handleUserSignup,
    handleUserLogin,
}