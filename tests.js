QUnit.test('Converters', function (assert){
  assert.testcmpl(C.mknum2("1", "0.4352"), "1", "0.4352");
  assert.testcmpl(C.mknum2("-1", "0"), "-1", "0");
  assert.testcmpl(C.mknum2("0253.340000", "00000.0000"), "253.34", "0");
  
  assert.testcmpl(C.mknum("1+0.4352i"), "1", "0.4352");
  assert.testcmpl(C.mknum("-1"), "-1", "0");
  assert.testcmpl(C.mknum("0253.340000+00000.0000i"), "253.34", "0");
  assert.testcmpl(C.mknum("0.4352i"), "0", "0.4352");
  assert.testcmpl(C.mknum("-i"), "0", "-1");
  assert.testcmpl(C.mknum("5"), "5", "0");
  assert.testcmpl(C.mknum("i"), "0", "1");
  assert.testcmpl(C.mknum("5-i"), "5", "-1");
  assert.testcmpl(C.mknum("5+i"), "5", "1");
  assert.testcmpl(C.mknum("-5-i"), "-5", "-1");
  assert.testcmpl(C.mknum("-5+i"), "-5", "1");
  assert.testcmpl(C.mknum("5-2i"), "5", "-2");
  assert.testcmpl(C.mknum("5+2i"), "5", "2");
  assert.testcmpl(C.mknum("-5-2i"), "-5", "-2");
  assert.testcmpl(C.mknum("-5+2i"), "-5", "2");
  assert.testcmpl(C.mknum("005.24300-002.3430i"), "5.243", "-2.343");
  assert.testcmpl(C.mknum("005.24300+002.3430i"), "5.243", "2.343");
  assert.testcmpl(C.mknum("-005.24300-002.3430i"), "-5.243", "-2.343");
  assert.testcmpl(C.mknum("-005.24300+002.3430i"), "-5.243", "2.343");
  assert.testcmpl(C.mknum("000.000+0i"), "0", "0");
  assert.testcmpl(C.mknum("0i"), "0", "0");
  assert.testcmpl(C.mknum("000.000"), "0", "0");
  assert.testcmpl(C.mknum("-0i"), "0", "0");
  assert.testcmpl(C.mknum("000.0000i"), "0", "0");
  
  assert.testcmpl(C.cmpl(1), "1", "0");
  assert.testcmpl(C.cmpl(0), "0", "0");
  assert.testcmpl(C.cmpl(535.2353), "535.2353", "0");
  assert.testcmpl(C.cmpl(-253), "-253", "0");
  assert.testcmpl(C.cmpl("23"), "23", "0");
  assert.testcmpl(C.cmpl("-23"), "-23", "0");
  assert.same(C.cmpl(""), false);
  assert.same(C.cmpl("aefwef"), false);
  assert.testcmpl(C.cmpl(C.mknum("1-i")), "1", "-1");
  
  assert.testcmpl(C.cmplreal(1), "1", "0");
  assert.testcmpl(C.cmplreal(0), "0", "0");
  assert.testcmpl(C.cmplreal(535.2353), "535.2353", "0");
  assert.testcmpl(C.cmplreal(-253), "-253", "0");
  assert.testcmpl(C.cmplreal("23"), "23", "0");
  assert.testcmpl(C.cmplreal("-23"), "-23", "0");
  assert.same(C.cmplreal(""), false);
  assert.same(C.cmplreal("aefwef"), false);
  assert.same(C.cmplreal(C.mknum("1-i")), false);
  
  assert.testnum(C.real(C.mknum("-000234.432")), true, R.strToArr("234432"), -3);
  assert.same(C.real(C.mknum("-000234.432+i")), false);
  assert.same(C.real(C.mknum("-000234.432+0.000001i")), false);
  assert.testnum(C.real(234), false, R.strToArr("234"), 0);
  assert.testnum(C.real("-0234034.000"), true, R.strToArr("234034"), 0);
  assert.testnum(C.real("0234034.0001"), false, R.strToArr("2340340001"), -4);
  
  
  assert.same(C.realint(C.mknum("-000234.432")), false);
  assert.same(C.realint(C.mknum("-000234.432+i")), false);
  assert.same(C.realint(C.mknum("-000234.432+0.000001i")), false);
  assert.same(C.realint(234), 234);
  assert.same(C.realint("-0234034.000"), -234034);
  assert.same(C.realint("0234034.0001"), false);
  
  assert.testcstr(C.mknum("234.53243-24.34i"), "234.53243-24.34i");
  assert.testcstr(C.mknum("1+i"), "1+i");
  assert.testcstr(C.mknum("1-i"), "1-i");
  assert.testcstr(C.mknum("1+2i"), "1+2i");
  assert.testcstr(C.mknum("1-2i"), "1-2i");
  assert.testcstr(C.mknum("i"), "i");
  assert.testcstr(C.mknum("-i"), "-i");
  assert.testcstr(C.mknum("2i"), "2i");
  assert.testcstr(C.mknum("-2i"), "-2i");
  assert.testcstr(C.mknum("1"), "1");
  assert.testcstr(C.mknum("-1"), "-1");
  assert.testcstr(C.mknum("0"), "0");
});

QUnit.test('Basic operation functions', function (assert){
  assert.testcstr(C.add(C.mknum("5+3i"), C.mknum("2+i")), "7+4i");
  assert.testcstr(C.add(C.mknum("5+3i"), C.mknum("-2-3i")), "3");
  assert.testcstr(C.add(C.mknum("-5+3i"), C.mknum("-2+i")), "-7+4i");
  assert.testcstr(C.add(C.mknum("-5+3i"), C.mknum("5-3i")), "0");
  assert.testcstr(C.add(C.mknum("0"), C.mknum("0")), "0");
  assert.testcstr(C.add(C.mknum("i"), C.mknum("i")), "2i");
  assert.testcstr(C.add(C.mknum("1"), C.mknum("1")), "2");
  
  
  assert.testcstr(C.sub(C.mknum("5+3i"), C.mknum("2+i")), "3+2i");
  assert.testcstr(C.sub(C.mknum("5+3i"), C.mknum("-2-3i")), "7+6i");
  assert.testcstr(C.sub(C.mknum("-5+3i"), C.mknum("-2+i")), "-3+2i");
  assert.testcstr(C.sub(C.mknum("-5+3i"), C.mknum("5-3i")), "-10+6i");
  assert.testcstr(C.sub(C.mknum("0"), C.mknum("0")), "0");
  assert.testcstr(C.sub(C.mknum("i"), C.mknum("i")), "0");
  assert.testcstr(C.sub(C.mknum("1"), C.mknum("1")), "0");
  
  
  assert.testcstr(C.mul(C.mknum("5+3i"), C.mknum("2+i")), "7+11i");
  assert.testcstr(C.mul(C.mknum("5+3i"), C.mknum("-2-3i")), "-1-21i");
  assert.testcstr(C.mul(C.mknum("-5+3i"), C.mknum("-2+i")), "7-11i");
  assert.testcstr(C.mul(C.mknum("-5+3i"), C.mknum("5-3i")), "-16+30i");
  assert.testcstr(C.mul(C.mknum("0"), C.mknum("0")), "0");
  assert.testcstr(C.mul(C.mknum("i"), C.mknum("i")), "-1");
  assert.testcstr(C.mul(C.mknum("1"), C.mknum("1")), "1");
  
  
  assert.testcstr(C.div(C.mknum("5+3i"), C.mknum("2+i")), "2.6+0.2i");
  assert.testcstr(C.div(C.mknum("5+3i"), C.mknum("-2-3i"), 16), "-1.4615384615384615+0.6923076923076923i");
  assert.testcstr(C.div(C.mknum("-5+3i"), C.mknum("-2+i")), "2.6-0.2i");
  assert.testcstr(C.div(C.mknum("-5+3i"), C.mknum("5-3i")), "-1");
  assert.throws(function (){
    C.div(C.mknum("0"), C.mknum("0"));
  });
  assert.testcstr(C.div(C.mknum("i"), C.mknum("i")), "1");
  assert.testcstr(C.div(C.mknum("1"), C.mknum("1")), "1");
});

QUnit.test('abs, arg, sgn', function (assert){
  assert.testcstr(C.abs(C.mknum("0")), "0");
  assert.testcstr(C.abs(C.mknum("1")), "1");
  assert.testcstr(C.abs(C.mknum("-1")), "1");
  assert.testcstr(C.abs(C.mknum("i")), "1");
  assert.testcstr(C.abs(C.mknum("-i")), "1");
  assert.testcstr(C.abs(C.mknum("1+i"), 16), "1.414213562373095");
  assert.testcstr(C.abs(C.mknum("-1+i"), 16), "1.414213562373095");
  
  assert.testcstr(C.arg(C.mknum("0")), "0");
  assert.testcstr(C.arg(C.mknum("1")), "0");
  assert.testcstr(C.arg(C.mknum("-1"), 16), "3.1415926535897932");
  assert.testcstr(C.arg(C.mknum("i"), 16), "1.5707963267948966");
  assert.testcstr(C.arg(C.mknum("-i"), 16), "-1.5707963267948966");
  assert.testcstr(C.arg(C.mknum("1+i"), 16), "0.7853981633974483");
  assert.testcstr(C.arg(C.mknum("-1+i"), 16), "2.3561944901923449");
  
  assert.testcstr(C.sgn(C.mknum("0")), "0");
  assert.testcstr(C.sgn(C.mknum("1")), "1");
  assert.testcstr(C.sgn(C.mknum("-1")), "-1");
  assert.testcstr(C.sgn(C.mknum("i")), "i");
  assert.testcstr(C.sgn(C.mknum("-i")), "-i");
  assert.testcstr(C.sgn(C.mknum("1+i"), 16), "0.7071067811865475+0.7071067811865475i");
  assert.testcstr(C.sgn(C.mknum("-1+i"), 16), "-0.7071067811865475+0.7071067811865475i");
});

QUnit.test('exp', function (assert){
  assert.testcstr(C.exp(C.mknum("0")), "1");
  assert.testcstr(C.exp(C.mknum("100"), 100), "26881171418161354484126255515800135873611118.7737419224151916086152802870349095649141588710972198457108116708791905760686975977097618682335484596");
  assert.testcstr(C.exp(C.mknum("1"), 100), "2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274");
  assert.testcstr(C.exp(C.mknum("i"), 16), "0.5403023058681397+0.8414709848078965i");
  assert.testcstr(C.exp(C.mknum("3.141592653589793238i"), 16), "-1");
  assert.testcstr(C.exp(C.mknum("-i"), 16), "0.5403023058681397-0.8414709848078965i");
  assert.testcstr(C.exp(C.mknum("-2-3i"), 16), "-0.1339809149295426-0.0190985162611352i");
});

QUnit.test('ln', function (assert){
  assert.throws(function (){
    C.ln(C.mknum("0"));
  });
  assert.testcstr(C.ln(C.mknum("100"), 100), "4.6051701859880913680359829093687284152022029772575459520666558019351452193547049604719944101791965967");
  assert.testcstr(C.ln(C.mknum("1")), "0");
  assert.testcstr(C.ln(C.mknum("i"), 16), "1.5707963267948966i");
  assert.testcstr(C.ln(C.mknum("-10"), 16), "2.3025850929940457+3.1415926535897932i");
  assert.testcstr(C.ln(C.mknum("-2-3i"), 16), "1.2824746787307684-2.1587989303424642i");
});

QUnit.test('pow', function (assert){
  assert.testcstr(C.pow(C.mknum("2"), C.mknum("1000")), "10715086071862673209484250490600018105614048117055336074437503883703510511249361224931983788156958581275946729175531468251871452856923140435984577574698574803934567774824230985421074605062371141877954182153046474983581941267398767559165543946077062914571196477686542167660429831652624386837205668069376");
  assert.testcstr(C.pow(C.mknum("2"), C.mknum("0.5"), 16), "1.414213562373095");
  assert.testcstr(C.pow(C.mknum("-1"), C.mknum("0.5"), 16), "i");
  assert.testcstr(C.pow(C.mknum("-1"), C.mknum("0.25"), 16), "0.7071067811865475+0.7071067811865475i");
  assert.testcstr(C.pow(C.mknum("-1"), C.mknum("0.5"), 16), "i");
  assert.testcstr(C.pow(C.mknum("i"), C.mknum("i"), 16), "0.2078795763507619");
  assert.testcstr(C.pow(C.mknum("2.718281828459045235"), C.mknum("3.141592653589793238i"), 16), "-1");
  assert.testcstr(C.pow(C.mknum("5+4i"), C.mknum("-3+2i"), 16), "-0.0001168546805998+0.0009810531656381i");
  assert.testcstr(C.pow(C.mknum("0.01"), C.mknum("20")), "0.0000000000000000000000000000000000000001");
  assert.testcstr(C.pow(C.mknum("i"), C.mknum("1000000")), "1");
  
  
  //if (slow){
    assert.testcstr(C.pow(C.mknum("5+4i"), C.mknum("-3+2i"), 200), "-0.00011685468059981465799756939530641227002724915513044172120301282852830494954923790101557733274941753191572939350344043767181593532180821381661520132174768513863188875254516926483654572895495881701389+0.00098105316563811341777287688530295679176789580950138830704331962932537912241912103229548283269690132494418745301999901031529514956879124135174837540176060198201672848103963726820329642265732707145305i");
  //}
});

QUnit.test('root', function (assert){
  assert.testcstr(C.root(C.mknum("2"), C.mknum("2"), 100), "1.4142135623730950488016887242096980785696718753769480731766797379907324784621070388503875343276415727");
  assert.testcstr(C.root(C.mknum("3"), C.mknum("2"), 100), "1.2599210498948731647672106072782283505702514647015079800819751121552996765139594837293965624362550942");
  assert.testcstr(C.root(C.mknum("3"), C.mknum("i"), 100), "0.8660254037844386467637231707529361834714026269051903140279034897259665084544000185405730933786242878+0.5i");
  assert.testcstr(C.root(C.mknum("3"), C.mknum("-1"), 100), "-1");
  assert.testcstr(C.root(C.mknum("i"), C.mknum("-1"), 100), "23.1406926327792690057290863679485473802661062426002119934450464095243423506904527835169719970675492197");
  assert.testcstr(C.root(C.mknum("i"), C.mknum("i"), 100), "4.8104773809653516554730356667038331263901708746645349400208154892425519048915821367487047665838833547");
  assert.testcstr(C.root(C.mknum("3"), C.mknum("-0.236067977499789696"), 16), "-0.6180339887498948");
  assert.testcstr(C.root(C.mknum("3"), C.mknum("2+2i"), 16), "1.3660254037844386+0.3660254037844386i");
  assert.testcstr(C.root(C.mknum("3"), C.mknum("2-2i"), 16), "1.3660254037844386-0.3660254037844386i");
  assert.testcstr(C.root(C.mknum("1+i"), C.mknum("1+i"), 16), "1.7189598149893849+0.3833321644314644i");
  
  //if (slow){
    assert.testcstr(C.sqrt(C.mknum("2"), 1000), "1.4142135623730950488016887242096980785696718753769480731766797379907324784621070388503875343276415727350138462309122970249248360558507372126441214970999358314132226659275055927557999505011527820605714701095599716059702745345968620147285174186408891986095523292304843087143214508397626036279952514079896872533965463318088296406206152583523950547457502877599617298355752203375318570113543746034084988471603868999706990048150305440277903164542478230684929369186215805784631115966687130130156185689872372352885092648612494977154218334204285686060146824720771435854874155657069677653720226485447015858801620758474922657226002085584466521458398893944370926591800311388246468157082630100594858704003186480342194897278290641045072636881313739855256117322040245091227700226941127573627280495738108967504018369868368450725799364729060762996941380475654823728997180326802474420629269124859052181004459842150591120249441341728531478105803603371077309182869314710171111683916581726889419758716582152128229518488472");
  //}
  assert.testcstr(C.sqrt(C.mknum("3+4i"), 1000), "2+i");
  assert.testcstr(C.sqrt(C.mknum("3-4i"), 1000), "2-i");
  assert.testcstr(C.sqrt(C.mknum("-3+4i"), 1000), "1+2i");
  assert.testcstr(C.sqrt(C.mknum("-3-4i"), 1000), "1-2i");
  assert.testcstr(C.sqrt(C.mknum("-1"), 1000), "i");
  assert.testcstr(C.sqrt(C.mknum("i"), 100), "0.7071067811865475244008443621048490392848359376884740365883398689953662392310535194251937671638207864+0.7071067811865475244008443621048490392848359376884740365883398689953662392310535194251937671638207864i");
  assert.testcstr(C.sqrt(C.mknum("1+i"), 100), "1.0986841134678099660398011952406783785443931209271577437444115788428750535552848111365360663564159255+0.455089860562227341304357757822468569620190378483150092588259569490800203233448291591401819761020849i");
  
  assert.testcstr(C.cbrt(C.mknum("2+2i"), 16), "1.3660254037844386+0.3660254037844386i");
});

QUnit.test('sin and cos', function (assert){
  assert.testcstr(C.sin(C.mknum("1.5707963267948966-1.3169578969248167i")), "2");
  assert.testcstr(C.sin(C.mknum("1+i"), 100), "1.2984575814159772948260423658078156203134365616352080734018421036739117144196223586722230244110672781+0.6349639147847361082550822029915097815170819514193794105269529419319753121371884917682306436749751802i");
  
  assert.testcstr(C.cos(C.mknum("1.5707963267948966-1.3169578969248167i")), "1.7320508075688773i");
  assert.testcstr(C.cos(C.mknum("1+i"), 100), "0.8337300251311490488838853943350944798098747852096293122707227343789616537223236469544938538709267571-0.9888977057628650963821295408926861886421496950331476075368160104297354457697230505951218276304819978i");
});

QUnit.test('atan2', function (assert){
  assert.testcstr(C.atan2(R.mknum("5"), R.mknum("2"), 100), "1.1902899496825317329277337748293183376011789860294520729111666738297077453141013969551539665751855988");
});

QUnit.test('Constants', function (assert){
  assert.testcstr(C.e(1000), "2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274274663919320030599218174135966290435729003342952605956307381323286279434907632338298807531952510190115738341879307021540891499348841675092447614606680822648001684774118537423454424371075390777449920695517027618386062613313845830007520449338265602976067371132007093287091274437470472306969772093101416928368190255151086574637721112523897844250569536967707854499699679468644549059879316368892300987931277361782154249992295763514822082698951936680331825288693984964651058209392398294887933203625094431173012381970684161403970198376793206832823764648042953118023287825098194558153017567173613320698112509961818815930416903515988885193458072738667385894228792284998920868058257492796104841984443634632449684875602336248270419786232090021609902353043699418491463140934317381436405462531520961836908887070167683964243781405927145635490613031072085103837505101157477041718986106873969655212671546889570350354");
});

QUnit.test('fact', function (assert){
  assert.testcstr(C.fact(R.mknum("100")), "93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000");
});

QUnit.test('agm', function (assert){
  assert.testcstr(C.agm(C.mknum("2"), C.mknum("3"), 16), "2.4746804362363045");
  assert.testcstr(C.agm(C.mknum("2i"), C.mknum("3i"), 16), "2.4746804362363045i");
});
