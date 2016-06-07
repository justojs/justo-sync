//imports
const assert = require("assert");
const fs = require("fs");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const sync = require("../../../dist/es5/nodejs/justo-sync/lib/sync").default;

//suite
suite("sync", function() {
  suite("Not nested", function() {
    suite("Value to return", function() {
      test("sync(async : function) - done()", function() {
        assert(sync(function(done) {
          process.nextTick(function() {
            done();
          });
        }) === undefined);
      });

      test("sync(async : function) : done(undefined, value)", function() {
        sync(function(done) {
          fs.readdir("test/unit/", function(error, files) {
            done(undefined, "the value");
          });
        }).must.be.eq("the value");
      });

      test("sync(async : function) : done(null, value)", function() {
        sync(function(done) {
          fs.readdir("test/unit/", function(error, files) {
            done(null, "the value");
          });
        }).must.be.eq("the value");
      });
    });

    suite("Exception to throw", function() {
      test("sync(async : function) : done(error : Error)", function() {
        sync.must.raise(Error, [function(done) {
          fs.readdir("unknown", function(error, files) {
            done(error);
          });
        }]);
      });

      test("sync(async : function) : done(error : string)", function() {
        sync.must.raise(Error, [function(done) {
          fs.readdir("unknown", function(error, files) {
            done("an error");
          });
        }]);
      });
    });
  });

  suite("Nested", function() {
    suite("Value to return", function() {
      test("sync(async : function) - done()", function() {
        assert(sync(function(done) {
          process.nextTick(function() {
            sync(function(done) {
              done();
            });

            done();
          });
        }) === undefined);
      });

      test("sync(async : function) : done(undefined, value)", function() {
        sync(function(done) {
          var res = sync(function(done) {
            fs.readdir("test/unit/", function(error, files) {
              done(undefined, "the value");
            });
          });

          done(undefined, res);
        }).must.be.eq("the value");
      });

      test("sync(async : function) : done(null, value)", function() {
        sync(function(done) {
          var res = sync(function(done) {
            fs.readdir("test/unit/", function(error, files) {
              done(undefined, "the value");
            });
          });

          done(null, res);
        }).must.be.eq("the value");
      });
    });

    suite("Exception to throw", function() {
      test("sync(async : function) : done(error : Error)", function() {
        sync.must.raise(Error, [function(done) {
          var error = sync(function(done) {
            fs.readdir("unknown", function(error, files) {
              done(undefined, error);
            });
          });

          done(error);
        }]);
      });

      test("sync(async : function) : done(error : string)", function() {
        sync.must.raise(Error, [function(done) {
          var error = sync(function(done) {
            fs.readdir("unknown", function(error, files) {
              done(undefined, "an error");
            });
          });

          done(error);
        }]);
      });
    });
  });
})();
