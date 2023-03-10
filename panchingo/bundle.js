!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}function n(t){return+t.replace(/px/,"")}function o(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=Math.random()*(e-t)+t;return Math.floor(n*Math.pow(10,i))/Math.pow(10,i)}function s(t){return t[o(0,t.length)]}var a=["#fcf403","#62fc03","#f4fc03","#03e7fc","#03fca5","#a503fc","#fc03ad","#fc03c2"];function r(t){return Math.log(t)/Math.log(1920)}var h=function(){function e(i){t(this,e);var n=i.initialPosition,a=i.direction,h=i.confettiRadius,c=i.confettiColors,u=i.emojis,l=i.emojiSize,d=i.canvasWidth,m=o(.9,1.7,3)*r(d);this.confettiSpeed={x:m,y:m},this.finalConfettiSpeedX=o(.2,.6,3),this.rotationSpeed=u.length?.01:o(.03,.07,3)*r(d),this.dragForceCoefficient=o(5e-4,9e-4,6),this.radius={x:h,y:h},this.initialRadius=h,this.rotationAngle="left"===a?o(0,.2,3):o(-.2,0,3),this.emojiSize=l,this.emojiRotationAngle=o(0,2*Math.PI),this.radiusYUpdateDirection="down";var f="left"===a?o(82,15)*Math.PI/180:o(-15,-82)*Math.PI/180;this.absCos=Math.abs(Math.cos(f)),this.absSin=Math.abs(Math.sin(f));var p=o(-150,0),g={x:n.x+("left"===a?-p:p)*this.absCos,y:n.y-p*this.absSin};this.currentPosition=Object.assign({},g),this.initialPosition=Object.assign({},g),this.color=u.length?null:s(c),this.emoji=u.length?s(u):null,this.createdAt=(new Date).getTime(),this.direction=a}return i(e,[{key:"draw",value:function(t){var e=this.currentPosition,i=this.radius,n=this.color,o=this.emoji,s=this.rotationAngle,a=this.emojiRotationAngle,r=this.emojiSize,h=window.devicePixelRatio;n?(t.fillStyle=n,t.beginPath(),t.ellipse(e.x*h,e.y*h,i.x*h,i.y*h,s,0,2*Math.PI),t.fill()):o&&(t.font="".concat(r,"px serif"),t.save(),t.translate(h*e.x,h*e.y),t.rotate(a),t.textAlign="center",t.fillText(o,0,0),t.restore())}},{key:"updatePosition",value:function(t,e){var i=this.confettiSpeed,n=this.dragForceCoefficient,o=this.finalConfettiSpeedX,s=this.radiusYUpdateDirection,a=this.rotationSpeed,r=this.createdAt,h=this.direction,c=e-r;i.x>o&&(this.confettiSpeed.x-=n*t),this.currentPosition.x+=i.x*("left"===h?-this.absCos:this.absCos)*t,this.currentPosition.y=this.initialPosition.y-i.y*this.absSin*c+.00125*Math.pow(c,2)/2,this.rotationSpeed-=this.emoji?1e-4:1e-5*t,this.rotationSpeed<0&&(this.rotationSpeed=0),this.emoji?this.emojiRotationAngle+=this.rotationSpeed*t%(2*Math.PI):"down"===s?(this.radius.y-=t*a,this.radius.y<=0&&(this.radius.y=0,this.radiusYUpdateDirection="up")):(this.radius.y+=t*a,this.radius.y>=this.initialRadius&&(this.radius.y=this.initialRadius,this.radiusYUpdateDirection="down"))}},{key:"getIsVisibleOnCanvas",value:function(t){return this.currentPosition.y<t+100}}]),e}();function c(){var t=document.createElement("canvas");return t.style.position="fixed",t.style.width="100%",t.style.height="100%",t.style.top="0",t.style.left="0",t.style.zIndex="1000",t.style.pointerEvents="none",document.body.appendChild(t),t}function u(t){var e=t.confettiRadius,i=void 0===e?6:e,n=t.confettiNumber,o=void 0===n?t.confettiesNumber||(t.emojis?40:250):n,s=t.confettiColors,r=void 0===s?a:s,h=t.emojis,c=void 0===h?t.emojies||[]:h,u=t.emojiSize,l=void 0===u?80:u;return t.emojies&&console.error("emojies argument is deprecated, please use emojis instead"),t.confettiesNumber&&console.error("confettiesNumber argument is deprecated, please use confettiNumber instead"),{confettiRadius:i,confettiNumber:o,confettiColors:r,emojis:c,emojiSize:l}}var l=function(){function e(i){var n=this;t(this,e),this.canvasContext=i,this.shapes=[],this.promise=new Promise((function(t){return n.resolvePromise=t}))}return i(e,[{key:"getBatchCompletePromise",value:function(){return this.promise}},{key:"addShapes",value:function(){var t;(t=this.shapes).push.apply(t,arguments)}},{key:"complete",value:function(){var t;return!this.shapes.length&&(null===(t=this.resolvePromise)||void 0===t||t.call(this),!0)}},{key:"processShapes",value:function(t,e,i){var n=this,o=t.timeDelta,s=t.currentTime;this.shapes=this.shapes.filter((function(t){return t.updatePosition(o,s),t.draw(n.canvasContext),!i||t.getIsVisibleOnCanvas(e)}))}}]),e}(),d=function(){function e(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this,e),this.activeConfettiBatches=[],this.canvas=i.canvas||c(),this.canvasContext=this.canvas.getContext("2d"),this.requestAnimationFrameRequested=!1,this.lastUpdated=(new Date).getTime(),this.iterationIndex=0,this.loop=this.loop.bind(this),requestAnimationFrame(this.loop)}return i(e,[{key:"loop",value:function(){var t,e,i,o,s;this.requestAnimationFrameRequested=!1,t=this.canvas,e=window.devicePixelRatio,o=n((i=getComputedStyle(t)).getPropertyValue("width")),s=n(i.getPropertyValue("height")),t.setAttribute("width",(o*e).toString()),t.setAttribute("height",(s*e).toString());var a=(new Date).getTime(),r=a-this.lastUpdated,h=this.canvas.offsetHeight,c=this.iterationIndex%10==0;this.activeConfettiBatches=this.activeConfettiBatches.filter((function(t){return t.processShapes({timeDelta:r,currentTime:a},h,c),!c||!t.complete()})),this.iterationIndex++,this.queueAnimationFrameIfNeeded(a)}},{key:"queueAnimationFrameIfNeeded",value:function(t){this.requestAnimationFrameRequested||this.activeConfettiBatches.length<1||(this.requestAnimationFrameRequested=!0,this.lastUpdated=t||(new Date).getTime(),requestAnimationFrame(this.loop))}},{key:"addConfetti",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=u(t),i=e.confettiRadius,n=e.confettiNumber,o=e.confettiColors,s=e.emojis,a=e.emojiSize,r=this.canvas.getBoundingClientRect(),c=r.width,d=r.height,m=5*d/7,f={x:0,y:m},p={x:c,y:m},g=new l(this.canvasContext),v=0;v<n/2;v++){var y=new h({initialPosition:f,direction:"right",confettiRadius:i,confettiColors:o,confettiNumber:n,emojis:s,emojiSize:a,canvasWidth:c}),x=new h({initialPosition:p,direction:"left",confettiRadius:i,confettiColors:o,confettiNumber:n,emojis:s,emojiSize:a,canvasWidth:c});g.addShapes(y,x)}return this.activeConfettiBatches.push(g),this.queueAnimationFrameIfNeeded(),g.getBatchCompletePromise()}},{key:"clearCanvas",value:function(){this.activeConfettiBatches=[]}}]),e}();const m=d;window.onload=function(){document.querySelector(".loading-mask").style.display="none",(new m).addConfetti()};var f=[{text:"Повезет в следующий раз.",img:"./image/wanga.png"},{text:"Вы выиграли пуно-пан при покупке от 350 рублей",img:"./image/punopan.png"},{text:"Повезет в следующий раз.",img:"./image/wanga.png"},{text:"Вы выиграли пан-чинго при покупке от 200 рублей",img:"./image/panchingo.png"},{text:"Вы выиграли бонзуке-со при покупке от 400 рублей",img:"./image/sosiskavteste.png"},{text:"Вы выиграли пан-чинго при покупке от 200 рублей",img:"./image/panchingo.png"},{text:"Вы выиграли пуно-пан при покупке от 300 рублей",img:"./image/punopan.png"},{text:"Повезет в следующий раз.",img:"./image/wanga.png"},{text:"Вы выиграли пан-чинго при покупке от 200 рублей",img:"./image/panchingo.png"},{text:"Вы выиграли пуно-пан при покупке от 300 рублей",img:"./image/punopan.png"}],p=document.querySelector(".surprice"),g=document.querySelector(".surprice-data"),v=document.querySelector(".surprice-img"),y={times:"",surprize:"",img:""};!function(){var t=localStorage.getItem("surprizeData"),e=(new Date).toLocaleDateString();if(t&&JSON.parse(t).times==e){var i=JSON.parse(t);p.textContent=i.surprize,g.textContent=i.times.split(",")[0],v.src=i.img}else{var n=(1,10,Math.floor(9*Math.random())+1);y.surprize=f[n].text,y.img=f[n].img,y.times=e,localStorage.setItem("surprizeData",JSON.stringify(y)),p.textContent=f[n].text,g.textContent=e,v.src=f[n].img}}()}();