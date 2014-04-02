var express = require('express');
var app = express();
var requires = require('../../lib/req-requires');
//adds the requires library to requests
app.use(requires.setup);

//IMPORTANT: app.router must be called before requires.error
app.use(app.router);

//handles the http error throw when an invalid request property is encountered
app.use(requires.error);

app.get('/multi', first, second);

function first(req, res, next){
  req.firstCalled = true;
  next();
}

function second(req, res){
  //assert that req.firstCalled was set before reaching this handler
  req.requires.property('firstCalled').toExist();

  res.send('req.firstCalled exists');
}
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
