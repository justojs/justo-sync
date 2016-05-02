"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 








function (fn) {
  var result;


  (0, _deasync2.default)(function (done) {
    function mydone(err, res) {
      if (err) {
        if (err instanceof Error) done(err);else 
        done(new Error(err));} else 
      {
        result = res;
        done();}}



    fn(mydone);})();



  return result;};var _deasync = require("deasync");var _deasync2 = _interopRequireDefault(_deasync);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}