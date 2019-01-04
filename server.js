const mongoose = require("./lib/mongoose");
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const MongoStore = require('connect-mongo')(session);
const port = process.env.PORT || 5000;
const monguse = require('./Mongoose');

const multer = require('multer');

const storageForNewsPhoto = multer.diskStorage({
    destination: "./client/public/src/news/",
    filename: function(req, file, cb){
        // console.log(path.basename("/"+file.originalname));
        // console.log(file);
        cb(null,(file.originalname).split('.')[0] + path.extname(file.originalname));
    }
});
const uploadNewsPhoto = multer({
    storage: storageForNewsPhoto,
    limits:{
        fileSize: 10000000
    },
}).single("myImage");

server.listen(port);
app.use( bodyParser.json() );
app.use( cookieParser() );
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    key: 'sid',
    cookie: {
        secure: false,
        maxAge: 60000 * 60 * 24
    },
    store: new MongoStore ({mongooseConnection: mongoose.connection})
}));


app.use(require('./lib/loadUser'));

io.on('connection', (socket) => {
    console.log('hello user: ', socket.id);
    ////
    //New event!
    /////
    socket.emit('set client id', {clientId: socket.id});


    //////
    //Response on event
    //////

    socket.on('login with client id', (data) => {
    });


    socket.on('disconnect', function () {
        console.log('good byi user: ', socket.id);
    });
});

// // API calls



app.get('/api/test', (req,res)=>{
    // req.session.views  =  req.session.views + 1 || 1;
    res.send(req.session.views);
    // console.log(req.params.id);
    // monguse.Users.userById(req.params.id)
    //     .then((result)=>{
    //         console.log(result);
    //         res.send(result);
    //     })
    //     .catch(e=>{
    //         console.log(e);
    //         if(e.name === 'CastError'){
    //             console.log('Нету такого юзера');
    //             res.send(false);
    //         }
    //     })
});

    app.post('/api/upload-file-news', (req, res)=>{
        uploadNewsPhoto(req, res, (err) => {
            if (!err) {
                return res.send(200);
            }else{
                console.log(err);
            }
        });
    });
    app.post('/api/add-news', (req, res)=>{
        monguse.NewsFunctions.addNewOne(req.body.data)
            .then((result)=>{
                res.send(result)
            });
    });
app.get('/api/all-news', (req, res)=>{
    monguse.NewsFunctions.getAll()
        .then((result)=>{
            res.send(result);
        })
});
app.post('/api/news/:id', (req, res)=>{

    monguse.NewsFunctions.changeNews(req.params.id, req.body.data)
        .then((result)=>{
            res.send(result)
        });
});
app.get('/api/news/:id', (req,res)=>{
    monguse.NewsFunctions.getById(req.params.id)
        .then((result)=>{
            res.send(result);
        })
});
app.delete('/api/news/:id', (req,res)=>{
    // console.log('u a here');
    monguse.NewsFunctions.deleteById(req.params.id)
        .then((result)=>{
            res.send(result);
        })
});

//______________________//
//          USER        //
//______________________//

app.post('/api/admin-enter', (req, res)=>{

    console.log('this is user: ');
    console.log(req.user);
    if( req.user !== null ) {
        res.send(req.user._id);
    }else {
        monguse.Users.checkAuth(req.body.login)
            .then((usr) => {
                if (usr) {
                    if (usr.checkPassword(req.body.pass)) {
                        // console.log(OK);
                        req.session.user = usr._id;
                        res.send(usr._id);
                    } else {
                        // console.log(false);
                        res.send('password');
                    }
                } else {
                    console.log('Такого нету');
                    res.send('null');
                }
            })
            .catch(e => {
                console.log(e);
                if (e.name === 'CastError') {
                    console.log('Нету такого юзера');
                    res.send(false);
                }
            })
    }
});

app.post('/api/check-auth', (req, res)=>{
    console.log(req.user);
    if(req.user === null){
        res.send(false);
    }else{
        res.send(req.user);
    }
});
app.post('/api/exit-auth', (req, res)=>{
    // console.log(req.user);
    req.session.destroy();
  res.send(true);

});


///////----- Set DEF VAL ------ ////////////

app.post('/api/set-default-val', (req,res)=>{
    // console.log('OK OK OK I WIL REMOVE');

    var db = mongoose.connection.db;
    // console.log('OK OK OK I WIL REMOVE')
    db.dropDatabase((err)=> {
        if (err) throw err;
        console.log('is droped');
        //addNewOne
        monguse.Users.addNewOne()
            .then((result)=>{
                console.log(result);
                res.send(result);
            })
            .catch(e=>{
                console.log(e);
                if(e.name === 'CastError'){
                    console.log('Нету такого юзера');
                    res.send(false);
                }
            })

    });
});

if (process.env.NODE_ENV === 'production') {
// Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}