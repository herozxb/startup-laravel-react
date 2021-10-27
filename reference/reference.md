# 1. login debug

mutation{
  login(username:"Thinking",password:"123456")
  {
    id
    email
    token
    username
    createdAt
  }
}


# Write your query or mutation here
{
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }


mutation { 
  
  createAreaPost(body: $body, thoughtArea: $thoughtArea) {
        id
        body
        createdAt
        username
        likes {
          id
          username
          createdAt
        }
        likeCount
        comments {
          id
          body
          username
          createdAt
        }
        commentCount
        thoughtArea
      }
}

{
  "body" : "I have the passport of JWT"
  "thoughtArea" : "Self_improvement"
}

{
  "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGYzMmQwZDA2NGRkMTY4OWFjM2I4YyIsImVtYWlsIjoidEBlbWFpbC5jb20iLCJ1c2VybmFtZSI6IlRoaW5raW5nIiwiaWF0IjoxNjI4MjE3ODU3LCJleHAiOjE2MjgyMjE0NTd9.CKiwQywrTzJf6cdp82BGHT2S--EDdaWCy6OlRlPeOGQ"
}

mutation deletePost($postId: ID!) {
  deletePost(postId: $postId)
}

{
  "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGYzMmQwZDA2NGRkMTY4OWFjM2I4YyIsImVtYWlsIjoidEBlbWFpbC5jb20iLCJ1c2VybmFtZSI6IlRoaW5raW5nIiwiaWF0IjoxNjI4MjE3ODU3LCJleHAiOjE2MjgyMjE0NTd9.CKiwQywrTzJf6cdp82BGHT2S--EDdaWCy6OlRlPeOGQ"
}

{
    getAreaPosts(thoughtArea:"Self_improvement",limit:1,skip:5) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }


# 2 more CPU core, less webpage size

# 3 MongoDB for laravel, the nodejs express function
  a. Post
  b. Chat

  fornt-end : React, laravel-blade
  back-end : nodejs express, laravel


# 3 the Post and Chat merge for the MongoDB


  Post Schema : User, Post

  module.exports = model('User', userSchema);
  module.exports = model('Post', postSchema);


  Chat Schema : User, Conversation, GlobalMessage, Message

  module.exports = User = mongoose.model('users', UserSchema);
  module.exports = Conversation = mongoose.model('conversations', ConversationSchema);
  module.exports = GlobalMessage = mongoose.model('global_messages', GlobalMessageSchema);
  module.exports = Message = mongoose.model('messages', MessageSchema);


# 4 JWT
a:
There are two ways in which a public/private keys can be used by a JWT: signing and encryption.

If you use a private key for signing, it allows for the recipient to identify the sender of the JWT and the integrity of the message but not to hide its contents from others (confidentiality). Note that it would be the sender's private key that is used to sign the JWT and produce a JSON Web Signature (JWS) object. Apparently that applies to the JWT that you're looking at.

When using a public key for encryption it can be used to hide content from anyone but the intended recipient. The result is a JSON Web Encryption object. Note that it would be the public key of the recipient that is used to encrypt the JWT. Apparently that is what you're looking for.

b:
You can go to jwt.io, paste your token and read the contents. This is jarring for a lot of people initially.

The short answer is that JWT doesn't concern itself with encryption. It cares about validation. That is to say, it can always get the answer for "Have the contents of this token been manipulated"? This means user manipulation of the JWT token is futile because the server will know and disregard the token. The server adds a signature based on the payload when issuing a token to the client. Later on it verifies the payload and matching signature.

The logical question is what is the motivation for not concerning itself with encrypted contents?

The simplest reason is because it assumes this is a solved problem for the most part. If dealing with a client like the web browser for example, you can store the JWT tokens in a cookie that is secure (is not transmitted via HTTP, only via HTTPS) and httpOnly (can't be read by Javascript) and talks to the server over an encrypted channel (HTTPS). Once you know you have a secure channel between the server and client you can securely exchange JWT or whatever else you want.

This keeps thing simple. A simple implementation makes adoption easier but it also lets each layer do what it does best (let HTTPS handle encryption).

JWT isn't meant to store sensitive data. Once the server receives the JWT token and validates it, it is free to lookup the user ID in its own database for additional information for that user (like permissions, postal address, etc). This keeps JWT small in size and avoids inadvertent information leakage because everyone knows not to keep sensitive data in JWT.

It's not too different from how cookies themselves work. Cookies often contain unencrypted payloads. If you are using HTTPS then everything is good. If you aren't then it's advisable to encrypt sensitive cookies themselves. Not doing so will mean that a man-in-the-middle attack is possible--a proxy server or ISP reads the cookies and then replays them later on pretending to be you. For similar reasons, JWT should always be exchanged over a secure layer like HTTPS.

https://stackoverflow.com/questions/27301557/if-you-can-decode-jwt-how-are-they-secure


Single Sign On:

Authorization: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.


Passport:

So the server does in fact not know which user is actually logged in, but of course, the user knows that he's logged in because he has a valid Json Web Token which is a bit like a passport to access protected parts of the application.

So again, just to make sure you got the idea. A user is logged in as soon as he gets back his unique valid Json Web Token which is not saved anywhere on the server. And so this process is therefore completely stateless.

Then, each time a user wants to access a protected route like his user profile data, for example. He sends his Json Web Token along with a request, so it's a bit like showing his passport to get access to that route.


https://stackoverflow.com/questions/10048978/sending-messages-from-php-to-node-js

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
app.use(bodyParser.json());

app.post('/phpcallback', function(req, res) {
    var content = req.body;
    console.log('message received from php: ' + content.msg);
    //to-do: forward the message to the connected nodes.
    res.end('ok');
});

http.listen(8080, function(){
  var addr = http.address();
  console.log('app listening on ' + addr.address + ':' + addr.port);
});


<?php

$data = array("name" => "Robot", "msg" => "Hi guys, I'm a PHP bot !");                                                                    
$data_string = json_encode($data);

$ch = curl_init('http://localhost:8080/phpcallback');                                                                      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
    'Content-Type: application/json',                                                                                
    'Content-Length: ' . strlen($data_string))                                                                       
);                                                                                                                   

echo curl_exec($ch)."\n";
curl_close($ch);

?>

https://www.itsolutionstuff.com/post/laravel-5-authenticate-user-in-nodejs-with-socket-io-using-jwtexample.html
https://m.dotdev.co/authenticate-laravel-5-user-account-in-nodejs-socket-io-using-json-web-tokens-jwt-f74009d612f8


curl -X POST -H "Content-Type: application/json" --data '{ "query": "{ getPosts {id } }" }' localhost:5000


# 5 POST at http://192.168.10.48:5002/api/users/login

{"username":"chat","password":"123456"}


{
    "success": true,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDdhZTNmYWRmMWFmMDVmOGMyM2RiZCIsIm5hbWUiOiJjaGF0IiwiaWF0IjoxNjI4NTgwNzM4LCJleHAiOjE2NjAxMzc2NjR9.LUwNgU34oX0qD662JWAkujSKi940WZynE5v_5fT4uEo",
    "name": "chat",
    "username": "chat",
    "userId": "6107ae3fadf1af05f8c23dbd"
}


# 6 POST at  http://192.168.10.48:5002/api/users/register

{"name":"input" "username":"chat3","password":"123456","password2":"123456"}

{
    "success": true,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTI0NmFlZjExZGNjNWQzYzNiNzYzOSIsIm5hbWUiOiJpbnB1dCIsImlhdCI6MTYyODU4Nzc4OCwiZXhwIjoxNjYwMTQ0NzE0fQ.YgeVe0BvLVdm6TZyRfI-FDfDnypYdlzTCp7YETKNeN0",
    "name": "input",
    "username": "chat3",
    "userId": "611246aef11dcc5d3c3b7639"
}


/*
        update: (cache) => {
        const existing = cache.readQuery({
          query: FETCH_AREA_QUERY,
          variables:{ thoughtArea : "Self_improvement"}
      });
        existing.getAreaPosts = [...data.getAreaPosts];
        cache.writeQuery({
          query: FETCH_AREA_QUERY,
          variables:{ thoughtArea : "Self_improvement"},
          existing
        });
      }
//*/



# 7 mysql instructions
memory is low

# 8 startup-laravel-react
http to https addresses


HomePageApp.js            for login in Home page
RegisterController.php    for register of Post account

./service/*
chatService.js            for video chat
userService.js            for video chat
authenticationService.js  for login in video

ChatBox.jsx               for socket.io
Users.jsx                 for socket.io

# 9 test the website
loaderio-af07dc0b1059be383ef1973adafe8a41

# 10 socket io for message realtime sending