
// async handling through promises

const asynchandler=(requesthandler)=>{
   return  (req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next))
        .catch((err)=>next(err))

    }


}

/*
The purpose of this function is similar to the previous example: it aims to handle errors in 
asynchronous route handlers by catching rejected promises and passing the errors to the Express error-handling middleware.
Promise.resolve(requesthandler(req, res, next)) ensures that the requesthandler function is wrapped in a promise.
 If requesthandler is an asynchronous function (returns a promise) or a regular function, this line handles both cases.
.catch((err) => next(err)) catches any errors that occur during the execution of requesthandler and passes them to the next 
middleware (which, in Express, is typically the error-handling middleware).

The asynchandler function is designed to simplify error handling for asynchronous route handlers in an Express.js application. By wrapping a route handler with asynchandler, you ensure that any errors thrown
 (or promise rejections) are caught and passed to the Express error handler. This helps avoid unhandled promise rejections and ensures consistent error handling

*/

export {asynchandler}




/*const asynchandler=(fn)=> async (req,res,next)=>{// This line defines a function named asynchandler that takes a function fn as its parameter. It returns an asynchronous function that takes req (request), res (response), and next (next middleware) as its parameters.

    try{
        await fn(req,res,next)

    } catch(error){
        res.status(err.code || 500).json({
            success:false,
            message:err.message

        })
    }
}// Higher order function*/



/*
Inside the returned asynchronous function, there is a try block that attempts to await the execution of fn,
 which is expected to be an asynchronous function handling a request.

If an error occurs during the execution of fn, the catch block is executed. It sends a response with a status code (defaulting to 500 if
 err.code is not defined) and a JSON object containing success: false and the error message (err.message).
The asynchandler function is a utility to simplify error handling for asynchronous route handlers in an Express.js application. Without this helper,
 you would need to wrap each asynchronous route handler in a try...catch block manually.



 */
