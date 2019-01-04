var mongoose = require('./lib/mongoose');



//Работа с бд Юзерами
var User = require('./models/user');
var Users = {};

Users.list = ()=>{
    return  User.find();
    // console.log(allList);
};
Users.checkAuth = (data)=>{
    console.log('I WILL SEE: ', data );
    return  User.findOne({username: data});
    // console.log(allList);
};

Users.userById = (id)=>{
    return  User.find({_id: id});
    // console.log(allList);
};
Users.addUser = (data)=>{
    // return  User.find({_id: id});
    const almost = new User({username: data.log, password:  data.pass});
    return almost.save();
    // console.log(allList);
};
Users.deleteUserById = (id)=>{
    return  User.deleteOne({_id: id});
    // console.log(allList);
    // var first = new User({username: 'Roma', password: 'root'});

};

Users.addNewOne = (data)=>{
    // console.log(data.content);
    const almost = new User({username: 'Roma', password: 'root'});
    return almost.save();
};



//Работа с новостями

var News = require('./models/news');
var NewsFunctions = {};

NewsFunctions.getAll = ()=>{
    return  News.find();
};
NewsFunctions.getById = ( id )=>{
    return  News.find({_id: id});
};

NewsFunctions.deleteById = ( id )=>{
    return  News.deleteOne({_id: id});
};

NewsFunctions.changeNews = ( id, data )=>{
    return  News.updateOne({_id: id}, {
        title: data.title,
        content: data.content,
        tag: data.tag,
        shortDesc: data.shortDesc,
        photo: data.photo,
        created: data.date
    });
};

NewsFunctions.addNewOne = (data)=>{
    console.log(data);
    const almostNews = new News({
        title: data.title,
        content: data.content,
        tag: data.tag,
        shortDesc: data.shortDesc,
        photo: data.photo,
        created: data.date
    });
    return almostNews.save();
};



//Работа с ивентами
var Event = require('./models/events');
var EventsFunctions = {};

EventsFunctions.addNewOne = (data)=>{
    // console.log(data.content);
    const event = new Event({
        title: data.title,
        date: data.date,
        desc: data.desc
    });
    return event.save();
};
EventsFunctions.getAll = ()=>{
    return  Event.find();
};
EventsFunctions.getById = ( id )=>{
    return  Event.find({_id: id});
};

EventsFunctions.deleteById = ( id )=>{
    return  Event.deleteOne({_id: id});
};

EventsFunctions.changeEvent = ( id, data )=>{
    // console.log('We a here');
    return  Event.updateOne({_id: id}, {
        title: data.title,
        date: data.date,
        desc: data.desc
    });
};



module.exports.EventsFunctions = EventsFunctions;
module.exports.NewsFunctions = NewsFunctions;
module.exports.Users = Users;