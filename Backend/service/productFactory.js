const tags = require('../constants/tag_by_host')
const scrapeProduct = require('../constants/scrape_product_by_host')
// function scrapeProduct(tags, html) {
//   let productName = html(tags.name).text().trim();
//   let priceElementText = html(tags.price).text();
//   let imageUrl = html(tags.image).attr().src;
//   priceElementText = priceElementText.split('.');
//   newPrice = priceElementText[1];
//   newPrice = parseFloat(newPrice.replace(/\D/g, ""));

//   return {
//     name: productName,
//     imageUrl: imageUrl,
//     price: newPrice
//   }
// }
// function ajio(response) {
//   let obj = JSON.parse(response('script').get()[5].children[0].data)
//   return {
//     name: obj["name"],
//     imageUrl: obj["image"],
//     price: obj["offers"]["price"]
//   }
// }
class ProductFactory {
  static getProduct(address, html) {
    let url = new URL(address)
    let hostname = url.toString().split('.')[1];
    // if (hostname == "ajio")
    //   return ajio(html)
    console.log("Scraping hostname:", hostname);
    if (!scrapeProduct[hostname]) {
      throw new AppError(400, `Unsupported hostname: ${hostname}`);
    }
    try {
    const scraped=scrapeProduct[hostname];
    const product = scraped(tags[hostname], html);
    if (!product) {
      throw new FetchError(404, 'Product details not found in the response');
    }
    return product;
  } catch (error) {
    console.error(`Error scraping product from ${hostname}:`, error);
    throw new FetchError(500, `Error scraping product from ${hostname}`);
  }
}
}

module.exports = ProductFactory