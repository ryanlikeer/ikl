var css = '.RyanAH{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;overflow:visible;position:fixed;text-align:center;top:20%;left:5%;right:5%;margin:auto;z-index:999;background-image:none;width:auto;max-width:420px;height:auto;animation:1s fadeIn;animation-fill-mode:backwards;background-color:#fff;border:2px solid #668da6;border-radius:5px}.btnRyanAH{position:absolute;width:20px;height:20px;top:-10px;right:-8px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAL5JREFUOI2l0TsKwlAQheEzLtAmsRF8IO7BwsZlqJ2FLkYUdA2CjeAWjk0uXMfMnUk89Z8vCQP8MZLDSESS00BXN+3LCoTfmxWwtWrfHpY2bsFWRvvQv2ltlHUnp31G0Yrk0WkIAKIP4h3DmojID9gXTVgr2BXNMROMohoDgIGBnQMfNw80AMmbd81sSw+7d8DSJhZ27YGlLTR28Z5outLqhG0iWPby0qoUHSKYh+poH8Es1Ip2EUyjXrSNYNY+UCui/Qn48lcAAAAASUVORK5CYII=);background-size:10px 10px;background-position:5px;background-color:#000;color:#fff;background-repeat:no-repeat;box-shadow:0 -1px 1px 0 rgba(0,0,0,.2);border:none;border-radius:50%;cursor:pointer;display:none}@keyframes fadeIn{0%{opacity:0}100%{visibility:visible;opacity:1}}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet){
  // This is required for IE8 and below.
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}
var ads = '<div style="max-height:300px !important;"><div id="AdsRyanAH" class="adsbymgid"><div id="M493087ScriptRootC895332"></div><button aria-label="Close this ad" class="btnRyanAH" onclick="hideIt()" id="btnHide"></button></div></div>';
// Run Scripts
insertAd('adsRefresh1', ads);
function insertAd(div,v){
document.getElementById(div).innerHTML=v;
}

function jsLoader(url){
var head_ID = document.getElementsByTagName("head")[0]; 
var script_element = document.createElement('script');
script_element.type = 'text/javascript';
script_element.src = url;
head_ID.appendChild(script_element);
}
// Muat Javascript Eksternal
jsLoader("//jsc.mgid.com/i/n/ini-keren1.blogspot.com.895332.js");

function showIt() {
  var adsyank = document.getElementById('AdsRyanAH');
  var adsyank2 = document.getElementById('btnHide');
  adsyank.classList.add("RyanAH");
  adsyank2.style = "display:block";
}
function hideIt() {
  var adsyank = document.getElementById('AdsRyanAH');
  var adsyank2 = document.getElementById('btnHide');
  adsyank.classList.remove("RyanAH");
  adsyank2.style = "visibility:hidden";
}

var dtknya = "16,20,25,30";
detiknya = dtknya.split(",");
var muncul = detiknya[Math.floor(Math.random()*detiknya.length)];
var muncul = muncul * 1000;
var hilang = muncul + 8000;
setTimeout("showIt()", muncul); 
setTimeout("hideIt()", hilang); 

