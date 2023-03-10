(()=>{"use strict";function e(e=0){let t=new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()-e);return t=t.toLocaleDateString("en-EN",{year:"numeric",month:"numeric",day:"numeric"}).split("/"),[t[2],t[0],t[1]].map((e=>e.padStart(2,"0"))).join("-")}function t(t){let n=t.replace(/(Вчера)/,`${e(1)}`).replace(/(Сегодня)/,`${e()}`);return console.log(n),n}class n{constructor(e,t,n,r=!1){this.author=e,this.message=t,this.date=n,this.isLiked=r}bundleComment(){let e=this.createContainer();return e.append(this.createTitle()),e.append(this.createMessage()),e.append(this.createFooter()),e}createContainer(){let e=document.createElement("div");return e.className="comment",e}createTitle(){let e=document.createElement("div");return e.className="comment__author",e.textContent=this.author,e}createMessage(){let e=document.createElement("p");return e.className="comment__content",e.textContent=this.message,e}createFooter(){let e=document.createElement("div");return e.className="comment__info",e.append(this.createButtons()),e.append(this.createTimestamp()),e}createButtons(){let e=document.createElement("div");return e.className="comment__buttons",e.append(this.createLikeButton()),e.append(this.createDeleteButton()),e}createLikeButton(){let e=document.createElement("img");return e.src="./images/heart.svg",e.className="comment__like",e.addEventListener("click",this.likeComment()),this.isLiked&&(e.src="./images/heart__filled.svg"),e}likeComment(){let e=this.isLiked;return function(t){e?(t.currentTarget.src="./images/heart.svg",e=!1):(t.currentTarget.src="./images/heart__filled.svg",e=!0)}}createDeleteButton(){let e=document.createElement("img");return e.src="./images/trash.svg",e.className="comment__delete",e.addEventListener("click",this.deleteComment),e}deleteComment(e){e.currentTarget.closest(".comment").remove(),document.querySelector(".comments-header__count").querySelector("span").textContent=document.querySelectorAll(".comment").length}createTimestamp(){let t,n=document.createElement("div");switch(n.className="comment__time",this.date){case"":case e():t="Сегодня";break;case e(1):t="Вчера";break;default:t=this.date}let r=(new Date).toLocaleString("ru-RU",{hour12:!1,hour:"2-digit",minute:"2-digit"});return n.textContent=t+" "+r,n}}let r=document.forms.comments__form;r.addEventListener("submit",(function(e){let t=e.currentTarget,o=t.name.value,c=t.content.value,l=t.date.value;for(const e of document.querySelectorAll(".validation-tooltip"))e.remove();let i=(u=o).length<2?"Name should contain at least 2 characters":!/[A-ZА-Я]/.test(u)&&"Name should contain at least 1 uppercase";var u,d;if(i)return s(i,t.name),t.name.classList.add("invalid"),t.name.focus(),void e.preventDefault();if(i=(d=c).length<10?"Message should contain at least 10 characters":!/[A-ZА-Я].*[A-ZА-Я]/.test(d)&&"Message should contain at least 2 uppercase",i)return s(i,t.content),t.content.classList.add("invalid"),t.content.focus(),void e.preventDefault();let p=new n(o,c,l).bundleComment();a.append(p),r.reset(),m(),e.preventDefault()}));let a=document.querySelector(".comments__list"),o=new n("Ed","Greetings Traveler",e(5)).bundleComment();a.append(o);let c=new n("Ed","Test Filter option",e(1),!0).bundleComment();a.append(c);let l=new n("Ed","Test Filter option",e(),!0).bundleComment();function s(e,t){let n=t.getBoundingClientRect(),r=document.createElement("p");r.className="validation-tooltip",r.textContent=e,r.style.top=n.bottom+5+scrollY+"px",r.style.left=n.left+scrollX+"px",document.body.append(r)}a.append(l);for(const e of r.elements)e.addEventListener("input",(e=>{for(const e of r.elements)e.classList.remove("invalid");document.querySelector(".validation-tooltip")?.remove()}));function m(){document.querySelector(".comments-header__count").querySelector("span").textContent=document.querySelectorAll(".comment").length}document.addEventListener("click",(function(e){if(![...r.elements].includes(e.target)){for(const e of r.elements)e.classList.remove("invalid");document.querySelector(".validation-tooltip")?.remove()}})),m(),document.querySelector(".comments-header__sort").addEventListener("input",(function(e){let n=e.currentTarget;!function(e){if("rate"==e){let e=[...a.children].filter((e=>/filled/.test(e.querySelector(".comment__like").src))),t=[...a.children].filter((e=>!/filled/.test(e.querySelector(".comment__like").src))),n=document.createElement("div");n.className="comments__list",n.append(...e,...t),a.replaceWith(n),a=n}if("date"==e){let e=[...a.children].sort(((e,n)=>{let r=e.querySelector(".comment__time").textContent,a=n.querySelector(".comment__time").textContent;return t(r).localeCompare(t(a))})),n=document.createElement("div");n.className="comments__list",n.append(...e),a.replaceWith(n),a=n}}(n[n.selectedIndex].value)}))})();