// ==UserScript==
// @name        Origin Helper
// @author      anadius
// @namespace   anadius.hermietkreeft.site
// @homepageURL https://anadius.hermietkreeft.site/origin-helper
// @match       *://www.ea.com/*
// @version     2.1.11
// @icon        https://user-images.githubusercontent.com/8550471/187077252-2905e2dc-3241-4946-b1b3-f845a337d766.png
// @icon64      https://user-images.githubusercontent.com/8550471/187077254-476758f1-b784-45bf-a484-18d3ac704e44.png
// @grant       GM.xmlHttpRequest
// @grant       unsafeWindow
// @connect     api1.origin.com
// @connect     api2.origin.com
// @connect     api3.origin.com
// @connect     proxy.novafusion.ea.com
// @connect     achievements.gameservices.ea.com
// ==/UserScript==

///////////////////////////////////////////////////////
// custom setup for UserScript
///////////////////////////////////////////////////////

const customSetup = async () => {
  const a = makeLink(null, "Origin Helper", createMainMenu);
  a.style.padding = "11px";
  const menu = makeElement(document.body, "div", null, {"class": HELPER_ID});
  menu.append(a);
};
const HTML_FILE = false;

///////////////////////////////////////////////////////
// common code for HTML file and UserScript
///////////////////////////////////////////////////////

///////////////////////
// libraries
///////////////////////

//https://github.com/beatgammit/base64-js/blob/master/base64js.min.js
(function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"==typeof window?"undefined"==typeof global?"undefined"==typeof self?this:self:global:window,b.base64js=a()}})(function(){return function(){function b(d,e,g){function a(j,i){if(!e[j]){if(!d[j]){var f="function"==typeof require&&require;if(!i&&f)return f(j,!0);if(h)return h(j,!0);var c=new Error("Cannot find module '"+j+"'");throw c.code="MODULE_NOT_FOUND",c}var k=e[j]={exports:{}};d[j][0].call(k.exports,function(b){var c=d[j][1][b];return a(c||b)},k,k.exports,b,d,e,g)}return e[j].exports}for(var h="function"==typeof require&&require,c=0;c<g.length;c++)a(g[c]);return a}return b}()({"/":[function(a,b,c){'use strict';function d(a){var b=a.length;if(0<b%4)throw new Error("Invalid string. Length must be a multiple of 4");var c=a.indexOf("=");-1===c&&(c=b);var d=c===b?0:4-c%4;return[c,d]}function e(a,b,c){return 3*(b+c)/4-c}function f(a){var b,c,f=d(a),g=f[0],h=f[1],j=new m(e(a,g,h)),k=0,n=0<h?g-4:g;for(c=0;c<n;c+=4)b=l[a.charCodeAt(c)]<<18|l[a.charCodeAt(c+1)]<<12|l[a.charCodeAt(c+2)]<<6|l[a.charCodeAt(c+3)],j[k++]=255&b>>16,j[k++]=255&b>>8,j[k++]=255&b;return 2===h&&(b=l[a.charCodeAt(c)]<<2|l[a.charCodeAt(c+1)]>>4,j[k++]=255&b),1===h&&(b=l[a.charCodeAt(c)]<<10|l[a.charCodeAt(c+1)]<<4|l[a.charCodeAt(c+2)]>>2,j[k++]=255&b>>8,j[k++]=255&b),j}function g(a){return k[63&a>>18]+k[63&a>>12]+k[63&a>>6]+k[63&a]}function h(a,b,c){for(var d,e=[],f=b;f<c;f+=3)d=(16711680&a[f]<<16)+(65280&a[f+1]<<8)+(255&a[f+2]),e.push(g(d));return e.join("")}function j(a){for(var b,c=a.length,d=c%3,e=[],f=16383,g=0,j=c-d;g<j;g+=f)e.push(h(a,g,g+f>j?j:g+f));return 1===d?(b=a[c-1],e.push(k[b>>2]+k[63&b<<4]+"==")):2===d&&(b=(a[c-2]<<8)+a[c-1],e.push(k[b>>10]+k[63&b>>4]+k[63&b<<2]+"=")),e.join("")}c.byteLength=function(a){var b=d(a),c=b[0],e=b[1];return 3*(c+e)/4-e},c.toByteArray=f,c.fromByteArray=j;for(var k=[],l=[],m="undefined"==typeof Uint8Array?Array:Uint8Array,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o=0,p=n.length;o<p;++o)k[o]=n[o],l[n.charCodeAt(o)]=o;l[45]=62,l[95]=63},{}]},{},[])("/")});

// I had to mess with injection and custom events because it didn't work in UserScript...
const injection = () => {
/*!
 * hash-wasm (https://www.npmjs.com/package/hash-wasm)
 * (c) Dani Biro
 * @license MIT
 */
  !function(A,I){"object"==typeof exports&&"undefined"!=typeof module?I(exports):"function"==typeof define&&define.amd?define(["exports"],I):I((A="undefined"!=typeof globalThis?globalThis:A||self).hashwasm=A.hashwasm||{})}(this,(function(A){"use strict";function I(A,I,B,g){return new(B||(B=Promise))((function(i,e){function n(A){try{c(g.next(A))}catch(A){e(A)}}function Q(A){try{c(g.throw(A))}catch(A){e(A)}}function c(A){var I;A.done?i(A.value):(I=A.value,I instanceof B?I:new B((function(A){A(I)}))).then(n,Q)}c((g=g.apply(A,I||[])).next())}))}class B{constructor(){this.mutex=Promise.resolve()}lock(){let A=()=>{};return this.mutex=this.mutex.then((()=>new Promise(A))),new Promise((I=>{A=I}))}dispatch(A){return I(this,void 0,void 0,(function*(){const I=yield this.lock();try{return yield Promise.resolve(A())}finally{I()}}))}}var g;const i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:global,e=null!==(g=i.Buffer)&&void 0!==g?g:null,n=i.TextEncoder?new i.TextEncoder:null;function Q(A,I){return(15&A)+(A>>6|A>>3&8)<<4|(15&I)+(I>>6|I>>3&8)}const c="a".charCodeAt(0)-10,t="0".charCodeAt(0);function o(A,I,B){let g=0;for(let i=0;i<B;i++){let B=I[i]>>>4;A[g++]=B>9?B+c:B+t,B=15&I[i],A[g++]=B>9?B+c:B+t}return String.fromCharCode.apply(null,A)}const a=null!==e?A=>{if("string"==typeof A){const I=e.from(A,"utf8");return new Uint8Array(I.buffer,I.byteOffset,I.length)}if(e.isBuffer(A))return new Uint8Array(A.buffer,A.byteOffset,A.length);if(ArrayBuffer.isView(A))return new Uint8Array(A.buffer,A.byteOffset,A.byteLength);throw new Error("Invalid data type!")}:A=>{if("string"==typeof A)return n.encode(A);if(ArrayBuffer.isView(A))return new Uint8Array(A.buffer,A.byteOffset,A.byteLength);throw new Error("Invalid data type!")},E="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",d=new Uint8Array(256);for(let A=0;A<E.length;A++)d[E.charCodeAt(A)]=A;function r(A){const I=function(A){let I=Math.floor(.75*A.length);const B=A.length;return"="===A[B-1]&&(I-=1,"="===A[B-2]&&(I-=1)),I}(A),B=A.length,g=new Uint8Array(I);let i=0;for(let I=0;I<B;I+=4){const B=d[A.charCodeAt(I)],e=d[A.charCodeAt(I+1)],n=d[A.charCodeAt(I+2)],Q=d[A.charCodeAt(I+3)];g[i]=B<<2|e>>4,i+=1,g[i]=(15&e)<<4|n>>2,i+=1,g[i]=(3&n)<<6|63&Q,i+=1}return g}const y=16384,h=new B,s=new Map;function C(A,B){return I(this,void 0,void 0,(function*(){let g=null,i=null,e=!1;if("undefined"==typeof WebAssembly)throw new Error("WebAssembly is not supported in this environment!");const n=()=>new DataView(g.exports.memory.buffer).getUint32(g.exports.STATE_SIZE,!0),c=h.dispatch((()=>I(this,void 0,void 0,(function*(){if(!s.has(A.name)){const I=r(A.data),B=WebAssembly.compile(I);s.set(A.name,B)}const I=yield s.get(A.name);g=yield WebAssembly.instantiate(I,{})})))),t=(A=null)=>{e=!0,g.exports.Hash_Init(A)},E=A=>{if(!e)throw new Error("update() called before init()");(A=>{let I=0;for(;I<A.length;){const B=A.subarray(I,I+y);I+=B.length,i.set(B),g.exports.Hash_Update(B.length)}})(a(A))},d=new Uint8Array(2*B),C=(A,I=null)=>{if(!e)throw new Error("digest() called before init()");return e=!1,g.exports.Hash_Final(I),"binary"===A?i.slice(0,B):o(d,i,B)},D=A=>"string"==typeof A?A.length<4096:A.byteLength<y;let F=D;switch(A.name){case"argon2":case"scrypt":F=()=>!0;break;case"blake2b":case"blake2s":F=(A,I)=>I<=512&&D(A);break;case"blake3":F=(A,I)=>0===I&&D(A);break;case"xxhash64":case"xxhash3":case"xxhash128":F=()=>!1}return yield(()=>I(this,void 0,void 0,(function*(){g||(yield c);const A=g.exports.Hash_GetBuffer(),I=g.exports.memory.buffer;i=new Uint8Array(I,A,y)})))(),{getMemory:()=>i,writeMemory:(A,I=0)=>{i.set(A,I)},getExports:()=>g.exports,setMemorySize:A=>{g.exports.Hash_SetMemorySize(A);const I=g.exports.Hash_GetBuffer(),B=g.exports.memory.buffer;i=new Uint8Array(B,I,A)},init:t,update:E,digest:C,save:()=>{if(!e)throw new Error("save() can only be called after init() and before digest()");const I=g.exports.Hash_GetState(),B=n(),i=g.exports.memory.buffer,c=new Uint8Array(i,I,B),t=new Uint8Array(4+B);return function(A,I){const B=I.length>>1;for(let g=0;g<B;g++){const B=g<<1;A[g]=Q(I.charCodeAt(B),I.charCodeAt(B+1))}}(t,A.hash),t.set(c,4),t},load:I=>{if(!(I instanceof Uint8Array))throw new Error("load() expects an Uint8Array generated by save()");const B=g.exports.Hash_GetState(),i=n(),c=4+i,t=g.exports.memory.buffer;if(I.length!==c)throw new Error(`Bad state length (expected ${c} bytes, got ${I.length})`);if(!function(A,I){if(A.length!==2*I.length)return!1;for(let B=0;B<I.length;B++){const g=B<<1;if(I[B]!==Q(A.charCodeAt(g),A.charCodeAt(g+1)))return!1}return!0}(A.hash,I.subarray(0,4)))throw new Error("This state was written by an incompatible hash implementation");const o=I.subarray(4);new Uint8Array(t,B,i).set(o),e=!0},calculate:(A,I=null,e=null)=>{if(!F(A,I))return t(I),E(A),C("hex",e);const n=a(A);return i.set(n),g.exports.Hash_Calculate(n.length,I,e),o(d,i,B)},hashLength:B}}))}var D={name:"sha1",data:"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",hash:"40d92e5d"};const F=new B;let f=null;A.createSHA1=function(){return C(D,20).then((A=>{A.init();const I={init:()=>(A.init(),I),update:B=>(A.update(B),I),digest:I=>A.digest(I),save:()=>A.save(),load:B=>(A.load(B),I),blockSize:64,digestSize:20};return I}))},A.sha1=function(A){if(null===f)return function(A,B,g){return I(this,void 0,void 0,(function*(){const I=yield A.lock(),i=yield C(B,g);return I(),i}))}(F,D,20).then((I=>(f=I,f.calculate(A))));try{const I=f.calculate(A);return Promise.resolve(I)}catch(A){return Promise.reject(A)}},Object.defineProperty(A,"__esModule",{value:!0})}));

  const prog2percent = prog => Math.min(100, 100 * prog).toFixed() + "%";

  const calculateSHA1 = async file => {
    const oldTitle = document.title;

    const sha1 = await hashwasm.createSHA1();
    sha1.init();

    for(let size=file.size, chunkSize = 8*1024*1024, offset=0; offset<size; offset+=chunkSize) {
      document.title = prog2percent(offset / size);
      const fileSlice = file.slice(offset, offset + chunkSize);
      const chunk = await readAs(fileSlice, "arraybuffer");
      sha1.update(new Uint8Array(chunk));
    }
    document.title = oldTitle;
    return sha1.digest().toUpperCase();
  };

  window.addEventListener("hash_file", async event => {
    window.dispatchEvent(new CustomEvent("hash_file_result", {detail: await calculateSHA1(event.detail)}));
  }, false);
};

///////////////////////
// utilities
///////////////////////

const calculateSHA1 = file => new Promise(resolve => {
  window.dispatchEvent(new CustomEvent("hash_file", {detail: file}));
  const process = event => {
    window.removeEventListener("hash_file_result", process, false);
    resolve(event.detail);
  };
  window.addEventListener("hash_file_result", process, false);
});

const sleep = ms => new Promise(resolve => window.setTimeout(resolve, ms));

const b64toBlob = async (base64, type) => {
  if(typeof type === "undefined")
    type = "application/octet-stream";

  const response = await fetch(`data:${type};base64,${base64}`);
  return response.blob();
};

const makeElement = (parent, tagName, text, attributes) => {
  if(typeof text === "undefined")
    text = null;
  if(typeof attributes === "undefined")
    attributes = null;

  const element = document.createElement(tagName);
  if(text !== null)
    element.innerHTML = text;

  if(attributes !== null) {
    for(const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }
  }

  if(parent !== null)
    parent.append(element);

  return element;
};

const makeLink = (parent, name, onClick) => {
  const a = makeElement(parent, "a", name, {"href": "#"});
  a.addEventListener("click", e => {
    e.preventDefault();
    onClick(e.target);
    return false;
  });

  return a;
};

const makeRadioCheckbox = (type, parent, name, value) => {
  const label = makeElement(parent, "label");
  const input = makeElement(label, "input", null, {"type": type, "value": value});
  label.append(" ");
  label.append(name);
  return input;
};

const makeRadioButtons = (parent, id, values) => {
  let makeChecked = true;
  for(const [name, value] of values) {
    const radio = makeRadioCheckbox("radio", parent, name, value);
    radio.setAttribute("name", id);
    if(makeChecked) {
      radio.setAttribute("checked", "checked");
      makeChecked = false;
    }
  }
};

const makePopup = () => {
  const container = makeElement(
    document.body, "div", null, {"class": `${HELPER_ID} max`}
  );
  const main = makeElement(container, "div", null, {"class": "main"});
  return [container, main];
};

const makeTextareas = (parent, info) => {
  const textareas = [];
  for(const [label, rows] of info) {
    makeElement(parent, "p", label);

    const t = makeElement(parent, "textarea", null, {"rows": rows});
    textareas.push(t);
  }

  return textareas;
};

const makeTextareaPopup = (text, defaultValue) => new Promise(resolve => {
  const [popup, main] = makePopup();
  const resultElement = makeTextareas(main, [[text, 4]])[0];
  if(typeof defaultValue !== "undefined")
    resultElement.value = defaultValue;
  const p = makeElement(main, "p");
  const button = makeElement(p, "button", "Continue");
  button.addEventListener("click", e => {
    e.preventDefault();
    popup.remove();
    resolve(resultElement.value);
  });
});

const makeFilePopup = text => new Promise(resolve => {
  const [popup, main] = makePopup();
  makeElement(main, "p", text);
  const fileInput = makeElement(main, "input", null, {"type": "file"});

  fileInput.addEventListener("change", e => {
    e.preventDefault();
    popup.remove();
    resolve(e.target.files[0]);
  });
});

const decryptLicense_ = async ciphertext => {
  const key = await crypto.subtle.importKey(
    "raw",
    new Uint8Array([65, 50, 114, 45, 208, 130, 239, 176, 220, 100, 87, 197, 118, 104, 202, 9]),
    {name: "AES-CBC"}, false, ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    {name: "AES-CBC", iv: new ArrayBuffer(16)}, key, ciphertext
  );
  const dec = new TextDecoder();

  return dec.decode(decrypted);
};

const decryptLicense = async ciphertext => {
  if(ciphertext instanceof Blob)
    ciphertext = await ciphertext.arrayBuffer();
  else if(!(ciphertext instanceof ArrayBuffer))
    throw new Error("Unsupported ciphertext type!");

  try {
    return await decryptLicense_(ciphertext);
  }
  catch(error) {
    return await decryptLicense_(ciphertext.slice(0x41));
  }
};

// read file (blob) as text or array buffer asynchronously
const readAs = (file, type) => new Promise(resolve => {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    resolve(reader.result);
  }, false);

  if(type == "text")
    reader.readAsText(file);
  else
    reader.readAsArrayBuffer(file);
});

const getDom = text => (new DOMParser()).parseFromString(text, "application/xml");

const getEncryptionKey = dom => {
  let key = dom.querySelector("CipherKey").innerHTML;
  // trim to 22 characters - that's how much you need for a 16 byte key
  key = key.substr(0, 22);
  // trim the padding
  key = key.replace(/=+$/, "");
  // invalid base64, remove one character
  if(key.length % 4 === 1) {
    key = key.slice(0, -1);
  }
  // add padding if necessary
  while(key.length % 4 !== 0) {
    key += "=";
  }

  // 16 bytes or smaller
  const keyBytes = base64js.toByteArray(key);
  // with this we make sure it's 16 bytes long
  const finalKeyBytes = new Uint8Array(new ArrayBuffer(16));
  finalKeyBytes.fill(0);
  finalKeyBytes.set(keyBytes);

  return base64js.fromByteArray(finalKeyBytes);
};

const getHeaders = rawHeaders => {
  const headers = Array.from(rawHeaders.matchAll(/^(.*?): (.*?)$/gm));
  for(const x of headers) {
    x.shift(); // remove the whole match
  }
  return new Headers(headers);
};

const [getAuthToken, getUsername, getUserID, getPersonaID] = (() => {
  let authToken = null;
  let username = null;
  let userID = null;
  let personaID = null;
  let timestamp = 0;

  const updateCache = async () => {
    if(Date.now() - timestamp < 300000) // 5 minutes
      return;

    const message = (
      'Run EA app, log in, and then run <a href="https://github.com/anadius/'
      + 'ea-get-token/releases/latest/download/get_token.exe">this program</a>. '
      + "Copy the 4 lines of output (access token, username, user ID, persona ID)"
      + ', paste them below and click "Continue".<br><br>'
      + "Source code for that program can be found "
      + '<a href="https://github.com/anadius/ea-get-token">here</a>.'
    );
    const defaultValue = (
      authToken === null
      ? ""
      : `${authToken}\n${username}\n${userID}\n${personaID}`
    );
    const result = (await makeTextareaPopup(message, defaultValue)).trim();
    // username characters: https://answers.ea.com/t5/Origin-Client-Web-Technical/Changing-Origin-ID-Prohibited-word-or-character/m-p/3328603/highlight/true#M51146
    const values = result.match(/^([a-z0-9=\/\+]+)\n([a-z0-9\-_]+)\n(\d+)\n(\d+)$/i);
    if(values === null)
      throw new Error("Invalid user input!");

    values.shift();
    [authToken, username, userID, personaID] = values;
    timestamp = Date.now();
  };

  const at = async () => {
    await updateCache();
    return authToken;
  };
  const un = async () => {
    await updateCache();
    return username;
  };
  const uid = async () => {
    await updateCache();
    return userID;
  };
  const pid = async () => {
    await updateCache();
    return personaID;
  };

  return [at, un, uid, pid];
})();

const getAllGames = async () => {
  const url = (
    "https://api3.origin.com/supercat/"
    + "US/en_US/supercat-PCWIN_MAC-US-en_US.json.gz"
  );

  const response = await xhr("GET", url, null, /*corsProxyAllowed=*/ true);
  const offers = (await response.json())["offers"];

  if(typeof offers === "undefined")
    throw new Error("No offers found!");

  return offers;
}

const getMyGames = async () => {
  const url = (
    "https://api2.origin.com/ecommerce2/consolidatedentitlements/"
    + `${await getUserID()}?machine_hash=1`
  );
  const headers = {
    "Accept": "application/vnd.origin.v3+json; x-cache/force-write",
    "AuthToken": await getAuthToken()
  };

  const response = await xhr("GET", url, headers, /*corsProxyAllowed=*/ false);
  const entitlements = (await response.json())["entitlements"];

  if(typeof entitlements === "undefined")
    throw new Error("No entitlements found!");

  return entitlements;
};

const getDownloadLinks = async (gameId, platform) => {
  if(typeof platform === "undefined")
    platform = "PCWIN";
  
  const url = (
    "https://api1.origin.com/ecommerce2/downloadURL?productId="
    + `${gameId}&userId=${await getUserID()}&https=true`
  );
  const headers = {
    "X-Origin-Platform": platform,
    "Accept": "application/vnd.origin.v3+json; x-cache/force-write",
    "AuthToken": await getAuthToken()
  }
  
  const result = await xhr("GET", url, headers, /*corsProxyAllowed=*/ false);
  return await result.json();
};

class LicenseError extends Error {
  constructor(message) {
    super(message);
    this.name = "LicenseError";
  }
}

const getLicense = async (contentId, machineHash, ticket, engine) => {
  let url = (
    "https://proxy.novafusion.ea.com/licenses"
    + `?contentId=${contentId}&machineHash=${machineHash}`
    + `&ea_eadmtoken=${await getAuthToken()}`
  );
  if(typeof ticket !== "undefined" && typeof engine !== "undefined")
    url = `${url}&requestToken=${ticket}&requestType=${engine}`;

  const headers = {
    "User-Agent": "EACTransaction",
    "X-Requester-Id": "Origin Online Activation"
  }

  const response = await xhr("GET", url, headers, /*corsProxyAllowed=*/ false);
  const rawLicense = await response.blob();
  const signature = response.headers.get("x-signature");

  let license;
  if(rawLicense.type.startsWith("application/octet-stream")) {
    license = await decryptLicense(rawLicense);
  }
  else if(rawLicense.type.startsWith("application/xml")) {
    const text = await rawLicense.text();
    const dom = await getDom(text);

    let errorCode = null;
    try {
      errorCode = dom.querySelector("error").getAttribute("code");
    }
    catch(ignore) {}

    if(errorCode === "CG_LIMIT_EXCEEDED")
      throw new LicenseError("Activation limit reached for today, try again later!");
    else if(errorCode === "VALIDATION_FAILED") {
      let cause = null;
      try {
        cause = dom.querySelector("failure").getAttribute("cause");
      }
      catch(ignore) {}

      if(cause === "NOT_ENTITLED")
        throw new LicenseError("You don't own this game!");
      else if(cause === "AUTHENTICATION_FAILED")
        throw new LicenseError("Bad auth token, refresh the page and try again!");
    }

    throw new Error(text);
  }
  else {
    throw new Error(`Unknown type - ${rawLicense.type}`);
  }

  return [license, rawLicense, signature];
};

const sameName = (name1, name2) => (
  name1.localeCompare(name2) === 0 ||
  name1.replace(": ", " - ").localeCompare(name2) === 0 ||
  name1.replace("™", "").localeCompare(name2) === 0 ||
  name1.replace(": ", " - ").replace("™", "").localeCompare(name2) === 0
);

const getGameInfos = async (contentIds, name) => {
  const allGames = await getAllGames();
  const categories = ["BASEGAME", "DLC", "EXPANSION"];
  const result = [];
  for(const game of allGames) {
    try {
      if((contentIds.includes(game.masterTitleId) || contentIds.includes(game.contentId)) && categories.includes(game.gameTypeFacetKey)) {
        let achievementsId = null;
        try {
          achievementsId = game.platforms[0].achievementSetOverride;
        }
        catch(ignore) {}

        result.push({
          "name": game.i18n.displayName,
          "offerId": game.offerId,
          "achievementsId": achievementsId,
        });
      }
    }
    catch(ignore) {}
  }
  if(result.length > 0)
    return result;

  const lowercaseName = name.toLowerCase();
  for(const game of allGames) {
    try {
      let gameName = game.i18n.displayName.toLowerCase();
      if(sameName(gameName, lowercaseName)) {
        return [{
          "name": game.i18n.displayName,
          "offerId": game.offerId,
          "achievementsId": game.platforms[0].achievementSetOverride,
        }];
      }
    }
    catch(ignore) {}
  }

  throw new Error("Game info not found!");
};

const getAchievements = async setId => {
  const url = (
    "https://achievements.gameservices.ea.com/achievements/personas/"
    + `${await getPersonaID()}/${setId}/all?lang=en_US&metadata=true&fullset=true`
  );
  const headers = {
    "X-Api-Version": "2",
    "X-Application-Key": "Origin",
    "X-AuthToken": await getAuthToken(),
  };

  const response = await xhr("GET", url, headers, /*corsProxyAllowed=*/ false);
  const dataText = await response.text();
  try {
    data = JSON.parse(dataText);
  }
  catch(error) {
    console.error(error);
    console.log(dataText);
    throw Error("Can't load achievements. Are you sure this game has achievements?");
  }
  const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: "base"});

  const achievementIDs = Object.keys(data.achievements).sort(collator.compare);
  const achievementTotals = new Map();
  const achievementNames = new Map();

  for(const index of achievementIDs) {
    if(index.includes(ACHIEVEMENT_IDS_SEPARATOR)) {
      throw new Error(
        `Achievement index contains ${ACHIEVEMENT_IDS_SEPARATOR}. `
        + "Origin emu uses it as a separator for achievement IDs. Report that."
      );
    }

    const achievement = data.achievements[index];
    achievementNames.set(index, achievement.name);

    if(achievement.t > 1)
      achievementTotals.set(index, achievement.t);
  }

  return {
    "ids": achievementIDs,
    "totals": achievementTotals,
    "names": achievementNames,
  };
};

const xhr = async (method, url, headers, corsProxyAllowed) => new Promise(async (resolve, reject) => {
  if(typeof headers === "undefined" || headers === null)
    headers = {};

  if(HTML_FILE) {
    if(corsProxyAllowed) {
      try {
        const corsUrl = "https://corsproxy.io/?" + encodeURIComponent(url); 
        const response = await fetch(corsUrl, {"method": method, "headers": headers});
        if(response.status === 200) {
          resolve(response);
          return;
        }
      }
      catch(ignore) {}
    }

    if(method.toUpperCase() !== "GET")
      reject(new Error("Not implemented!"));

    const commandParts = [];
    for(const [key, value] of Object.entries(headers)) {
      commandParts.push("-H");
      commandParts.push(`"${key}: ${value}"`);
    }
    commandParts.push(`"${url}"`);
    const command = TEMPLATE_BAT.replace("{CURL_COMMAND}", commandParts.join(" "));

    downloadBlob(new Blob([command], {"type": "application/x-bat"}), TMP_BAT_FILE);

    let file;
    try {
      file = await makeFilePopup(
        `${USE_USERSCRIPT}Download and run <code>${TMP_BAT_FILE}</code> file. `
        + `It will create a <code>${TMP_FILE}</code>. Select it below:`
      );
    }
    catch(error) {
      reject(error);
      return;
    }

    const rawText = await file.text();
    const rawHeaders = (rawText).split("\r\n\r\n", 1)[0];
    const match = rawHeaders.match(/^HTTP\/[\d\.]+ (\d+) (.*?)\r\n(.*?)$/s);
    if(match === null) {
      console.log(rawText);
      reject(new Error("Invalid HTTP response"));
      return;
    }

    resolve(new Response(
      file.slice(rawHeaders.length + 4),
      {
        "status": parseInt(match[1]),
        "statusText": match[2],
        "headers": getHeaders(match[3]),
      },
    ));
  }
  else {
    GM.xmlHttpRequest({
      "method": method,
      "url": url,
      "headers": headers,
      "responseType": "blob",
      "onload": res => {
        const response = new Response(
          res.response,
          {
            "status": res.status,
            "statusText": res.statusText,
            "headers": getHeaders(res.responseHeaders),
          },
        );
        resolve(response);
      },
      "onerror": res => {
        reject(new Error(`Failed to load ${url}`));
      },
    });
  }
});

const downloadBlob = (blob, name) => {
  const link = document.createElement("a");
  const url = window.URL.createObjectURL(blob);
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
};

const loadBlacklisted = () => {
  try {
    return JSON.parse(localStorage.getItem(BLACKLISTED_ID) || "[]");
  }
  catch(error) {
    return [];
  }
};

const blacklist = id => {
  if(BLACKLISTED.indexOf(id) === -1) {
    BLACKLISTED.push(id);
    localStorage.setItem(BLACKLISTED_ID, JSON.stringify(BLACKLISTED));
    const element = document.querySelector(`[data-offerid="${id}"]`);
    if(element !== null)
      element.remove();
  }
};

class EmptyLine {};
class Comment {};
class CommentedOut {};

var mapToVDF = (object, align=8, tab=4, level=0) => {
  if(typeof object !== "object") {
    throw new TypeError("A key has value of type other than string or object");
  }
  let result = "";
  const indent = "\t".repeat(level);
  for(let [key, value] of object.entries()) {
    if(key instanceof EmptyLine) {
      result += "\n";
    }
    else if(key instanceof Comment) {
      result += `${indent}// ${value}\n`;
    }
    else if(typeof value === "object" && value !== null && !(key instanceof CommentedOut)) {
      const section = mapToVDF(value, align, tab, level + 1);
      if(section.length > 0)
        result += `${indent}"${key}"\n${indent}{\n${section}${indent}}\n`;
    }
    else {
      let commentStart = "";
      if(key instanceof CommentedOut) {
        [key, value] = value;
        commentStart = "//";
      }
      let spacingRepeat = align - indent.length;
      spacingRepeat -= Math.floor((key.length + 2) / tab);
      if(spacingRepeat < 1)
        spacingRepeat = 1;
      const spacing = "\t".repeat(spacingRepeat);
      result += `${indent}${commentStart}"${key}"${spacing}"${value.toString()}"\n`;
    }
  }
  result = result.replace(/^\n+/, "");
  result = result.replace(/\n{2,}$/, "\n");
  result = result.replace(/\n{3,}/g, "\n\n");
  return result;
};

const handleError = (error, functionOrElement) => {
  console.error(error);
  const err = `${error.name}: ${error.message}`;
  if(typeof functionOrElement === "function")
    functionOrElement(err, error);
  else {
    const el = functionOrElement || document.querySelector(`.${HELPER_ID} > .main`);
    el.prepend(makeElement(
      null, "p",
      "An error occured, report that to anadius.",
      {"class": "error"}
    ));
  }
  alert(err);
  throw error;
};

///////////////////////
// main initialization
///////////////////////

const commonSetup = async () => {
  const sc = document.createElement("script");
  const lines = injection.toString().split("\n");
  lines.pop();
  lines.shift();
  lines.push("const readAs = " + readAs.toString() + ";");
  lines.unshift("(() => {");
  lines.push("})();");
  sc.innerHTML = lines.join("\n");
  document.head.appendChild(sc);
  document.head.removeChild(sc);

  const style = makeElement(document.head, "style", COMMON_CSS);
  await customSetup();
};

const createMainMenu = () => {
  const [container, main] = makePopup();

  const menu = makeElement(null, "div", null, {"class": "menu"});
  main.before(menu);
  if(!HTML_FILE) {
    const a = makeLink(menu, "Close", () => {
      container.remove();
      document.body.classList.remove("overflow-hidden");
    });
    a.classList.add("close-button");
  }

  for(const [name, onClick] of MENU_ITEMS) {
    const a = makeLink(menu, name, target => {
      const active = menu.querySelector(".active");
      if(active !== null) {
        active.classList.remove("active");
      }
      target.classList.add("active");
      main.replaceChildren();
      onClick(main);
    });
  }

  document.body.classList.add("overflow-hidden");
};

///////////////////////
// main functions
///////////////////////

// Generate a Denuvo token for people who want to play the game.
const generateDenuvoToken = parent => {
  makeElement(parent, "h4", (
    "Generate a Denuvo token for people who want to play the game. "
    + "You need to own the game to generate tokens for it!"
  ));

  makeElement(parent, "p", (
    "More information "
    + '<a href="https://anadius.hermietkreeft.site/origin-emulator">here</a> and '
    + '<a href="https://cs.rin.ru/forum/viewtopic.php?f=29&t=115335">here</a>.'
  ));

  const textareas = makeTextareas(
    parent,
    [["Denuvo ticket:", 5], ["Denuvo token or error message:", 5]]
  );

  const p = makeElement(null, "p");
  const button = makeElement(p, "button", "Get token");
  textareas[0].after(p);

  button.addEventListener("click", e => {
    e.preventDefault();
    generateDenuvoTokenAction(textareas);
  });
};
const generateDenuvoTokenAction = async textareas => {
  const [ticketElement, tokenElement] = textareas;
  tokenElement.value = "Loading...";

  const ticketLines = ticketElement.value.split("\n");
  let ticket = null, engine, id;
  for(const line of ticketLines) {
    const parts = line.trim().split("|");
    if(parts.length !== 3)
      continue;

    [ticket, engine, id] = parts;
    break;
  }

  if(ticket === null) {
    tokenElement.value = "Bad ticket!";
    return;
  }

  try {
    const [license, rawLicense, signature] = await getLicense(id, 1, ticket, engine);
    const token = (await getDom(license)).querySelector("GameToken");
    tokenElement.value = (
      token === null
      ? `no Denuvo token in the license\n\n${license}`
      : token.innerHTML
    );
  }
  catch(error) {
    if(error instanceof LicenseError) {
      tokenElement.value = error.message;
      alert(error.message);
    }
    else
      handleError(error);
  }
};

///////////////////////

// Get information from license file - license text, encryption key and Denuvo token.
const getInfoFromLicense = parent => {
  makeElement(parent, "h4", (
    "Get information from license file - license"
    + " text, encryption key and Denuvo token."
  ));

  makeElement(parent, "p", (
    "Select the license file from <code>%ProgramData%\\"
    + "Electronic Arts\\EA Services\\License</code>."
  ));

  makeElement(parent, "p", (
    "If you don't know which file to select - open "
    + "<code>__Installer\\installerdata.xml</code> from "
    + "your game and look for <code>contentIDs</code> section. The "
    + "file you're looking for will have one of these IDs in name."
  ));

  const fileInput = makeElement(parent, "input", null, {"type": "file"});

  const textareas = makeTextareas(
    parent,
    [["Encryption key:", 1], ["Denuvo token:", 5], ["License text:", 10]]
  );

  fileInput.addEventListener("change", e => {
    getInfoFromLicenseAction(e.target.files[0], textareas);
  });
};
const getInfoFromLicenseAction = async (file, textareas) => {
  const [key, denuvo, license] = textareas;
  key.value = "";
  denuvo.value = "";
  license.value = "";

  let text;
  try {
    text = await decryptLicense(file);
  }
  catch(error) {
    handleError(error);
  }
  license.value = text;

  const dom = getDom(text);
  const token = dom.querySelector("GameToken");
  denuvo.value = (token === null ? "no Denuvo token in the license" : token.innerHTML);

  key.value = getEncryptionKey(dom);
}

///////////////////////

// Generate a configuration file for my Origin Emulator.
const generateEmulatorConfig = parent => {
  makeElement(parent, "h4", (
    "Generate a configuration file for my Origin Emulator. You can toggle the "
    + "features, for some games it's pointless to leave them in the config."
  ));

  makeElement(parent, "p", (
    "Select the <code>__Installer\\installerdata.xml</code>"
    + " file from your game folder."
  ));

  const data = {};
  data.fileInput = makeElement(parent, "input", null, {"type": "file"});

  const p = makeElement(parent, "p");
  data.hasDenuvo = makeRadioCheckbox("checkbox", p, "Denuvo game");
  data.useDefaultPort = makeRadioCheckbox("checkbox", p, "Use default port");
  data.noPretendOnline = makeRadioCheckbox("checkbox", p, "Don't pretend to be online");
  data.noFakeAuth = makeRadioCheckbox("checkbox", p, "Don't send fake auth");
  data.hasUsername = makeRadioCheckbox("checkbox", p, "Has username visible");
  data.hasUserAvatar = makeRadioCheckbox("checkbox", p, "Has avatar visible");
  data.addContentSection = makeRadioCheckbox("checkbox", p, "Add Content section");
  data.addEntitlement = makeRadioCheckbox("checkbox", p, "Add placeholder Entitlement");
  data.addAchievements = makeRadioCheckbox("checkbox", p, "Add achievements");

  const button = makeElement(parent, "button", "Generate config");

  button.addEventListener("click", e => {
    e.preventDefault();
    generateEmulatorConfigAction(data);
  });
};
const generateEmulatorConfigAction = async d => {
  const file = d.fileInput.files[0];
  if(typeof file === "undefined") {
    alert("No file selected!");
    return;
  }

  let dom, name, version, contentIds, languages, regKey = null, gameInfos = null;
  try {
    dom = getDom(await file.text());
    if(dom.querySelector("parsererror"))
      dom = getDom(await readAs(file, "text"));
  }
  catch(error) {
    handleError(error);
  }
  try {
    contentIds = Array.prototype.map.call(
      dom.querySelectorAll("contentID"),
      (x) => x.innerHTML
    );
  }
  catch(error) {
    contentIds = ["0"];
  }

  try {
    name = dom.querySelector('gameTitle[locale="en_US"]').innerHTML;
    version = dom.querySelector("gameVersion").getAttribute("version");
    const tmp = dom.querySelector("locales").innerHTML.split(",");
    tmp.sort();
    languages = tmp.join(",");
  }
  catch(error) {
    try {
      name = dom.querySelector('localeInfo[locale="en_US"] > title').innerHTML;
      version = dom.querySelector("game").getAttribute("gameVersion");
      const tmp = [];
      for(const locale of dom.querySelectorAll("localeInfo")) {
        tmp.push(locale.getAttribute("locale"));
      }
      tmp.sort();
      languages = tmp.join(",");
    }
    catch(error) {
      handleError(error);
    }
  }

  try {
    regKey = dom.children[0].outerHTML.match(/\[HKEY[^\\]+\\(.+?\\)Install Dir\]/)[1];
    regKey += "Locale";
  }
  catch(error) {
    console.log(error);
  }

  const config = new Map();
  const mainSection = new Map();
  const gameSection = new Map();
  const emulatorSection = new Map();
  const userSection = new Map();
  const contentSection = new Map();
  const entitlementsSection = new Map();
  const achievementsSection = new Map();

  config.set("Config2", mainSection);
  mainSection.set(new EmptyLine());
  mainSection.set("Game", gameSection);
  mainSection.set(new EmptyLine());
  mainSection.set("Emulator", emulatorSection);
  mainSection.set(new EmptyLine());
  mainSection.set("User", userSection);
  mainSection.set(new EmptyLine());
  mainSection.set("Content", contentSection);
  mainSection.set(new EmptyLine());
  mainSection.set("Entitlements", entitlementsSection);
  mainSection.set(new EmptyLine());
  mainSection.set("Achievements", achievementsSection);

  gameSection.set("Name", name);
  gameSection.set("Version", version);
  gameSection.set(new EmptyLine());
  gameSection.set("ContentId", contentIds[0]);

  gameSection.set(new EmptyLine());

  if(d.hasDenuvo.checked) {
    gameSection.set("DenuvoToken", "PASTE_A_VALID_DENUVO_TOKEN_HERE");

    const [popup, main] = makePopup();
    makeElement(main, "p", "Hashing file:");
    const name = makeElement(main, "p");

    const exeFile = await makeFilePopup("Select the fixed exe/not a crack.");
    name.innerHTML = exeFile.name;
    gameSection.set("DenuvoExeHash", await calculateSHA1(exeFile));
    const dllFile = await makeFilePopup("Select <code>dbdata.dll</code> or some other DLL file <b>from the same folder as the game exe</b>. It's best if you select a file that changes in every game update.");
    name.innerHTML = dllFile.name;
    gameSection.set("DenuvoDllHash", await calculateSHA1(dllFile));
    if(dllFile.name !== "dbdata.dll")
      gameSection.set("DenuvoDllName", dllFile.name);

    popup.remove();
  }

  gameSection.set(new EmptyLine());

  gameSection.set("Languages", languages);
  gameSection.set("Language", "en_US");
  if(regKey !== null)
    gameSection.set("LanguageRegistryKey", regKey);

  if(d.useDefaultPort.checked)
    emulatorSection.set("ServerPort", "default");

  emulatorSection.set(new EmptyLine());

  if(d.noPretendOnline.checked)
    emulatorSection.set("PretendConnected", "false");
  if(d.noFakeAuth.checked)
    emulatorSection.set("FakeAuth", "false");

  if(d.hasUsername.checked) {
    userSection.set("Username", "anadius");
    userSection.set("PersonaId", "1144668899");
    userSection.set("UserId", "1000200030000");
  }

  userSection.set(new EmptyLine());

  if(d.hasUserAvatar.checked) {
    userSection.set(new Comment(), "uncomment to override the avatar");
    userSection.set(new CommentedOut(), ["Avatar", "..\avatar.png"]);
  }

  if(d.addContentSection.checked) {
    if(gameInfos === null)
    {
      try {
        gameInfos = await getGameInfos(contentIds, name);
      }
      catch(error) {
        handleError(error);
      }
    }

    for(const info of gameInfos) {
      const cnt = new Map();
      contentSection.set(info.offerId, cnt);
      cnt.set("Name", info.name);
      cnt.set("Version", version);
      cnt.set("State", "INSTALLED");
    }
  }

  if(d.addEntitlement.checked) {
    const ent = new Map();
    entitlementsSection.set("PUT_ORIGIN_DLC_ID_HERE", ent);
    ent.set("Group", "GAME_GROUP_NAME");
    ent.set("Version", "0");
    ent.set("Type", "DEFAULT");
    ent.set("EntitlementTag", "THIS_IS_WHAT_MAKES_THE_DLCS_WORK");
  }

  if(d.addAchievements.checked) {
    let achievementsId = null;
    let achievementsInfo = null;
    try {
      if(gameInfos === null)
        gameInfos = await getGameInfos(contentIds, name);
      for(const info of gameInfos) {
        if(info.achievementsId !== null) {
          achievementsId = info.achievementsId;
          break;
        }
      }

      if(achievementsId !== null)
        achievementsInfo = await getAchievements(achievementsId);
    }
    catch(error) {
      handleError(error);
    }
    if(achievementsInfo !== null) {
      achievementsSection.set("AchievementsSet", achievementsId);
      achievementsSection.set("AchievementNames", achievementsInfo.names);
      achievementsSection.set("AchievementTotals", achievementsInfo.totals);
    }
  }

  downloadBlob(
    new Blob(
      [mapToVDF(config).replace(/\r\n|\n/g, "\r\n")],
      {"type": "octet/stream"}
    ),
    "anadius.cfg",
  );
};

///////////////////////

// Generate a configuration file for my Origin Emulator.
const getUserValuesForEmu = async parent => {
  makeElement(parent, "h4", (
    "Get legit values that you can put in my Origin Emulator config file. "
    + "Useful when you want to play your legit save and the game uses your IDs "
    + "to encrypt it. Or, as in The Sims 4 case, when the game adds your IDs "
    + "to the items you create."
  ));

  const textareas = makeTextareas(
    parent,
    [["Open <code>anadius.cfg</code> file and replace the values with:", 3]],
  );

  textareas[0].value = (
    `\t\t"Username"\t\t\t\t"${await getUsername()}"\n`
    + `\t\t"PersonaId"\t\t\t\t"${await getPersonaID()}"\n`
    + `\t\t"UserId"\t\t\t\t"${await getUserID()}"`
  );
};

///////////////////////

// Get download links for games and DLCs you own
const getGameDownloadLink = async parent => {
  makeElement(parent, "h4", "Get download links for games and DLCs you own.");

  let entitlements = null;
  const loading = makeElement(parent, "p", "Loading...");
  try {
    entitlements = await getMyGames();
  }
  catch(error) {
    handleError(error);
  }
  loading.remove();

  for(let ent of entitlements) {
    delete ent.cdKey;
    delete ent.entitlementId;
    delete ent.grantDate;
    delete ent.updatedDate;
    delete ent.terminationDate;
  }
  makeLink(
    parent,
    'download "entitlements.json" file',
    () => {
      downloadBlob(
        new Blob(
          [JSON.stringify(entitlements, null, '\t')],
          {type: "octet/stream"}
        ),
        "entitlements.json"
      );
    }
  );

  const radio = makeElement(parent, "p");
  makeRadioButtons(radio, HELPER_ID, [["Windows", "PCWIN"], ["Mac", "MAC"]]);

  const table = makeElement(
    parent, "table", "<tr><th>ID</th><th>url</th><th></th></tr>"
  );
  for(const x of entitlements) {
    if(x.status == "DISABLED" || BLACKLISTED.indexOf(x.offerId) > -1)
      continue;

    const tr = makeElement(table, "tr", null, {"data-offerid": x.offerId});
    makeElement(tr, "td", x.offerId);
    makeElement(tr, "td", x.offerPath || x.entitlementTag);
    const download = makeElement(tr, "td");
    makeLink(download, "get link", getGameDownloadLinkAction);
  }
};
const getGameDownloadLinkAction = async target => {
  const id = target.parentElement.parentElement.getAttribute("data-offerid");
  const platform = document.querySelector('input[name="origin-helper-tools"]:checked').value;
  
  let result;
  try {
    result = await getDownloadLinks(id, platform);
  }
  catch(error) {
    handleError(error);
  }

  if(typeof result.error !== "undefined") {
    console.log(result);
    if(result.error.code === "11000") {
      alert("This entitlement is not downloadable, added to ignored list.");
      blacklist(id);
    }
    else {
      alert("Some error occured, could be that this entitlement isn't downloadable.");
    }
  }
  else {
    console.log(JSON.stringify(result));
    prompt("Download URL:", result.url);
  }
};

///////////////////////

// Get a license file for a specific game and hardware hash.
const getLicenseFile = parent => {
  makeElement(parent, "h4", (
    "Get a license file for a specific game and hardware hash. "
    + "This is for people who want to help me with "
    + '<a href="https://anadius.hermietkreeft.site/origin-unwrapper">'
    + "Origin Unwrapper</a>."
  ));

  makeElement(parent, "p", "gameName#contentID#machineHash:");
  const textInput = makeElement(parent, "input", null, {"type": "text"});
  const button = makeElement(parent, "button", "Get license");
  const statusElement = makeElement(parent, "p");

  button.addEventListener("click", e => {
    e.preventDefault();
    getLicenseFileAction(textInput.value.trim(), statusElement);
  });
};
const getLicenseFileAction = async (text, statusElement) => {
  statusElement.innerHTML = "Loading...";
  const parts = text.split("#");
  if(parts.length !== 3) {
    statusElement.innerHTML = "Bad input!";
    return;
  }
  const [gameName, contentId, machineHash] = parts;

  try {
    const [license, rawLicense, signature] = await getLicense(contentId, machineHash);
    const signatureBlob = await b64toBlob(signature);

    const licenseBlob = new Blob([
      signatureBlob,
      new Uint8Array(65 - signatureBlob.size),
      rawLicense,
    ]);
    downloadBlob(licenseBlob, `${contentId} ${gameName}.dlf`);
    statusElement.innerHTML = "Downloaded!";
  }
  catch(error) {
    handleError(error);
  }
};

///////////////////////
// constants
///////////////////////

const HELPER_ID = "origin-helper-tools";
const BLACKLISTED_ID = "Origin_helper_blacklist";
const BLACKLISTED = loadBlacklisted();
const ACHIEVEMENT_IDS_SEPARATOR = ";";
const USE_USERSCRIPT = (
  `<div class="info">If you don't want to see this popup - use my `
  + '<a href="https://anadius.hermietkreeft.site/origin-helper" target="_blank">'
  + "UserScript</a> instead.</div><br>"
);

const MENU_ITEMS = [
  ["Generate Denuvo token", generateDenuvoToken],
  ["Get info from license", getInfoFromLicense],
  ["Generate emulator config", generateEmulatorConfig],
  ["Get user values for emu", getUserValuesForEmu],
  ["Get game download link", getGameDownloadLink],
  ["Get license file", getLicenseFile],
];

const COMMON_CSS = `
:root {
  --background-color: #212a2e;
  --background-hover-color: #1a2225;
  --border-color: #000000;
  --text-color: #F7F8F8;
  --link-color: #828fff;
  --code-color: #d63384;
  --menu-width: 250px;
}

body.overflow-hidden {
  overflow: hidden;
}

.${HELPER_ID} {
  display: flex;
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  z-index: 99999999999;
  background: var(--background-color);
  color: var(--text-color);
  font-family: Open Sans,sans-serif;
  text-rendering: optimizeLegibility;
  box-sizing: border-box;
}

.${HELPER_ID} > div {
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
}

.${HELPER_ID} > .menu {
  flex: 0 var(--menu-width);
  border-right: 1px solid var(--border-color);
}

.${HELPER_ID} > .menu a, .${HELPER_ID} > a {
  display: block;
  padding: 20px;
}

.${HELPER_ID} > .menu a.close-button {
  border-bottom: 1px solid var(--border-color)
}

.${HELPER_ID} > .menu a:hover {
  background: var(--background-color);
  text-decoration: none;
  filter: brightness(80%);
}

.${HELPER_ID} > .menu a.active {
  background: var(--background-color);
  filter: brightness(60%);
}

.${HELPER_ID} > .main {
  padding: 20px;
}

.${HELPER_ID} > .main > :first-child {
  padding-top: 0;
  margin-top: 0;
}

.${HELPER_ID} textarea, .${HELPER_ID} input, .${HELPER_ID} button {
  display: block;
  width: 100%;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  filter: brightness(80%);
  color: var(--text-color);
  padding: 5px;
  margin: 15px 0;
  box-sizing: border-box;
}

.${HELPER_ID} input[type="radio"], .${HELPER_ID} input[type="checkbox"] {
  width: auto;
  display: inline-block;
  margin: 0;
}

.${HELPER_ID} label {
  display: block;
}

.${HELPER_ID} button {
  cursor: pointer;
}

.${HELPER_ID} button:active {
  filter: brightness(60%);
}

.${HELPER_ID} a {
  color: var(--link-color);
  text-decoration: none;
}

.${HELPER_ID} a:hover {
  text-decoration: underline;
  filter: brightness(80%);
}

.${HELPER_ID} code {
  color: var(--code-color);
}

.${HELPER_ID} table {
  border-collapse: collapse;
}

.${HELPER_ID} th {
  text-align: left;
}

.${HELPER_ID} tr {
  background: var(--background-color);
  border: 1px solid var(--border-color);
}

.${HELPER_ID} tr:hover {
  background: var(--background-hover-color);
}

.${HELPER_ID} tr :nth-child(1), .${HELPER_ID} tr :nth-child(3) {
  white-space: nowrap;
}

.${HELPER_ID} tr :nth-child(2) {
  width: 100%;
  padding: 0 10px;
}

.${HELPER_ID}.max {
  width: 100%;
  height: 100%;
}

.${HELPER_ID} .error {
  color: red;
}

.${HELPER_ID} .info {
  color: #7aff4a;
}
`;

const TMP_BAT_FILE = "request.bat";
const TMP_FILE = "response.bin";
const TEMPLATE_BAT = `@echo off
del ${TMP_FILE} 2> nul
if %ERRORLEVEL% NEQ 0 (
  echo Can't delete ${TMP_FILE}, do it yourself and run this script again.
  pause
  goto:eof
)

curl -i -o ${TMP_FILE} {CURL_COMMAND}
if %ERRORLEVEL% NEQ 0 (
  echo cURL command failed.
  pause
  goto:eof
)
explorer /select,${TMP_FILE}
del ${TMP_BAT_FILE} 2> nul
`;

(() => {
  commonSetup();
})();

///////////////////////////////////////////////////////
// end of common code
///////////////////////////////////////////////////////
