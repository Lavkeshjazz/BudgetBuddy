const { flipkart, indiamart, amazon } = require("./tag_by_host")
const { FetchError } = require("../errors/FetchError.js");
scrape_host = {
  ajio: (response) => {
    let obj = JSON.parse(response('script').get()[5].children[0].data);
    return {
      name: obj["name"],
      imageUrl: obj["image"],
      price: obj["offers"]["price"]
    }
  },
  flipkart: (tags, html) => {
    try{
    let productName = html(tags.name).text().trim();
    let priceElementText = html(tags.price).text();
    let imageUrl;
    try{
        let image;
        image = html(tags.image[0]).attr()
        if(!image) image = html(tags.image[1]).attr()
        imageUrl = image.src;
    }
    catch(error){
        throw new FetchError("Could not fetch product" , 147);
    }
    priceElementText = priceElementText.split('.');
    newPrice = priceElementText[0];
    newPrice = parseFloat(newPrice.replace(/\D/g, ""));
    return {
      name: productName,
      imageUrl: imageUrl,
      price: newPrice
    }
    }catch(error){
        console.log(error);
    }
  },
  indiamart: (tags, html) => {
    try{
    let productName = html(tags.name).text().trim();
    let priceElementText = html(tags.price).text();
    let imageUrl = html(tags.image).attr().src;
    priceElementText = priceElementText.split('.');
    newPrice = priceElementText[0];
    newPrice = parseFloat(newPrice.replace(/\D/g, ""));
    return {
      name: productName,
      imageUrl: imageUrl,
      price: newPrice
    }
    }catch(error){
        throw new FetchError("Could not fetch product" , 147);
    }
  },
  amazon: (tags, html) => {
    try{
    let productName = html(tags.name).text().trim();
    let priceElementText = html(tags.price).text();
    let imageUrl = html(tags.image).attr().src;
    priceElementText = priceElementText.split('.');
    newPrice = priceElementText[1];
    newPrice = parseFloat(newPrice.replace(/\D/g, ""));
    return {
      name: productName,
      imageUrl: imageUrl,
      price: newPrice
    }
    }catch(error){
        throw new FetchError("Could not fetch product" , 147);
    }
  }

}
module.exports = scrape_host;
