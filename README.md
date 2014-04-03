**req-requires.js** is a library that is used to validate properties on the request object in expressjs route handlers.

## Installation

Install req-requires with `npm install req-requires`

## Usage

### app.js
The following needs to be placed in the app.js file
```javascript
var requires = require('req-requires');
//load the middleware
app.use(requires.setup);

//IMPORTANT: app.router must be called before requires.error
app.use(app.router);
app.use(requires.error);
```

### Usage

This will make sure the /testRoute handler has req.query.name
```javascript
app.get('/testRoute', function(req, res){
  req.requires.property('query.name').toExist();

  res.send('Hello '+req.query.name+'!');
});
```

***Example of a failing request***
```
Example Request: 
GET: http://localhost:3000/testRoute

Example Response
400: Expected query.name to exist
```

***Example of a passing request***
```
Example Request: 
GET: http://localhost:3000/testRoute?name=brandon

Example Response
200: Hello brandon!
```

### Validators
```javascript

toExist - the given property must exist in the request object
toBeType - the property must match the given type
toMatch - the property matches the given regex
toBeIn - the property is a member of the given array

```
