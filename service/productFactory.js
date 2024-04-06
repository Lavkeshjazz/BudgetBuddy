const tags = require('../constants/tag_by_host')
class ProductFactory{
    static getProductTags(address){
        let host = new URL(address)
        let hostname = host.toString().split('.')[1];
        return tags[hostname]
    }
}

module.exports = ProductFactory