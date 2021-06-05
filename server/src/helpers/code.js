const lodash = require('lodash');

function __incrementCode(_code) {
  let __code = lodash.times(_code.length, function (i) {
    return _code.toUpperCase().charCodeAt(i);
  });
  for (let i = __code.length - 1; i >= 0; i--) {
    let code = __code[i];
    if (code < 48 || (code > 57 && code < 65) || code > 90) {
      continue;
    } else if (code + 1 === 58) {
      __code[i] = 48;
    } else if (code + 1 === 91) {
      __code[i] = 65;
    } else {
      __code[i] += 1;
      break;
    }
  }
  return String.fromCharCode(...__code);
}

async function __generateCode(_model, type, _filter = {}) {
  return new Promise(async function (resolve, reject) {
    await _model
      .findOne({ ..._filter })
      .sort({ code: -1 })
      .then(function (_doc) {
        let _code = _doc ? __incrementCode(_doc.code) : `${type}-000000001`;
        resolve(_code);
      })
      .catch(reject);
  });
}

module.exports = {
  __generateCode,
  __incrementCode,
};
