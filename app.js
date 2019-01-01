const express = require("express"),
        app = express(),
        port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
    res.sendFile('index.html');
});

app.listen(port, () => console.log(`APP IS RUNNING ON PORT ${port}`));