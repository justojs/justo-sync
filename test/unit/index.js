//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const pkg = require("../../dist/es5/nodejs/justo-sync");

//suite
suite("API", function() {
  test("default", function() {
    pkg.must.be.instanceOf(Function);
  });
})();
