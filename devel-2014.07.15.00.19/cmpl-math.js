/***** Complex Number Math Library Devel *****/

/* requires "tools.js" */
/* requires "prec-math.js" */

(function (win, udef){
  ////// Import //////
  
  var arrp = $.arrp;
  var nump = $.nump;
  var al = $.al;
  var att = $.att;
  var err = $.err;
  var time = $.time;
  var str = String;
  
  var vldpr = R.vldp;
  var intpr = R.intp;
  var negpr = R.negp;
  var evnpr = R.evnp;
  
  var absr = R.abs;
  var negr = R.neg;
  var trimr = R.trim;
  
  var addr = R.add;
  var subr = R.sub;
  var mulr = R.mul;
  var divr = R.div;
  
  var rndr = R.rnd;
  var ceir = R.cei;
  var flrr = R.flr;
  var trnr = R.trn;
  
  var expr = R.exp;
  var lnr = R.ln;
  var powr = R.pow;
  var sqrtr = R.sqrt;
  var factr = R.fact;
  var binr = R.bin;
  var agmr = R.agm;
  var sinr = R.sin;
  var cosr = R.cos;
  var sinhr = R.sinh;
  var coshr = R.cosh;
  var atanr = R.atan;
  var atan2r = R.atan2;
  
  var pir = R.pi;
  var er = R.e;
  var phir = R.phi;
  var ln2r = R.ln2;
  var ln5r = R.ln5;
  var ln10r = R.ln10;
  
  var sign = R.sign;
  var siz = R.siz;
  var nsiz = R.nsiz;
  
  var prec = PMath.prec;
  var log = PMath.log;
  
  ////// Functions //////
  
  function udefp(a){
    return a === udef;
  }
  
  function len(a){
    return a.length;
  }
  
  ////// Javascript number constants //////
  
  // Javascript largest integer: 2^53 = 9007199254740992
  // Javascript largest float ≈ 1.79769313486231580793728e+308
  // shortened to 1.7976931348623157e+308
  
  ////// Complex number functions //////
  
  //// [a, b] functions ////
  
  function N(a, b){
    return [a, b];
  }
  
  function A(z){
    return z[0];
  }
  
  function B(z){
    return z[1];
  }
  
  //// Converters ////
  
  function cmpl(z){
    if (vldp(z))return trim(z);
    if (vldpr(z))return N(trimr(z), "0");
    if (nump(z))return N(str(z), "0");
    return false;
  }
  
  function cmplreal(z){
    if (vldp(z)){
      if (realp(z))return trim(z);
      return false;
    }
    if (vldpr(z))return N(trimr(z), "0");
    if (nump(z))return N(str(z), "0");
    return false;
  }
  
  var realr = R.real;
  var realintr = R.realint;
  
  function real(a){
    if (vldp(a)){
      if (realp(a))return A(a);
      return false;
    }
    return realr(a);
  }
  
  function realint(a){
    if (vldp(a)){
      if (realp(a) && intpr(A(a)))return A(a);
      return false;
    }
    return realintr(a);
  }
  
  //// Validators ////
  
  function vldp(z){
    return arrp(z) && len(z) == 2 && vldpr(z[0]) && vldpr(z[1]);
  }
  
  //// Predicates ////
  
  function zerop(z){
    return A(z) == "0" && B(z) == "0";
  }
  
  function realp(z){
    return B(z) == "0";
  }
  
  function cmplp(z){
    return B(z) != "0";
  }
  
  function intp(z){
    return realp(z) && intpr(A(z));
  }
  
  //// Processing functions ////
  
  function trim(z){
    return N(trimr(A(z)), trimr(B(z)));
  }
  
  //// Basic operation functions ////
  
  function add(z, w, p){
    return N(addr(A(z), A(w), p), addr(B(z), B(w), p));
  }
  
  function sub(z, w, p){
    return N(subr(A(z), A(w), p), subr(B(z), B(w), p));
  }
  
  function mul(z, w, p){
    return N(subr(mulr(A(z), A(w)), mulr(B(z), B(w)), p),
             addr(mulr(A(z), B(w)), mulr(B(z), A(w)), p));
  }
  
  function div(z, w, p){
    if (udefp(p))p = prec();
    if (zerop(w))err(div, "w cannot be 0");
    
    var a, b, c, d;
    a = A(z); b = B(z);
    c = A(w); d = B(w);
    
    var sum = addr(mulr(c, c), mulr(d, d));
    return N(divr(addr(mulr(a, c), mulr(b, d)), sum, p),
             divr(subr(mulr(b, c), mulr(a, d)), sum, p));
  }
  
  //// Rounding functions ////
  
  function rnd(z, p){
    return N(rndr(A(z), p), rndr(B(z), p));
  }
  
  function cei(z, p){
    return N(ceir(A(z), p), ceir(B(z), p));
  }
  
  function flr(z, p){
    return N(flrr(A(z), p), flrr(B(z), p));
  }
  
  function trn(z, p){
    return N(trnr(A(z), p), trnr(B(z), p));
  }
  
  //// Extended operation functions ////
  
  function exp(z, p){
    if (udefp(p))p = prec();
    
    var a, b;
    a = A(z); b = B(z);
    
    var ea = expr(a, p+2);
    return N(mulr(ea, cosr(b, p+2+siz(ea)), p),
             mulr(ea, sinr(b, p+2+siz(ea)), p));
  }
  
  function ln(z, p){
    if (udefp(p))p = prec();
    return N(lnr(A(abs(z, p+2)), p), A(arg(z, p)));
  }
  
  function pow(z, w, p){
    if (udefp(p))p = prec();
    
    var a, b, c, d;
    a = A(z); b = B(z);
    c = A(w); d = B(w);
    
    if (realp(z) && realp(w) && (intpr(c) || !negpr(a))){
      return N(powr(a, c, p), "0");
    }
    return exp(mul(w, ln(z, p+4), p+2), p);
  }
  
  // @param String n
  function root(n, z, p){
    if (udefp(p))p = prec();
    
    // if z is real and n is odd, return real root
    if (realp(z) && !evnpr(n)){
      var c = A(z);
      return N(sign(c) + powr(absr(c), divr("1", n, p+2), p), "0");
    }
    
    return pow(z, N(divr("1", n, p+2), "0"), p);
  }
  
  function sqrt(z, p){
    if (udefp(p))p = prec();
    
    var a, b;
    a = A(z); b = B(z);
    
    var az = A(abs(z, p+4));
    return N(sqrtr(divr(addr(az, a), "2", p+2), p),
             sign(b) + sqrtr(divr(subr(az, a), "2", p+2), p));
  }
  
  function cbrt(z, p){
    return root("3", z, p);
  }
  
  function fact(x, p){
    return N(factr(x, p), "0");
  }
  
  function bin(x, y, p){
    return N(binr(x, y, p), "0");
  }
  
  function agm(x, y, p){
    return N(agmr(x, y, p), "0");
  }
  
  function sin(z, p){
    if (udefp(p))p = prec();
    
    var a, b;
    a = A(z); b = B(z);
    
    var ch = coshr(b, p+2);
    var sh = sinhr(b, p+2);
    return N(mulr(sinr(a, p+2+siz(ch)), ch, p),
             mulr(cosr(a, p+2+siz(sh)), sh, p));
  }
  
  function cos(z, p){
    if (udefp(p))p = prec();
    
    var a, b;
    a = A(z); b = B(z);
    
    var ch = coshr(b, p+2);
    var sh = sinhr(b, p+2);
    return N(mulr(cosr(a, p+2+siz(ch)), ch, p),
             negr(mulr(sinr(a, p+2+siz(sh)), sh, p)));
  }
  
  function sinh(z, p){
    if (udefp(p))p = prec();
    
    var a, b;
    a = A(z); b = B(z);
    
    var sh = sinhr(a, p+2);
    var ch = coshr(a, p+2);
    return N(mulr(sh, cosr(b, p+2+siz(sh)), p),
             mulr(ch, sinr(b, p+2+siz(ch)), p));
  }
  
  function cosh(z, p){
    if (udefp(p))p = prec();
    
    var a, b;
    a = A(z); b = B(z);
    
    var ch = coshr(a, p+2);
    var sh = sinhr(a, p+2);
    return N(mulr(ch, cosr(b, p+2+siz(ch)), p),
             mulr(sh, sinr(b, p+2+siz(sh)), p));
  }
  
  //// Other operation functions ////
  
  function abs(z, p){
    return N(sqrtr(addr(mulr(A(z), A(z)), mulr(B(z), B(z))), p), "0");
  }
  
  function arg(z, p){
    return N(atan2r(B(z), A(z), p), "0");
  }
  
  function sgn(z, p){
    if (udefp(p))p = prec();
    if (zerop(z))return z;
    return div(z, abs(z, p+2), p);
  }
  
  function re(z){
    return N(A(z), "0");
  }
  
  function im(z){
    return N(B(z), "0");
  }
  
  function conj(z){
    return N(A(z), negr(B(z)));
  }
  
  //// Mathematical constants ////
  
  function pi(p){
    return N(pir(p), "0");
  }
  
  function e(p){
    return N(er(p), "0");
  }
  
  function phi(p){
    return N(phir(p), "0");
  }
  
  function ln2(p){
    return N(ln2r(p), "0");
  }
  
  function ln5(p){
    return N(ln5r(p), "0");
  }
  
  function ln10(p){
    return N(ln10r(p), "0");
  }
  
  //// C object exposure ////
  
  win.C = {
    num: N,
    getA: A,
    getB: B,
    
    cmpl: cmpl,
    cmplreal: cmplreal,
    
    vldp: vldp,
    
    zerop: zerop,
    realp: realp,
    cmplp: cmplp,
    intp: intp,
    
    trim: trim,
    
    add: add,
    sub: sub,
    mul: mul,
    div: div,
    
    rnd: rnd,
    cei: cei,
    flr: flr,
    trn: trn,
    
    exp: exp,
    ln: ln,
    pow: pow,
    root: root,
    sqrt: sqrt,
    cbrt: cbrt,
    fact: fact,
    bin: bin,
    agm: agm,
    sin: sin,
    cos: cos,
    sinh: sinh,
    cosh: cosh,
    
    abs: abs,
    arg: arg,
    sgn: sgn,
    re: re,
    im: im,
    conj: conj,
    
    pi: pi,
    e: e,
    phi: phi,
    ln2: ln2,
    ln5: ln5,
    ln10: ln10
  };
  
  win.R = att({
    real: real,
    realint: realint
  }, R);
  
  ////// Speed tests //////
  
  function speed(fa, fb){
    var ta, tb;
    
    ta = speed2(fa);
    tb = speed2(fb);
    
    al("exp1: $1 | exp2: $2", ta, tb);
  }
  
  function speed2(func){
    var t1, t2, f;
    
    t1 = time();
    for (f = 0; f < 10; f++)func();
    t2 = time();
    
    return t2-t1;
  }
  
  function a(){
    
  }
  
  function b(){
    
  }
  
  //alert("");
  //speed(a, b);
  
  ////// Testing //////
  
  
  
})(window);
