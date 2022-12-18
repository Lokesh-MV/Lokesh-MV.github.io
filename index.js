const express = require('express');
const bodyParser = require('body-parser');
const dns = require('dns');
const { url } = require('inspector');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/url.html', function(request, response){
  response.sendFile(__dirname + '/url.html')
});
app.use(express.static('public'));
app.post('/', function(request, response){
    dns.lookup(request.body.URL, (err, address, family) => {
        console.log(address);
         if (address == undefined){
             response.sendFile(__dirname + '/fake.html');
         } else {
             response.sendFile(__dirname + '/genuine.html');
         } 
    });
});
app.post('/', function(req1, res1) {
    res1.redirect('/url.html');
});
app.post('/', function(req2,  res2){
    res2.redirect('/url.html');
});
app.listen(process.env.PORT  || 3000, function(){
    
});