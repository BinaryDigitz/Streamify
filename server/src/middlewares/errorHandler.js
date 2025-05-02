function errorHandler(err, req, res, next) {
    try {
      let error = { ...err}
  
      console.log(err);
  
      // mongoose bad ObjectId
      if(err.name === 'CastError'){
          const message = 'Resource not found'
          error = new Error(message);
          error.statusCode = 404
      }
  
      //mongodb duplicate key
      if(err.code === 11000){
      const message = 'Duplicate field value entered.'
      error = new Error(message)
      error.statusCode = 400
      }
      // mongoose validation error
      if(err.name === 'ValidationError'){
          const message = Object.values(err.errors).map( val => val.message);
          error = new Error(message.join(', '));
          error.statusCode = 400
      }
      res.json({ success: false, statusCode : error.statusCode || 500, error: error.message || 'Internal Server Error' });
      
    } catch (ex) {
      console.log(ex.message, ex);
  
      next(ex.message);
    }
  }
  
  export default errorHandler;