const cryptoJS = require("crypto-js");

const saltKey =
  "6c9a04aa7ab1175c269d1515e6bdb0b2240b2a3d0409713c507f9eaa68aa71f6979";

const encrypt = (value) => {
  return cryptoJS.AES.encrypt(value, saltKey).toString(cryptoJS.enc.Utf8);
};

const decypt = (value) => {
  return cryptoJS.AES.decrypt(value, saltKey).toString(cryptoJS.enc.Utf8);
};
console.log(encrypt("1"));
module.exports = {
  encrypt,
  decypt,
};
