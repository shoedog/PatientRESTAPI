'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.save = function (model) {
  return new Promise(function (resolve, reject) {
    model.save(function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.findIdAndUpdate = function (Model, id, prop, fieldVal) {
  if (typeof prop === 'string') {
    console.log('string update');
    return new Promise(function (resolve, reject) {
      Model.findByIdAndUpdate(id, { $set: _defineProperty({}, prop, fieldVal) }, { new: true }, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } else if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
    return new Promise(function (resolve, reject) {
      Model.findByIdAndUpdate(id, { $set: prop }, { new: true }, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};

exports.findOne = function (Model, prop, fieldVal, selects) {
  return new Promise(function (resolve, reject) {
    Model.findOne(_defineProperty({}, prop, fieldVal), selects, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.findIdAndRemove = function (Model, id) {
  return new Promise(function (resolve, reject) {
    Model.findByIdAndRemove(id, function (err, user) {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};