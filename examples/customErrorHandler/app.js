var express = require('express');
var app = express();
var requires = require('../../lib/req-requires');
//adds the requires library to requests
app.use(requires.setup);

//IMPORTANT: app.router must be called before requires.error
app.use(app.router);

//handles the error thrown when an invalid request property is encountered
requires.errorHandler = function(errorMessage, req, res, next){
  res.json({success: false, message: errorMessage});
}

app.use(requires.error);

app.get('/hello', function(req, res){
  //assert that req.query.name exists
  req.requires.property('query.name').toExist();

  res.send('Hello '+req.query.name+'!');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
