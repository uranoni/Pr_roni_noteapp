const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mongoose = require('mongoose');
var cors = require('cors')
var app= express();
app.use(express.static(__dirname+'/www'));
mongoose.Promise = global.Promise;
// 資料庫的連線斜線後面是資料庫名稱
mongoose.connect('mongodb://localhost:27017/noteapp', {
    // useMongoClient: true
});

var app = express();
app.use(cors())
app.use(express.static(__dirname + '/www'));
//bodyParser 前端傳過來的資料要做解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//
var Schema = new mongoose.Schema({ user: 'string', context: 'string' });
var Post = mongoose.model('Post', Schema);

// app.post('/save', (req, res) => {
//     var body = _.pick(req.body, ['context', 'user'])

//     const Opost = new Post({ user: body.user, context: body.context });
//     Opost.save().then(() => console.log('meow'));
//     res.send("ok")
// })

// app.post('/rewrite', (req, res) => {
//     var body = _.pick(req.body, ['context', 'user'])
//     Post.findOneAndUpdate({ user: 'user' }, { $set: { context: body.context } }, { new: true }, (err, doc) => {
//         if (err) {
//             console.log("Something wrong when updating data!");
//         }

//         console.log(doc);
//     })
//     res.send(body)
// })

app.post('/rewrite', (req, res) => {
    var body = _.pick(req.body, ['context', 'user'])
    // 第一個參數你要找的是誰
    // 第二個參數 你要改變的值 用set
    Post.findOneAndUpdate({ user: 'user' }, { $set: { context: body.context } },{ new: true }, function(error, result) {
        if (!error) {
            // If the document doesn't exist
            if (!result) {
                
                result = new Post({user:body.user,context:body.context});
            
            }
            // Save the document
            result.save(function(error) {
                if (!error) {
                  res.send(result);
                } else {
                  res.send(error)
                }
            });
        }
    });
    
})

app.listen(8787,()=>{
  console.log("http://localhost:8787")
})