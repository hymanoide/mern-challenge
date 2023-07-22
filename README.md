
# MERN Challenge

## Presentation

In this project which is a MERN stack you can write and edit post blog.

This application is composed by 2 repositories, the server and the client:

- In the server repository you can find an express HTTP server that connect to a local mongo database and expose
the api.
To start the server be sure to have installed mongoDB locally as a service then go in the server repository and launch the index.js
```$xslt
    cd server
    npm i
    node index.js
```
If you want to restart the server at any change you can also install nodemon and start the server like this
```
    cd server
    npm i
    npm i -g nodemon
    nodemon index.js
```
- In the client repository you have the Front-end code of the blog that uses React and Redux.
To start the Front-end
```
    cd client
    npm i
    npm start
```

What you will find in this repo:

### 1 - User account management JWT and passport

Open to pull requests with improvements

### 2 - Picture upload with Cloudinary

Open to pull requests with improvements


