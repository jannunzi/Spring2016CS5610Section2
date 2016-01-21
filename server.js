var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/sayHello', rootRequest);

function rootRequest(req, res){
    res.send('hello world');
}

app.listen(3000);