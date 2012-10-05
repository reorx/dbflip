// ==UserScript==
// @name           dbflip
// @namespace      http://dbflip.reorx.com/
// @description    flip reading for douban articles
// @author         reorx
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @version        0.1
// @require
// @include        http://www.douban.com/note/*
// ==/UserScript==


// util functions
//


function bindEvent(element, type, handler) {
   if(element.addEventListener) {
      element.addEventListener(type, handler, false);
   } else {
      element.attachEvent('on'+type, handler);
   }
}

function addCss(cssCode) {
    var se = document.createElement("style");
    se.type = "text/css";
    if (se.styleSheet) {
        se.styleSheet.cssText = cssCode;
    } else {
        se.appendChild(document.createTextNode(cssCode));
    }
    document.getElementsByTagName("head")[0].appendChild(se);
}

// add css
css_code ="#dbflip_close_button{width:60px;height:50px;line-height:20px;padding-top:10px;text-align:center;background:#ddd;border-radius:0 8px 8px 0;margin-top:-30px;opacity:0.1;position:fixed;right:780px;top:50%;z-index:999;color:#333;cursor:pointer;}#dbflip_close_button_trigger{height:100%;left:-40px;position:absolute;top:0;width:60px;}#dbflip_close_button_trigger:hover > div{opacity:0.6;}#dbflip_close_button:hover{background:#ccc;color:#111;}#dbflip_flip{background:#F6F6F6;box-shadow:0 0 15px 0 #CCC;height:100%;overflow-y:auto;position:fixed;right:0;top:0;width:840px;z-index:99;}#dbflip_flip .container{position:relative;margin:40px;}#dbflip_flip .note{font-family:'Helvetica Neue',Helvetica,Arial,'Hiragino Sans GB','WenQuanYi Micro Hei','Microsoft YaHei',sans-serif;font-size:16px;line-height:33px;margin-top:40px;}#dbflip_flip .note-header{margin-top:60px;}#dbflip_flip .note br{line-height:50px;}#dbflip_flip .pl{color:#C8CDD2;}#dbflip_flip h1{color:#323C46;font-size:28px;font-weight:bold;}#dbflip_flip_button{position:absolute;right:0;top:0;width:40px;cursor:pointer;text-align:center;border-left:1px solid #329732;border-bottom:1px solid #329732;color:#329732;}#dbflip_flip_button:hover{background:#329732;color:#fff;}.note-header{position:relative;}"

addCss(css_code);

// prepare elements

var note_header = document.getElementsByClassName('note-header')[0];
var note = note_header.parentNode;
var flip_container = (function() {
    var e = note.cloneNode(true);
    e.setAttribute('class', 'container');
    e.removeAttribute('id');
    return e;
})();
var flip = (function() {
    var e = document.createElement('div');
    e.appendChild(flip_container);
    e.setAttribute('id', 'dbflip_flip');
    e.removeAttribute('class');
    return e;
})();

// create & bind & insert flip button

var flip_button = (function() {
    var e = document.createElement('div');
    e.setAttribute('id', 'dbflip_flip_button');
    e.appendChild(document.createTextNode('Flip'));
    e.appendChild(document.createElement('br'));
    e.appendChild(document.createTextNode('←'));
    return e;
})();

note_header.appendChild(flip_button);

FLIP_INITED = false;

var init_flip = function() {
    // close button
    var close_button = (function() {
        var e = document.createElement('div');
        e.setAttribute('id', 'dbflip_close_button');
        e.appendChild(document.createTextNode('Close'));
        e.appendChild(document.createElement('br'));
        e.appendChild(document.createTextNode('→'));
        return e;
    })();
    // close button showing trigger
    var close_button_trigger = (function() {
        var e = document.createElement('div');
        e.setAttribute('id', 'dbflip_close_button_trigger');
        e.appendChild(close_button);
        return e;
    })();

    flip_container.appendChild(close_button_trigger);

    bindEvent(close_button, 'click', function() {
        note.style.display = 'block';
        flip.style.display = 'none';
    });

    document.body.appendChild(flip);
    FLIP_INITED = true;
}

bindEvent(flip_button, 'click', function() {
    if (!FLIP_INITED) {
        init_flip();
    }
    note.style.display = 'none';
    flip.style.display = 'block';

});

