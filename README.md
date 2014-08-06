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

Coming soon!
