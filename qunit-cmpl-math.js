QUnit.assert.testcmpl = function (z, a, b){
  this.teststr(C.getA(z), a, 'testing real part of ' + $.dspSimp(z));
  this.teststr(C.getB(z), b, 'testing imag part of ' + $.dspSimp(z));
};

QUnit.assert.testcstr = function (a, x){
  this.same(C.tostr(a), x, 'testing tostr of ' + $.dspSimp(a));
};
