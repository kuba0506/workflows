var rclick=function(){for(var e=document.querySelectorAll(".rclick"),t=0;t<e.length;t++)e[t].addEventListener("contextmenu",function(e){if(e.preventDefault(),"IMG"===e.target.tagName&&null==document.querySelector(".preview")){var t=document.createElement("div");t.className="preview",e.target.parentNode.appendChild(t);var i=document.createElement("img"),n=e.target.src;i.src=n.substr(0,n.length-7)+".jpg",t.style.left=e.offsetX+90+"px",t.style.top=e.offsetY+-90+"px",t.appendChild(i),e.target.addEventListener("mouseout",function r(t){var i=t.target.parentNode.querySelector("div.preview");i.parentNode.removeChild(i),e.target.removeEventListener("mouseout",r,!1)},!1),e.target.addEventListener("mousemove",function(e){t.style.left=e.offsetX+90+"px",t.style.top=e.offsetY+-90+"px"})}},!1)}(),pixgrid=function(){function e(e){var t=(window.innerWidth-e.width)/2,i=(window.innerHeight-e.height)/2;return e.style.top=i+"px",e.style.left=t+"px",e}for(var t=document.querySelectorAll(".pixgrid"),i=0;i<t.length;i++)t[i].addEventListener("click",function(t){if("IMG"===t.target.tagName){var i=document.createElement("div");i.id="overlay",document.body.appendChild(i),i.style.position="absolute",i.style.top=0,i.style.backgroundColor="rgba(0,0,0,0.7)",i.style.cursor="pointer",i.style.width=window.innerWidth+"px",i.style.height=window.innerHeight+"px",i.style.top=window.pageYOffset+"px",i.style.left=window.pageXOffset+"px";var n=t.target.src,r=document.createElement("img");r.id="largeImage",r.src=n.substr(0,n.length-7)+".jpg",r.style.display="block",r.style.position="absolute",r.addEventListener("load",function(){this.height>window.innerHeight&&(this.ratio=window.innerHeight/this.height,this.height=this.height*this.ratio,this.width=this.width*this.ratio),this.width>window.innerWidth&&(this.ratio=window.innerWidth/this.width,this.height=this.height*this.ratio,this.width=this.width*this.ratio),e(this),i.appendChild(r)}),r.addEventListener("click",function(){i&&(window.removeEventListener("resize",window,!1),window.removeEventListener("scroll",window,!1),i.parentNode.removeChild(i))},!1),window.addEventListener("scroll",function(){i&&(i.style.top=window.pageYOffset+"px",i.style.left=window.pageXOffset+"px")},!1),window.addEventListener("resize",function(){i&&(i.style.width=window.innerWidth+"px",i.style.height=window.innerHeight+"px",i.style.top=window.pageYOffset+"px",i.style.left=window.pageXOffset+"px",e(r))},!1)}},!1)}(),fill;(fill=function(e){return $(".tagline").append(""+e)})("The most creative minds in Art"),$(function(){var e=require("mustache");$.getJSON("js/data.json",function(t){var i=$("#speakerstpl").html(),n=e.to_html(i,t);$("#speakers").html(n)})});