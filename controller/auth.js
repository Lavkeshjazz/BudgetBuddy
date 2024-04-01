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
    const {email,password} = req.body;
    const user = await User.findOne({ email, password});
    if(!user){
        return res.render("login",{
            error: "Invalid Username or Password",
        });
    }
        const token = setUser(user);
        res.cookie("uid", token);
        return res.redirect("/");
}

module.exports={
    handleUserSignup,
    handleUserLogin,
}