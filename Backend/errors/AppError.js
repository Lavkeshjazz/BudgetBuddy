class AppError extends Error{
    constructor(statusCode , message){
        super(message);
        this.statusCode = statusCode;
    }
     serialize() {
       return { statusCode :this.statusCode , message:this.message } ; 
    }
}
module.exports = AppError
