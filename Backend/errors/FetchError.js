 class FetchError extends Error{
    constructor(statusCode , message){
        super(message);
        this.statusCode = statusCode;
    }
     serialize() {
       return { statusCode , message } ; 
    }
}
module.exports = FetchError
