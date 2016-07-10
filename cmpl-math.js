/***** Complex Number Math Library *****/

/* require tools */
/* require prec-math */

(function (udf){
  ////// Import //////
  
  var nodep = $.nodep;
  var inf = Infinity;
  var num = Number;
  var str = String;
  
  var typ = $.typ;
  var isa = $.isa;
  var tagp = $.tagp;
  
  var setDspFn = $.setDspFn;
  
  var pos = $.pos;
  var pol = $.pol;
  var len = $.len_;
  var las = $.las_;
  var sli = $.sliStr;
  
  var apl = $.apl;
  
  var worig = $.worig;
  
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
  var wnegr = R.wneg;
  var byzeror = R.byzero;
  
  var zeror = R.zero;
  var oner = R.one;
  var twor = R.two;
  var halfr = R.half;
  
  var zeropr = R.zerop;
  var onepr = R.onep;
  var negpr = R.negp;
  var intpr = R.intp;
  var oddpr = R.oddp;
  
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
  var sinhr = R.sinh;
  var coshr = R.cosh;
  
  var atanr = R.atan;
  var atan2r = R.atan2;
  
  var factr = R.fact;
  var binr = R.bin;
  var quor = R.quo;
  var modr = R.mod;
  var gcdr = R.gcd;
  
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
    return Nreal(z);
  }
  
  function cmplreal(z){
    if (cmplp(z)){
      if (realp(z))return trim(z);
      return false;
    }
    z = realr(z);
    if (z === false)return false;
    return Nreal(z);
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
  
  setDspFn("cmpl", function (a){
    return "<cmpl " + tostr(a) + ">";
  });
  
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
  
  function Nreal(a){
    return N(a, zeror());
  }

  function zero(){
    return Nreal(zeror());
  }
  
  function one(){
    return Nreal(oner());
  }
  
  function half(){
    return Nreal(halfr());
  }
  
  function cmplp(a){
    return tagp(a) && isa("cmpl", a);
  }
  
  function mkrealfn(f){
    return worig(f, function (){
      return Nreal(apl(f, arguments));
    });
  }
  
  //// Processing functions ////
  
  function trim(z){
    return N(trimr(A(z)), trimr(B(z)));
  }
  
  function byzero(z, p){
    return byzeror(A(z), p) && byzeror(B(z), p);
  }
  
  function diffbyzero(z, w, p){
    return byzero(sub(z, w), p);
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
    return Nreal(A(z));
  }
  
  function im(z){
    return Nreal(B(z));
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
    return N(mulr(lnr(addr(mulr(A(z), A(z)),
                           mulr(B(z), B(z)), p+4), 
                      p+2), halfr(), p),
             A(arg(z, p)));
  }
  
  function pow(z, w, p){
    if (p == udf)p = prec();
    
    var a, b, c, d;
    a = A(z); b = B(z);
    c = A(w); d = B(w);
    
    if (realp(z) && realp(w) && (intpr(c) || !negpr(a))){
      return Nreal(powr(a, c, p));
    }
    
    var n = Math.ceil(Math.abs(tonumr(c))*siz(addr(absr(a), absr(b)))+2*Math.abs(tonumr(d)));
    
    var pd = mul(w, ln(z, p+n+4), p+n+2);
    return exp(pd, p);
  }
  
  // @param cmpl n
  function root(n, z, p){
    if (p == udf)p = prec();
    
    // if z is real and n is real and odd, return real root
    if (realp(z) && realp(n) && oddpr(A(n))){
      var c = A(z);
      var a = A(n);
      return N(wnegr(negpr(c),
                     powr(absr(c),
                          divr(oner(), a, p+2),
                          p)),
               zeror());
    }
    
    return pow(z, div(one(), n, p+2), p);
  }
  
  function sqrt(z, p){
    if (p == udf)p = prec();
    
    var a, b;
    a = A(z); b = B(z);
    
    var absz = A(abs(z, p+4));
    return N(sqrtr(mulr(addr(absz, a), halfr(), p+2), p),
             wnegr(negpr(b), sqrtr(mulr(subr(absz, a), halfr(), p+2), p)));
  }
  
  function cbrt(z, p){
    return root(mknum("3"), z, p);
  }
  
  
  function sin(z, p){
    if (p == udf)p = prec();
    
    var a, b;
    a = A(z); b = B(z);
    
    var cosh = coshr(b, p+2);
    var sinh = sinhr(b, p+2);
    return N(mulr(sinr(a, p+2+siz(cosh)), cosh, p),
             mulr(cosr(a, p+2+siz(sinh)), sinh, p));
  }
  
  function cos(z, p){
    if (p == udf)p = prec();
    
    var a, b;
    a = A(z); b = B(z);
    
    var cosh = coshr(b, p+2);
    var sinh = sinhr(b, p+2);
    return N(mulr(cosr(a, p+2+siz(cosh)), cosh, p),
             negr(mulr(sinr(a, p+2+siz(sinh)), sinh, p)));
  }
  
  function sinh(z, p){
    if (p == udf)p = prec();
    
    var a, b;
    a = A(z); b = B(z);
    
    var sinh = sinhr(a, p+2);
    var cosh = coshr(a, p+2);
    return N(mulr(sinh, cosr(b, p+2+siz(sinh)), p),
             mulr(cosh, sinr(b, p+2+siz(cosh)), p));
  }
  
  function cosh(z, p){
    if (p == udf)p = prec();
    
    var a, b;
    a = A(z); b = B(z);
    
    var cosh = coshr(a, p+2);
    var sinh = sinhr(a, p+2);
    return N(mulr(cosh, cosr(b, p+2+siz(cosh)), p),
             mulr(sinh, sinr(b, p+2+siz(sinh)), p));
  }
  
  var atan2 = mkrealfn(atan2r);
  
  //// Other functions ////
  
  var fact = mkrealfn(factr);
  var bin = mkrealfn(binr);
  var quo = mkrealfn(quor);
  var mod = mkrealfn(modr);
  var gcd = mkrealfn(gcdr);
  
  // http://en.wikipedia.org/wiki/Arithmetic%E2%80%93geometric_mean
  function agm(z, w, p){
    if (p == udf)p = prec();
    if (p == -inf)return zero();
    
    var s, t;
    while (true){
      s = mul(add(z, w), half(), p+2);
      t = sqrt(mul(z, w), p+2);
      if (diffbyzero(z, s, p))break;
      z = s; w = t;
    }
    
    return rnd(s, p);
  }
  
  var rand = mkrealfn(R.rand);
  
  //// Mathematical constants ////
  
  var pi = mkrealfn(pir);
  var e = mkrealfn(er);
  var phi = mkrealfn(phir);
  var ln2 = mkrealfn(ln2r);
  var ln5 = mkrealfn(ln5r);
  var ln10 = mkrealfn(ln10r);
  
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
    Nreal: Nreal,
    zero: zero,
    one: one,
    half: half,
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
    pow: pow,
    root: root,
    sqrt: sqrt,
    cbrt: cbrt,
    
    sin: sin,
    cos: cos,
    sinh: sinh,
    cosh: cosh,
    
    atan2: atan2,
    
    fact: fact,
    bin: bin,
    quo: quo,
    rem: mod,
    mod: mod,
    gcd: gcd,
    agm: agm,
    
    rand: rand,
    
    pi: pi,
    e: e,
    phi: phi,
    ln2: ln2,
    ln5: ln5,
    ln10: ln10
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
