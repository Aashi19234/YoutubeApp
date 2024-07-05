### Learning Backend through Project


We will store images through third party processes.

Git only tracks files, not empty folders.
.gitkeep helps in tracking empty folders.

envronment variables file se ni system se uthae jaate h so that they are secure.

Nodemon restarts the server automatically when a file gets saved.

In db we will write all database connection logic.

Middlewares: In Node.js, middleware functions are functions that sit between the request and response cycle in an application. They have access to the request object (req), the response object (res), and the next middleware function in the stack.

Through touch command in git bash we install files, through mdkir command we install folders.

### How to set up a backend project?

1) make a folder , open on vs
2) npm init
3) readme file
4) push on github 
5) install nodemon 
6) install prettier
7) .env file
8) public and src folder 
9) add code in gitignore through gitignore generator


### How to connect a database?

database used: MONGODB
password: aastha123

 
there can be multiple approaches but we are using this:
1) create db folder
2) write connection code udhr
3) index file m connection code export krao
4) fir use export krdo
 this approach is good for professional and production purposes.
 5) in env file write PORT and MONGODB_URI.

 When we try to talk to database there can be some errors, so we should wrap it in try catch block or promises.
 Database is always in another continent.
 It takes time to talk to databse so we should apply async await.



### express 
req k abdr kaafi optiobs h:
1) req.params- url se data isse aata h
2) req.body: forms,json esa data aa sktaa h
3) req.cookies: cookies parser middleware , this property is an object that contains cookies sent by request.if request has no cookies , it deffaults to {} .

CORS: it helps to do parsing for cross origin resource sharing.


### Middleware

In Node.js, middleware functions are functions that sit between the request and response cycle in an application. They have access to the request object (req), the response object (res), and the next middleware function in the stack.

For example: we are requesting /instagram and res is res.send("Aastha") but in between this we are checking if user is logged in this is middleware.
If they are logged in then we will send them response.

(err,req,res,next), next is a flag