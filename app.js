const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mongoose = require('mongoose');
var cors = require('cors')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/noteapp', {
    useMongoClient: true
});


var app = express();
app.use(cors())
app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
var Schema = new mongoose.Schema({ user: 'string', context: 'string' });
var Post = mongoose.model('Post', Schema);

app.post('/save', (req, res) => {
    var body = _.pick(req.body, ['context', 'user'])

    const Opost = new Post({ user: body.user, context: body.context });
    Opost.save().then(() => console.log('meow'));
    res.send("ok")
})

app.post('/rewrite', (req, res) => {
    var body = _.pick(req.body, ['context', 'user'])
    Post.findOneAndUpdate({ user: 'user' }, { $set: { context: body.context } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }

        console.log(doc);
    })
    res.send(body)
})


app.listen(8080, () => {
    // console.log(moment().tz("Asia/Taipei").format());
    console.log("http://localhost:8080")
})