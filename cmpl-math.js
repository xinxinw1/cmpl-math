/***** Complex Number Math Library 2.0.0 *****/

/* require tools 4.10.3 */
/* require prec-math 5.0.0 */

(function (udf){
  ////// Import //////
  
  var num = Number;
  var str = String;
  
  var nodep = $.nodep;
  
  var typ = $.T.typ;
  var isa = $.T.isa;
  var tagp = $.T.tagp;
  
  var pos = $.pos;
  var pol = $.pol;
  var len = $.len_;
  var las = $.las_;
  var sli = $.sliStr;
  
  var err = $.err;
  
  var mknumr = R.mknum;
  var tostrr = R.tostr;
  var tonumr = R.tonum;
  
  var realr = R.real;
  var realintr = R.realint;
  
  var prec = R.prec;
  
  var trimr = R.trim;
  var siz = R.siz;
  var nsiz = R.nsiz;
  
  var zeror = R.zero;
  var oner = R.one;
  var twor = R.two;
  var halfr = R.half;
  
  var zeropr = R.zerop;
  var onepr = R.onep;
  var negpr = R.negp;
  var intpr = R.intp;
  
  var absr = R.abs;
  var negr = R.neg;
  
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
  var sinr = R.sin;
  var cosr = R.cos;
  var atanr = R.atan;
  var atan2r = R.atan2;
  var sinhr = R.sinh;
  var coshr = R.cosh;
  
  var pir = R.pi;
  var er = R.e;
  var phir = R.phi;
  var ln2r = R.ln2;
  var ln5r = R.ln5;
  var ln10r = R.ln10;
  
  ////// Javascript number constants //////
  
  // Javascript largest integer: 2^53 = 9007199254740992
  // Javascript largest float ≈ 1.79769313486231580793728e+308
  // shortened to 1.7976931348623157e+308
  
  ////// Complex number functions //////
  
  //// Converters ////
  
  function mknum(s){
    var p, a, b;
    p = pos("+", s); // should be at most one +
    if (p != -1){
      // 5+i
      // 5+2i
      a = sli(s, 0, p);
      b = sli(s, p+1, len(s)-1);
      if (b == "")b += "1";
    } else {
      p = pol("-", s);
      if (p != -1 && p != 0){
        // 5-i
        // 5-2i
        // -5-i
        // -5-2i
        a = sli(s, 0, p);
        b = sli(s, p, len(s)-1);
        if (b == "-")b += "1";
      } else {
        // no + or - or - is at start
        // 25, -25, i, -i, 5i, -5i
        if (las(s) == "i"){
          // i, -i, 5i, -5i
          a = "0";
          b = sli(s, 0, len(s)-1);
          if (b == "-" || b == "")b += "1";
        } else {
          // 25, -25
          a = s;
          b = "0";
        }
      }
    }
    return mknum2(a, b);
  }
  
  function mknum2(a, b){
    return N(mknumr(a), mknumr(b));
  }
  
  function cmpl(z){
    if (cmplp(z))return trim(z);
    z = realr(z);
    if (z === false)return false;
    return N(z, zeror());
  }
  
  function cmplreal(z){
    if (cmplp(z)){
      if (realp(z))return trim(z);
      return false;
    }
    z = realr(z);
    if (z === false)return false;
    return N(z, zeror());
  }
  
  function real(a){
    if (cmplp(a)){
      if (realp(a))return A(a);
      return false;
    }
    return realr(a);
  }
  
  function realint(a){
    if (cmplp(a)){
      if (realp(a))return realintr(A(a));
      return false;
    }
    return realintr(a);
  }
  
  function tostr(z){
    if (z == "")err(tostr, "Something happened");
    var a = A(z); var b = B(z);
    var re = tostrr(a);
    if (zeropr(b))return re;
    var sign = negpr(b);
    var b = absr(b);
    var im = onepr(b)?"i":tostrr(b) + "i";
    if (zeropr(a))return sign?"-"+im:im;
    return re + (sign?"-":"+") + im;
  }
  
  //// Builders ////

  function N(a, b){
    return {a: a, b: b, type: "cmpl"};
  }
  
  function A(z){
    return z.a;
  }
  
  function B(z){
    return z.b;
  }
  
  function zero(){
    return N(zeror(), zeror());
  }

  function cmplp(a){
    return tagp(a) && isa("cmpl", a);
  }
  
  //// Processing functions ////
  
  function trim(z){
    return N(trimr(A(z)), trimr(B(z)));
  }
  
  //// Predicates ////
  
  function realp(z){
    return zeropr(B(z));
  }
  
  function intp(z){
    return realp(z) && intp(A(z));
  }
  
  function zerop(z){
    return zeropr(A(z)) && zeropr(B(z));
  }
  
  //// Basic operation functions ////
  
  function add(z, w, p){
    return N(addr(A(z), A(w), p),
             addr(B(z), B(w), p));
  }
  
  function sub(z, w, p){
    return N(subr(A(z), A(w), p),
             subr(B(z), B(w), p));
  }
  
  function mul(z, w, p){
    var a, b, c, d;
    a = A(z); b = B(z);
    c = A(w); d = B(w);
    
    return N(subr(mulr(a, c), mulr(b, d), p),
             addr(mulr(a, d), mulr(b, c), p));
  }
  
  function div(z, w, p){
    if (p == udf)p = prec();
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
    return N(rndr(A(z), p),
             rndr(B(z), p));
  }
  
  function cei(z, p){
    return N(ceir(A(z), p),
             ceir(B(z), p));
  }
  
  function flr(z, p){
    return N(flrr(A(z), p),
             flrr(B(z), p));
  }
  
  function trn(z, p){
    return N(trnr(A(z), p),
             trnr(B(z), p));
  }
  
  //// Other operation functions ////
  
  function abs(z, p){
    if (p == udf)p = prec();
    return N(sqrtr(addr(mulr(A(z), A(z)),
                        mulr(B(z), B(z))), p), zeror());
  }
  
  function arg(z, p){
    if (p == udf)p = prec();
    if (zerop(z))return zero();
    return N(atan2r(B(z), A(z), p), zeror());
  }
  
  function sgn(z, p){
    if (p == udf)p = prec();
    if (zerop(z))return z;
    return div(z, abs(z, p+2), p);
  }
  
  function re(z){
    return N(A(z), zeror());
  }
  
  function im(z){
    return N(B(z), zeror());
  }
  
  function conj(z){
    return N(A(z), negr(B(z)));
  }
  
  //// Extended operation functions ////
  
  function exp(z, p){
    if (p == udf)p = prec();
    
    var a, b;
    a = A(z); b = B(z);
    
    var ex = expr(a, p+2);
    return N(mulr(ex, cosr(b, p+2+siz(ex)), p),
             mulr(ex, sinr(b, p+2+siz(ex)), p));
  }
  
  function ln(z, p){
    if (p == udf)p = prec();
    return N(lnr(A(abs(z, p+2)), p),
             A(arg(z, p)));
  }
  
  function pow(z, w, p){
    if (p == udf)p = prec();
    
    var a, b, c, d;
    a = A(z); b = B(z);
    c = A(w); d = B(w);
    
    if (zeropr(b) && zeropr(d) && (intpr(c) || !negpr(a))){
      return N(powr(a, c, p), zeror());
    }
    
    var n = Math.ceil(Math.abs(tonumr(c))*siz(addr(absr(a), absr(b)))+2*Math.abs(tonumr(d)));
    
    var pd = mul(w, ln(z, p+n+4), p+n+2);
    return exp(pd, p);
  }
  
  
  //// C object exposure ////
  
  var C = {
    mknum: mknum,
    mknum2: mknum2,
    cmpl: cmpl,
    cmplreal: cmplreal,
    real: real,
    realint: realint,
    tostr: tostr,
    
    num: N,
    getA: A,
    getB: B,
    cmplp: cmplp,
    
    trim: trim,
    
    realp: realp,
    intp: intp,
    
    add: add,
    sub: sub,
    mul: mul,
    div: div,
    
    rnd: rnd,
    cei: cei,
    flr: flr,
    trn: trn,
    
    round: rnd,
    ceil: cei,
    floor: flr,
    trunc: trn,
    
    abs: abs,
    arg: arg,
    sgn: sgn,
    re: re,
    im: im,
    conj: conj,
    
    exp: exp,
    ln: ln,
    pow: pow
  };
  
  if (nodep)module.exports = C;
  else window.C = C;
  
  ////// Speed tests //////
  
  function a(){
    
  }
  
  function b(){
    
  }
  
  //al("");
  //spd(a, b, 10000);
  
  ////// Testing //////
  
  
  
})();
