# Complex Number Math Library

An complex number math library that works in both web js and Node.js.

## How to use in HTML

1. Go to https://github.com/xinxinw1/tools/releases and download the latest release.
2. Go to https://github.com/xinxinw1/prec-math/releases and download the latest release.
3. Go to https://github.com/xinxinw1/cmpl-math/releases and download the latest release.
4. Extract `tools.js` from the first download, `prec-math.js` from the second, and `cmpl-math.js` from the third into your project directory.
5. Add
   ```html
   <script src="tools.js"></script>
   <script src="prec-math.js"></script>
   <script src="cmpl-math.js"></script>
   ```
   to your html file.
6. Run `$.al(C.mul(C.num("326083431910576", "53943061760287"), C.num("2176454902834", "756240659123")))` to make sure it works. (Should output ["668911947533997805551324083", "364002190719197789019538206"])

See http://xinxinw1.github.io/cmpl-math/ for a demo.

## How to use in Node.js

1. Go to https://github.com/xinxinw1/tools/releases and download the latest release.
2. Go to https://github.com/xinxinw1/prec-math/releases and download the latest release.
3. Go to https://github.com/xinxinw1/cmpl-math/releases and download the latest release.
4. Extract `tools.js` from the first download, `prec-math.js` from the second, and `cmpl-math.js` from the third into your project directory.
5. Run `$ = require("./tools.js")` in node.
6. Run `R = require("./prec-math.js")` in node
7. Run `C = require("./cmpl-math.js")` in node
8. Run `$.prn(C.mul(C.num("326083431910576", "53943061760287"), C.num("2176454902834", "756240659123")))` to make sure it works. (Should output ["668911947533997805551324083", "364002190719197789019538206"] and return undefined)

## Function reference

```
Note: There are a couple of functions that exist, but haven't been
  documented yet

Note 2: These are all accessed by C.<insert name>

Note 3: To set the default precision, see the reference for
  https://github.com/xinxinw1/prec-math

Conventions: z and w are always regular complex numbers like ["3.4", "-1"],
  x and y are real numbers like "4.5" and "-234", n is always a real integer 
  like "5", and p is always a js integer like 456

### Complex number functions

#### Converters

gprec(p)          get current precision
sprec(p)          set current precision
cmpl(z)           ensure z is a proper complex number (could have been a real
                    number like "3.5", or an array like ["0003", "4.0000"]);
                    returns false if z is not a proper number
cmplreal(z)       ensure z is a real number in complex number form
                    (eg. ["345", "0"])
real(a)           same as R.real(a) but can handle ["3.453", "0"]
realint(a)        same as R.realint(a) but can handle ["3", "0"]

#### Validators

vldp(z)           is z a valid complex number

#### [a, b] functions

num(a, b)         create a complex number with real part a and imaginary
                    part b; currently makes an array [a, b];
                    internally called as N(a, b)
getA(z)           get the real part of z; internally A(z)
getB(z)           get the imaginary part of z; internally B(z)
dsp(z)            display z in the conventional a+bi form

#### Canonicalizers

trim(z)           Run R.trim on both parts of z

#### is... functions

realp(z)          B(z) == "0"
intpc(z)          is z an integer in complex number form; (eg. ["53", "0"])

#### Basic operation functions

add(z, w, p)      add two complex numbers; if p is given, round to p
                    decimals; note that p must be a js integer
sub(z, w, p)      subtract
mul(z, w, p)      multiply
div(z, w, p)      divide

#### Rounding functions

rnd(z, p)         round both real and imaginary parts of z to p decimals
cei(z, p)         ceiling
flr(z, p)         floor
trn(z, p)         truncate

round(z, p)       aliases of the functions above
ceil(z, p)
floor(z, p)
trunc(z, p)

#### Extended operation functions

exp(z, p)         exponential function
ln(z, p)          principal natural log (defined as ln(abs(z))+arg(z)*i)
pow(z, w, p)      principal z^w (defined as exp(w*ln(z)))
root(n, z, p)     nth root of z; if z is real and n is odd, return real root;
                    n must be a real number like "5"
sqrt(z, p)        square root of z
cbrt(z, p)        cube root of z

fact(x, p)        factorial of x; currently x must be an integer like "34";
                    returns answer in complex number form
bin(x, y, p)      binomial coefficient
agm(x, y, p)      arithmetic geometric mean; x and y must be real

sin(z, p)         complex sine of z
cos(z, p)         complex cosine
sinh(z, p)        hyperbolic sine
cosh(z, p)        hyperbolic cosine

#### Other operation functions

abs(z, p)         absolute value of z
arg(z, p)         principal argument of z; angle in the complex plane
sgn(z, p)         complex signum (defined as z/abs(z), z != 0; 0, z == 0)
re(z)             real part of z; returns answer in complex number form
im(z)             imaginary part of z
conj(z)           conjugate of z

#### Mathematical constants

pi(p)             N(R.pi(p), "0"); get pi in complex number form
e(p)              Euler's number
phi(p)            the golden ratio
ln2(p)            ln(2)
ln5(p)            ln(5)
ln10(p)           ln(10)
