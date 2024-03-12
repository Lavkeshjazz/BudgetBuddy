const { response } = require('express');
const axios = require("axios");
// Important: If axios is used with multiple domains, the information will be sent to all of them.
const cheerio=require("cheerio");
const nodemailer=require("nodemailer");
var newPrice;
async function defaultPage(req,res){
try{
  res.render("homepage.ejs")

} catch(error){
  console.log(error);
}
}

async function searchResult(req,res){
  async function fetchPrice(){
    const userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";
    const url=req.body.ProductURL;
    console.log(`I have reached here ${url}`);
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

module.exports = {
  defaultPage,searchResult
};
