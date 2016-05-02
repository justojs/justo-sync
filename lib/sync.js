//imports
import deasync from "deasync";

/**
 * Run an asynchronous function synchronously.
 * Return the function result.
 *
 * @return object
 */
export default function(fn) {
  var result;

  //(1) invoke
  deasync(function(done) {
    function mydone(err, res) {
      if (err) {
        if (err instanceof Error) done(err);
        else done(new Error(err));
      } else {
        result = res;
        done();
      }
    }

    fn(mydone);
  })();

  //(2) return result
  return result;
}