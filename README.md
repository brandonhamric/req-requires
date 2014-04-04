**req-requires.js** makes it easy to make sure the properties in your expressjs request are valid.

## Installation

Install req-requires with `npm install req-requires`

## Usage

### Setup
The following needs to be placed in the app.js file
```javascript
var requires = require('req-requires');
//load the middleware
app.use(requires.setup);

//IMPORTANT: app.router must be called before requires.error
app.use(app.router);
app.use(requires.error);
```

### Basic Example

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
### More Examples
*   [Requiring a single property](https://github.com/brandonhamric/req-requires/blob/master/examples/basic/app.js)
*   [Requiring properties set from other handlers](https://github.com/brandonhamric/req-requires/blob/master/examples/multipleHandlers/app.js)
*   [Chaining requirements](https://github.com/brandonhamric/req-requires/blob/master/examples/chaining/app.js)
*   [Returning a custom error when a parameter requirement fails](https://github.com/brandonhamric/req-requires/blob/master/examples/customErrorHandler/app.js)

### Validators
```javascript

toExist - the given property must exist in the request object
toBeType - the property must match the given type
toMatch - the property matches the given regex
toBeIn - the property is a member of the given array

```