//Require any modules you need. Kinda like `import'
//var SomeModule = require('./SomeModule.js');

// Private variable
var total = 0;

// Constructor
function Foo() {
  // access private shared variable
  total++;
  // public variable.
  this.something = 0;
  // ALL public variables MUST have `this`.
};

// Example getter of a private variable.
Foo.prototype.getTotalObjects = function(){
  return total;
};

// Is the object that require(file) returns.
module.exports = Foo;
