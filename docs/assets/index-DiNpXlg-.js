var R=Object.defineProperty;var P=(u,e,t)=>e in u?R(u,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):u[e]=t;var i=(u,e,t)=>P(u,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const d={TEAM:"team",PARTICIPANT:"participant",REF:"ref",SCORE:"score",PERCENT:"percent",DEPOSIT:"deposit",TABLE:"table-parent-team",CAROUSEL:"carousel-team",TOTAL_SCORE:"total-score-team",WINNER:"carousel-winner-team"};class y{getWinnerImgContainer(e){return l(d.WINNER,"-",e.toString())}getTotalScore(e){return l(d.TOTAL_SCORE,"-",e.toString())}getParticipant(e,t){return l(d.TEAM,"-",e.toString(),"-",d.PARTICIPANT,"-",t.toString())}getRef(e,t){return l(d.TEAM,"-",e.toString(),"-",d.REF,"-",t.toString())}getScore(e,t){return l(d.TEAM,"-",e.toString(),"-",d.SCORE,"-",t.toString())}getPercent(e,t){return l(d.TEAM,"-",e.toString(),"-",d.PERCENT,"-",t.toString())}getDeposit(e,t){return l(d.TEAM,"-",e.toString(),"-",d.DEPOSIT,"-",t.toString())}}const E={REGULAR_CELL:"regular-cell",HEAD_CELL:"head-cell",TEXT_INPUT:"text-input-field",CHECKBOX_INPUT:"checkbox-input-field"};function l(...u){return u.filter(e=>typeof e=="string").join("")}const C=new y;class _{populateTable(e){const t=document.getElementById(d.TABLE+"-"+e.toString());if(t==null)throw new Error("The table is not found");t.innerHTML="",t.appendChild(this.createFirstColumn(e)),t.appendChild(this.createSecondColumn(e)),t.appendChild(this.createThirdColumn(e)),t.appendChild(this.createFourthColumn(e)),t.appendChild(this.createFifthColumn(e))}createFifthColumn(e){const t=document.createElement("div");t.appendChild(this.getTableHead("ДЕПОЗИТ"));for(let n=1;n<4;n++)t.appendChild(this.getDeposit(n,e));return t}createFourthColumn(e){const t=document.createElement("div");t.appendChild(this.getTableHead("ПРОЦЕНТ"));for(let n=1;n<4;n++)t.appendChild(this.getPercentCell(n,e));return t}createThirdColumn(e){const t=document.createElement("div");t.appendChild(this.getTableHead("БАЛЛ"));for(let n=1;n<4;n++)t.appendChild(this.getScoreCell(n,e));return t}createSecondColumn(e){const t=document.createElement("div");t.appendChild(this.getTableHead("РЕФ"));for(let n=1;n<4;n++)t.appendChild(this.getRef(n,e));return t}createFirstColumn(e){const t=document.createElement("div");t.appendChild(this.getTableHead("Участник"));for(let n=1;n<4;n++)t.appendChild(this.getTextInput("Участник "+n.toString(),n,e));return t}getTableHead(e){const t=this.extractTemplateContent(E.HEAD_CELL),n=t.querySelector("div");if(n==null)throw new Error("The template does not contain div element");return n.textContent=e,t}getPercentCell(e,t){const n=this.extractTemplateContent(E.REGULAR_CELL),r=n.querySelector("div");if(r==null)throw new Error("The template does not contain div element");return r.textContent="33.33%",r.id=C.getPercent(t,e),n}getScoreCell(e,t){const n=this.extractTemplateContent(E.REGULAR_CELL),r=n.querySelector("div");if(r==null)throw new Error("The template does not contain div element");return r.textContent="Балл: 1",r.id=C.getScore(t,e),n}getDeposit(e,t){const n=this.extractTemplateContent(E.CHECKBOX_INPUT),r=n.querySelector("input");if(r==null)throw new Error("The template does not contain input element");return r.id=C.getDeposit(t,e),n}getRef(e,t){const n=this.extractTemplateContent(E.CHECKBOX_INPUT),r=n.querySelector("input");if(r==null)throw new Error("The template does not contain input element");return r.id=C.getRef(t,e),n}getTextInput(e="Участник",t,n){const r=this.extractTemplateContent(E.TEXT_INPUT),s=r.querySelector("input");if(s==null)throw new Error("The template does not contain input element");return s.placeholder=e,s.id=C.getParticipant(n,t),r}extractTemplateContent(e){const t=document.getElementById(e);if(t==null||t.content==null)throw new Error("The template is empty or non existent");return t.content.cloneNode(!0)}}const U="images/carousel/",A=["bandit","bigbass","bonanza","dog","dogmulti","giza","mental","mummy","olympus","sugar"],b=new y;class v{constructor(e){i(this,"teamNumber");i(this,"parent");i(this,"figure");i(this,"images");i(this,"imageLength");i(this,"gap");i(this,"theta");i(this,"currImage");i(this,"bfc");i(this,"rotationInterval",null);i(this,"isRotating",!1);if(this.teamNumber=e,this.parent=document.getElementById(d.CAROUSEL+"-"+this.teamNumber.toString()),!this.parent)throw new Error("Carousel container not found!");if(this.figure=this.parent.querySelector("figure"),!this.figure)throw new Error("Carousel structure is missing `figure`!");this.images=this.figure.children,this.imageLength=this.images.length,this.gap=parseFloat(this.parent.dataset.gap||"10"),this.bfc="bfc"in this.parent.dataset,this.theta=this.imageLength>0?2*Math.PI/this.imageLength:0,this.currImage=0}init(){this.createCarousel(),this.setupCarousel(),this.initResize()}getCurrentImagePath(){if(!this.images||this.imageLength===0)return;const e=this.images[this.currImage%this.imageLength];if(!e)return;const t=e.querySelector("img");if(t)return t.src}createCarousel(){if(!this.parent||!this.figure)throw new Error("The figure element is missing!");this.figure.innerHTML="";for(const e of A){const t=document.createElement("div"),n=document.createElement("img");n.src=l(U,e,".png"),n.classList.add("border-3","border-white"),t.appendChild(n),this.figure.appendChild(t)}this.images=this.figure.children,this.imageLength=this.images.length,this.theta=this.imageLength>0?2*Math.PI/this.imageLength:0}setupCarousel(){if(!this.images||this.imageLength===0||!this.figure){console.error("No valid images found for the carousel!");return}const e=this.images[0];if(!e){console.error("First image not found!");return}const t=parseFloat(getComputedStyle(e).width);if(isNaN(t)||t<=0){console.error(" Invalid image width detected:",t);return}const n=t/(2*Math.tan(Math.PI/this.imageLength));this.figure.style.transformOrigin=`50% 50% ${-n}px`;for(let r=0;r<this.imageLength;r++){const s=this.images[r];s.style.padding=`0 ${this.gap}px`,s.style.transformOrigin=`50% 50% ${-n}px`,s.style.transform=`rotateY(${r*this.theta}rad)`,this.bfc&&(s.style.backfaceVisibility="hidden")}this.rotateCarousel(this.currImage)}rotateCarousel(e){if(!this.figure){console.error("Error: Figure element is missing!");return}if(isNaN(e)||isNaN(this.theta)||!isFinite(this.theta)){console.error("Invalid rotation value:",{imageIndex:e,theta:this.theta});return}this.figure.style.transform=`rotateY(${e*-this.theta}rad)`}startInfiniteRotation(){if(this.isRotating)return;this.isRotating=!0;let e=50;const t=Math.random()*5e3+4e3,n=Date.now(),r=()=>{this.currImage++,this.rotateCarousel(this.currImage);const s=Date.now()-n;e=50+s/t*950,s>=t?(clearInterval(this.rotationInterval),this.isRotating=!1,this.showWinner()):(clearInterval(this.rotationInterval),this.rotationInterval=window.setInterval(r,e))};this.rotationInterval=window.setInterval(r,e)}showWinner(){const e=b.getWinnerImgContainer(this.teamNumber),t=I(`#${e}`,HTMLDivElement),n=I("img",HTMLImageElement,t),r=this.getCurrentImagePath();r==null||this.parent==null||(n.src=r,t.classList.remove("!hidden"),this.parent.classList.add("absolute"),this.parent.style.opacity="0%",setTimeout(()=>{this.parent!=null&&(this.parent.classList.add("!hidden"),this.parent.style.opacity="100%",this.parent.classList.remove("absolute"))},500))}resetDisplay(){var n;const e=b.getWinnerImgContainer(this.teamNumber);I(`#${e}`,HTMLDivElement).classList.add("!hidden"),(n=this.parent)==null||n.classList.remove("!hidden")}initResize(){window.addEventListener("resize",()=>{this.setupCarousel()})}}function I(u,e,t=document.body){const n=t.querySelector(u);if(!n)throw new Error(`Element not found: ${u}`);if(!(n instanceof e))throw new Error(`Expected ${e.name}, but found ${n.constructor.name}`);return n}const m=new y,h={CALCULATE_BTN:"calculate-team",BONUS_INPUT:"bonus-team",PERCENT_INPUT:"percent-team",BET_INPUT:"bet-team",RESULT_TABLE:"table-results-team",PARENT_TABLE:"table-parent-team",XDIV:"carousel-winner-team"};class B{constructor(e){i(this,"teamNumber");i(this,"scores");i(this,"participants");i(this,"percents");i(this,"deposits");i(this,"refs");i(this,"score");i(this,"price");this.teamNumber=e,this.scores=[1,1,1],this.participants=["","",""],this.percents=[33.33,33.33,33.33],this.refs=[!1,!1,!1],this.deposits=[!1,!1,!1],this.score=null,this.price=null}init(){this.setupDepositEventListeners(),this.setupRefEventListeners(),this.setupCalculateBtnEvent()}fullReset(){this.scores=[1,1,1],this.participants=["","",""],this.percents=[33.33,33.33,33.33],this.refs=[!1,!1,!1],this.deposits=[!1,!1,!1],this.score=null,this.price=null,this.showTotalScoreTable(),this.hideXScoreDiv()}updateScore(){for(let e=0;e<3;e++)this.deposits[e]===!0?this.scores[e]=3:this.refs[e]===!0?this.scores[e]=2:this.scores[e]=1}setupCalculateBtnEvent(){const e=document.getElementById(l(h.CALCULATE_BTN,"-",this.teamNumber.toString())),t=document.getElementById(l(h.BONUS_INPUT,"-",this.teamNumber.toString())),n=document.getElementById(l(h.BET_INPUT,"-",this.teamNumber.toString())),r=document.getElementById(l(h.PERCENT_INPUT,"-",this.teamNumber.toString()));e==null||t==null||n==null||r==null||e.addEventListener("click",()=>{if(t.value==""||n.value==""||r.value=="")return;const s=parseFloat(t.value),o=parseFloat(n.value),p=parseFloat(r.value);if(isNaN(s)||isNaN(o)||isNaN(p))return;const f=Math.ceil((s-p)/o);this.score=f,this.price=Math.ceil(s/o),this.showXScoreDiv(f.toString())})}showXScoreDiv(e){const t=document.getElementById(l(h.XDIV,"-",this.teamNumber.toString()));if(t==null)throw new Error("total score is not found");const n=t.querySelector(".text-center");if(n==null)throw new Error("xDiv is not found");const r=t.querySelector("span");if(r==null)throw new Error("span is not found");n.classList.remove("hidden"),r.textContent=e}hideXScoreDiv(){const e=document.getElementById(l(h.XDIV,"-",this.teamNumber.toString()));if(e==null)throw new Error("total score is not found");const t=e.querySelector(".text-center");if(t==null)throw new Error("xDiv is not found");t.classList.add("hidden")}hideTotalScoreTable(){const e=m.getTotalScore(this.teamNumber),t=document.getElementById(e);if(t==null)throw new Error("total score is not found");t.classList.add("!hidden")}showTotalScoreTable(){const e=m.getTotalScore(this.teamNumber),t=document.getElementById(e);if(t==null)throw new Error("total score is not found");t.classList.remove("!hidden")}resetCalculateInputFields(){const e=document.getElementById(l(h.BONUS_INPUT,"-",this.teamNumber.toString())),t=document.getElementById(l(h.BET_INPUT,"-",this.teamNumber.toString())),n=document.getElementById(l(h.PERCENT_INPUT,"-",this.teamNumber.toString()));e==null||t==null||n==null||(e.value="",t.value="",n.value="")}showCalculateResult(){const e=document.getElementById(l(h.RESULT_TABLE,"-",this.teamNumber.toString())),t=document.getElementById(l(h.PARENT_TABLE,"-",this.teamNumber.toString()));e==null||t==null||(e.classList.remove("!hidden"),t.classList.add("!hidden"))}hideCalculateResult(){const e=document.getElementById(l(h.RESULT_TABLE,"-",this.teamNumber.toString())),t=document.getElementById(l(h.PARENT_TABLE,"-",this.teamNumber.toString()));e==null||t==null||(e.classList.add("!hidden"),t.classList.remove("!hidden"))}resetTotalScoreDisplay(){const e=m.getTotalScore(this.teamNumber),t=document.getElementById(e);if(t==null)throw new Error("total score is not found");t.textContent="Общий балл: 3"}updateDisplayScore(){const e=this.scores.reduce((s,o)=>s+o,0),t=Math.floor(100/e*100)/100,n=m.getTotalScore(this.teamNumber),r=document.getElementById(n);if(r==null)throw new Error("total score is not found");r.textContent=`Общий балл: ${e}`;for(let s=1;s<4;s++){const o=m.getScore(this.teamNumber,s),p=m.getPercent(this.teamNumber,s),f=document.getElementById(o),T=document.getElementById(p);if(f==null||T==null)throw new Error("score or percent are not found");f.textContent=`Балл: ${this.scores[s-1]}`;const N=Math.floor(this.scores[s-1]*t*100)/100;this.percents[s-1]=N,T.textContent=`${N}%`}}setupDepositEventListeners(){for(let e=1;e<4;e++){const t=m.getDeposit(this.teamNumber,e),n=document.getElementById(t);if(n==null)throw new Error("deposit is not found");n.addEventListener("change",()=>{this.updateDeposits(),this.updateScore(),this.updateDisplayScore()})}}setupRefEventListeners(){for(let e=1;e<4;e++){const t=m.getRef(this.teamNumber,e),n=document.getElementById(t);if(n==null)throw new Error("ref is not found");n.addEventListener("change",()=>{this.updateRefs(),this.updateScore(),this.updateDisplayScore()})}}updateRefs(){for(let e=1;e<4;e++){const t=m.getRef(this.teamNumber,e),n=document.getElementById(t);if(n==null)throw new Error("ref is not found");this.refs[e-1]=n.checked}}updateDeposits(){for(let e=1;e<4;e++){const t=m.getDeposit(this.teamNumber,e),n=document.getElementById(t);if(n==null)throw new Error("deposit is not found");this.deposits[e-1]=n.checked}}saveParticipantsNames(){for(let e=1;e<4;e++){const t=m.getParticipant(this.teamNumber,e),n=document.getElementById(t);if(n==null)throw new Error("element is not found");this.participants[e-1]=n.value}}}const g={BTN_LAUNCH_CAROUSEL:"rotate-btn",BTN_RESET:"reset-btn",BTN_RESULTS:"results-btn",RESULT_POPUP:"result-popup",RESULT_POPUP_CELL:"result-popup-cell"},S=new _,a=new B(1),c=new B(2),L=new v(1),w=new v(2);class D{constructor(){i(this,"memo");this.memo=new Map}init(){this.setupBtnEventListener(),S.populateTable(1),S.populateTable(2),a.init(),c.init(),L.init(),w.init()}showRestartBtn(){const e=document.getElementById(g.BTN_RESET),t=document.getElementById(g.BTN_LAUNCH_CAROUSEL);t==null||e==null||(e.classList.remove("!hidden"),t.classList.add("!hidden"))}showLaunchCarouselBtn(){const e=document.getElementById(g.BTN_RESET),t=document.getElementById(g.BTN_LAUNCH_CAROUSEL);t==null||e==null||(e.classList.add("!hidden"),t.classList.remove("!hidden"))}setupBtnEventListener(){const e=document.getElementById(g.BTN_LAUNCH_CAROUSEL),t=document.getElementById(g.BTN_RESET),n=document.getElementById("calculate-team-1"),r=document.getElementById("calculate-team-2"),s=document.getElementById(g.BTN_RESULTS);if(e==null||t==null||n==null||r==null||s==null)throw new Error("One of the buttons is undefined");e.addEventListener("click",()=>{e.disabled=!0,a.resetCalculateInputFields(),c.resetCalculateInputFields(),this.resetWinner(),this.launchCarousel(),a.showCalculateResult(),c.showCalculateResult(),a.saveParticipantsNames(),c.saveParticipantsNames(),a.hideTotalScoreTable(),c.hideTotalScoreTable(),setTimeout(()=>{this.showRestartBtn(),e.disabled=!1},1e4)}),t.addEventListener("click",()=>{this.cleanup(),a.fullReset(),c.fullReset()}),r.addEventListener("click",()=>{setTimeout(()=>this.assignWinner(),100)}),n.addEventListener("click",()=>{setTimeout(()=>this.assignWinner(),100)}),s.addEventListener("click",()=>this.showResultPopup());const o=document.getElementById(g.RESULT_POPUP);if(o==null)throw new Error("result popup is undefined");o.addEventListener("click",p=>{p.target===p.currentTarget&&(o.style.opacity="0%",setTimeout(()=>{o.classList.add("hidden"),o.style.opacity="100%"},500))})}showResultPopup(){const e=document.getElementById(g.RESULT_POPUP),t=document.getElementById(g.RESULT_POPUP_CELL);if(e==null||t==null)throw new Error("result popup is undefined");const n=e.querySelector("div");if(n==null)throw new Error("result popup child is undefined");n.innerHTML="",this.memo.forEach((r,s)=>{const o=t.content.cloneNode(!0),p=o.querySelector("div.text-center");if(p==null)return;p.textContent=s,n.appendChild(o);const f=t.content.cloneNode(!0),T=f.querySelector("div.text-center");T!=null&&(T.textContent=r,n.appendChild(f))}),e.style.opacity="0%",e.classList.remove("hidden"),e.style.opacity="100%"}cleanup(){S.populateTable(1),S.populateTable(2),L.resetDisplay(),w.resetDisplay(),a.hideCalculateResult(),c.hideCalculateResult(),a.init(),c.init(),a.resetTotalScoreDisplay(),c.resetTotalScoreDisplay(),a.resetCalculateInputFields(),c.resetCalculateInputFields(),this.showLaunchCarouselBtn(),this.resetWinner()}launchCarousel(){L.startInfiniteRotation(),w.startInfiniteRotation()}assignWinner(){if(a.score!=null&&c.score!=null){const e=document.getElementById("container-team-1"),t=document.getElementById("container-team-2");if(e==null||t==null)return;a.score>c.score?(e.classList.add("winner"),t.classList.add("loser"),this.saveWins(a.price,a.participants,a.percents)):a.score<c.score&&(e.classList.add("loser"),t.classList.add("winner"),this.saveWins(c.price,c.participants,c.percents))}}saveWins(e,t,n){if(e==null)throw new Error("the price is null");for(let r=0;r<3;r++){const s=t[r],o=n[r];console.log(s,e,o),this.memo.set(s,Math.ceil(e/100*o).toString())}}resetWinner(){if(a.score!=null&&c.score!=null){const e=document.getElementById("container-team-1"),t=document.getElementById("container-team-2");if(e==null||t==null)return;e.classList.remove("winner"),t.classList.remove("loser"),e.classList.remove("loser"),t.classList.remove("winner")}}}const O=new D;O.init();
