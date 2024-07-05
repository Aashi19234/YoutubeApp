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



### Mongodb aggregation pipeline

In MongoDB, an aggregation pipeline is a series of stages that process documents by performing operations on them, such as filtering, grouping, or calculating values. The stages transform the documents and pass the results to the next stage in the pipeline. This sequential data processing allows for complex transformations and computations on the data.


Bcrypt: package made on core nodejs library. 
Bcryptjs: optimised js with 0 dependency and compatible with bcrypt.

### What is bcrypt?

Bcrypt is a hashing algorithm that turns a password into a random-looking string of characters.

### Why use bcrypt?

Storing passwords in plain text is dangerous. If someone gets access to your database, they can see everyone's passwords.
Bcrypt hashes passwords so that even if someone gets the hashed passwords, they can't easily figure out the original passwords.

A bcrypt hash is a string that includes information about the hashing algorithm, the cost factor, the salt, and the hashed password itself. This information is encoded in the structure of the bcrypt hash


### What is bcryptjs?

Bcryptjs is a library for securely hashing passwords. It works entirely in JavaScript, so it doesn't require any native libraries, making it easier to set up.

### Why use bcryptjs?

Storing passwords securely is crucial. Bcryptjs helps by scrambling passwords (hashing) so that even if someone accesses your database, they can't see the actual passwords.


### JWT(JSON WEB TOKEN)

What is a JSON Web Token (JWT)?

A JSON Web Token (JWT) is a way to securely transmit information between parties as a JSON object. It's commonly used for authentication.It is a bearer token.y token jiske paas hai use data bhej denge.

Why use JWT?

JWTs are used to verify the identity of a user without needing to store session information on the server. They are compact, secure, and can be easily transmitted between client and server.

How does JWT work?

User Logs In: A user logs in with their credentials (username and password).
Server Creates a Token: The server verifies the credentials and creates a JWT, which includes user information and an expiration time.
Token Sent to Client: The server sends the JWT back to the client.
Client Stores Token: The client stores the token (usually in local storage or a cookie).
Client Makes Requests: For future requests, the client includes the JWT in the request headers.
Server Verifies Token: The server checks the token's validity before processing the request.

Structure of a JWT

A JWT has three parts:

Header: Contains metadata about the token, like the type of token and the algorithm used for encoding.

Payload: Contains the claims, which are statements about an entity (usually the user) and additional data.

Signature: Used to verify that the token hasn't been altered.
A JWT looks like this: xxxxx.yyyyy.zzzzz

### package for file upload
1) express-fileupload
2) Multer
We are going to use Multer.


hm user k through file upload krvaenge (through multer) , local server pr temporary file rkh denge then clodinary k through file leke usko server pr daal denge

### Controllers

In Node.js, specifically when using frameworks like Express.js, controllers are functions or classes responsible for handling incoming requests and generating appropriate responses.



### HTTP CRASH COURSE

Hyper text transfer protocol
URL: uniform resource locator
URI
URN


[text](../../../Downloads/httpnotes.pdf)

read from here.

manage state means user ki state ki user guest hai logged in h ya kya.
