!function(){'use strict';var a=window.requestAnimationFrame,b=document.createElement('gamearea'),c=document.createElement('points');document.body.appendChild(b);document.body.appendChild(c);var d=200,f={dir:1,body:[{x:4,y:5,dom:n('i',function(a){a.className='snakepart far fa-smile'})}]},g={x:4,y:4,dom:n('i',function(a){a.className='apple fas fa-apple-alt'})};b.appendChild(f.body[0].dom);b.appendChild(g.dom);var h=9,i=9;b.style.width=h+'rem';b.style.height=i+'rem';var j=function(){for(var a=2;a<f.body.length;a++)b.removeChild(f.body[a].dom);d=200;f.body.length=2;f.body[0].x=4;f.body[0].y=4;f.body[1].x=4;f.body[1].y=5;f.dir=1;c.textContent=0;while(f.body.filter(function(a){return a.x===g.x&&a.y===g.y}).length)o(g)};window.addEventListener('keydown',function(a){var b=a.which-37;f.dir%2!==b%2&&(f.dir=b)});var k,l=function(){for(var a=f.body.length-1;a;a--)f.body[a].x=f.body[a-1].x,f.body[a].y=f.body[a-1].y,a>1?(f.body[a].dom.className=f.body[a-1].dom.className):(f.body[1].dom.className='snakepart body far fa-circle');f.dir===0?f.body[0].x--:f.dir===1?f.body[0].y--:f.dir===2?f.body[0].x++:f.body[0].y++;k&&(k(),k=null);f.body[0].x<0?(f.body[0].x=h-1):f.body[0].x>h-1&&(f.body[0].x=0);f.body[0].y<0?(f.body[0].y=i-1):f.body[0].y>i-1&&(f.body[0].y=0);for(var e=1;e<f.body.length;e++)f.body[e].x===f.body[0].x&&f.body[e].y===f.body[0].y&&(f.body[0].dom.className='snakepart far fa-dizzy',d=3000,k=function(){j();f.body[0].dom.className='snakepart far fa-smile'});if(f.body[0].x===g.x&&f.body[0].y===g.y){c.textContent++;if(f.body.length<h*i){while(f.body.filter(function(a){return a.x===g.x&&a.y===g.y}).length)o(g)}var m=Object.assign({},f.body[f.body.length-1],{dom:n('i',function(a){a.className='snakepart body far fa-circle'})});f.body[0].dom.className='snakepart far fa-laugh-wink';k=function(){f.body.push(m);b.insertBefore(m.dom,f.body[0].dom);f.body[0].dom.className='snakepart far fa-smile';f.body[1].dom.className='snakepart body ate far fa-circle'}}setTimeout(l,d)};l();var m=function(){f.body.forEach(function(a){a.dom.style.left=a.x+"rem";a.dom.style.top=a.y+"rem"});g.dom.style.left=g.x+"rem";g.dom.style.top=g.y+"rem";a(m)};a(m);function n(a,b){var c=document.createElement(a);b(c);return c}function o(a){a.x=Math.random()*h|0;a.y=Math.random()*i|0}typeof Object.assign!=='function'&&Object.defineProperty(Object,'assign',{value:function c(a,b){var d=arguments;if(a==null){throw new TypeError('Cannot convert undefined or null to object')}var e=Object(a);for(var f=1;f<arguments.length;f++){var g=d[f];if(g!=null){for(var h in g)Object.prototype.hasOwnProperty.call(g,h)&&(e[h]=g[h])}}return e},writable:!0,configurable:!0})}()