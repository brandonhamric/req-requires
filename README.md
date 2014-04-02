**req-requires.js** is a library that is used to validate certain properties on the request object in expressjs route handlers.

![tests][mocha]

## Installation

Install req-requires with `npm install req-requires`

## Usage

### app.js
The following needs to be placed in the app.js file
```javascript
var requires = require('req-requires');
//load the middleware
app.use(requires.setup);

//IMPORTANT: app.router must called before requires.error
app.use(app.router);
app.use(requires.error);
```

### Usage

This will make sure the /testRoute handler has req.query.name
app.get('/testRoute', function(req, res){
  req.requires.property('query.name').toExist();

  res.send('Hello '+req.query.name+'!');
});

### Validators

req.requires.property('auth_provider').toExist();
req.requires.property('body.email').toExist();
req.requires.property('params.id').toMatch(/^[0-9a-fA-F]{24}$/);
