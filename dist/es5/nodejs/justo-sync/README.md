[![NPM version](http://img.shields.io/npm/v/justo-sync.svg)](https://www.npmjs.org/package/justo-sync)
[![Build Status](https://travis-ci.org/justojs/justo-sync.svg?branch=master)](https://travis-ci.org/justojs/justo-sync)
[![Dependency Status](https://david-dm.org/justojs/justo-sync.svg)](https://david-dm.org/justojs/justo-sync)
[![devDependency Status](https://david-dm.org/justojs/justo-sync/dev-status.svg)](https://david-dm.org/justojs/justo-sync#info=devDependencies)

A synchronizer.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-sync
```

## Use

```
const sync = require("justo-sync");
```

The package is a function to run an asynchronous function synchronously.
This function is:

```
function sync(fn : function(done)) : object
```

`sync` runs the given function and it returns the value returned by the
asynchronous function. The asynchronous function must run its `done` parameter
when ended:

```
done()               //sync() returns undefined
done(error)          //sync() throws error
done(undefined, res) //sync() returns the result
```

## Examples

```
const sync = require("justo-sync");

//sync() will finish throwing an error
sync(function(done) {
  done(new Error("This is the error message."));
});

//sync() will finish returning a value
sync(function(done) {
  done(undefined, "the value to return by sync()");
});
```
