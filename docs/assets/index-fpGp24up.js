var y=Object.defineProperty;var R=(d,e,t)=>e in d?y(d,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):d[e]=t;var i=(d,e,t)=>R(d,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const u={TEAM:"team",PARTICIPANT:"participant",REF:"ref",SCORE:"score",PERCENT:"percent",DEPOSIT:"deposit",TABLE:"table-parent-team",CAROUSEL:"carousel-team",TOTAL_SCORE:"total-score-team",WINNER:"carousel-winner-team"};class w{getWinnerImgContainer(e){return o(u.WINNER,"-",e.toString())}getTotalScore(e){return o(u.TOTAL_SCORE,"-",e.toString())}getParticipant(e,t){return o(u.TEAM,"-",e.toString(),"-",u.PARTICIPANT,"-",t.toString())}getRef(e,t){return o(u.TEAM,"-",e.toString(),"-",u.REF,"-",t.toString())}getScore(e,t){return o(u.TEAM,"-",e.toString(),"-",u.SCORE,"-",t.toString())}getPercent(e,t){return o(u.TEAM,"-",e.toString(),"-",u.PERCENT,"-",t.toString())}getDeposit(e,t){return o(u.TEAM,"-",e.toString(),"-",u.DEPOSIT,"-",t.toString())}}const p={REGULAR_CELL:"regular-cell",HEAD_CELL:"head-cell",TEXT_INPUT:"text-input-field",CHECKBOX_INPUT:"checkbox-input-field"};function o(...d){return d.filter(e=>typeof e=="string").join("")}const T=new w;class P{populateTable(e){const t=document.getElementById(u.TABLE+"-"+e.toString());if(t==null)throw new Error("The table is not found");t.innerHTML="",t.appendChild(this.createFirstColumn(e)),t.appendChild(this.createSecondColumn(e)),t.appendChild(this.createThirdColumn(e)),t.appendChild(this.createFourthColumn(e)),t.appendChild(this.createFifthColumn(e))}createFifthColumn(e){const t=document.createElement("div");t.appendChild(this.getTableHead("ДЕПОЗИТ"));for(let n=1;n<4;n++)t.appendChild(this.getDeposit(n,e));return t}createFourthColumn(e){const t=document.createElement("div");t.appendChild(this.getTableHead("ПРОЦЕНТ"));for(let n=1;n<4;n++)t.appendChild(this.getPercentCell(n,e));return t}createThirdColumn(e){const t=document.createElement("div");t.appendChild(this.getTableHead("БАЛЛ"));for(let n=1;n<4;n++)t.appendChild(this.getScoreCell(n,e));return t}createSecondColumn(e){const t=document.createElement("div");t.appendChild(this.getTableHead("РЕФ"));for(let n=1;n<4;n++)t.appendChild(this.getRef(n,e));return t}createFirstColumn(e){const t=document.createElement("div");t.appendChild(this.getTableHead("Участник"));for(let n=1;n<4;n++)t.appendChild(this.getTextInput("Участник "+n.toString(),n,e));return t}getTableHead(e){const t=this.extractTemplateContent(p.HEAD_CELL),n=t.querySelector("div");if(n==null)throw new Error("The template does not contain div element");return n.textContent=e,t}getPercentCell(e,t){const n=this.extractTemplateContent(p.REGULAR_CELL),s=n.querySelector("div");if(s==null)throw new Error("The template does not contain div element");return s.textContent="33.33%",s.id=T.getPercent(t,e),n}getScoreCell(e,t){const n=this.extractTemplateContent(p.REGULAR_CELL),s=n.querySelector("div");if(s==null)throw new Error("The template does not contain div element");return s.textContent="Балл: 1",s.id=T.getScore(t,e),n}getDeposit(e,t){const n=this.extractTemplateContent(p.CHECKBOX_INPUT),s=n.querySelector("input");if(s==null)throw new Error("The template does not contain input element");return s.id=T.getDeposit(t,e),n}getRef(e,t){const n=this.extractTemplateContent(p.CHECKBOX_INPUT),s=n.querySelector("input");if(s==null)throw new Error("The template does not contain input element");return s.id=T.getRef(t,e),n}getTextInput(e="Участник",t,n){const s=this.extractTemplateContent(p.TEXT_INPUT),r=s.querySelector("input");if(r==null)throw new Error("The template does not contain input element");return r.placeholder=e,r.id=T.getParticipant(n,t),s}extractTemplateContent(e){const t=document.getElementById(e);if(t==null||t.content==null)throw new Error("The template is empty or non existent");return t.content.cloneNode(!0)}}const A="/images/carousel/",_=["bandit","bigbass","bonanza","dog","dogmulti","giza","mental","mummy","olympus","sugar"],b=new w;class v{constructor(e){i(this,"teamNumber");i(this,"parent");i(this,"figure");i(this,"images");i(this,"imageLength");i(this,"gap");i(this,"theta");i(this,"currImage");i(this,"bfc");i(this,"rotationInterval",null);i(this,"isRotating",!1);if(this.teamNumber=e,this.parent=document.getElementById(u.CAROUSEL+"-"+this.teamNumber.toString()),!this.parent)throw new Error("Carousel container not found!");if(this.figure=this.parent.querySelector("figure"),!this.figure)throw new Error("Carousel structure is missing `figure`!");this.images=this.figure.children,this.imageLength=this.images.length,this.gap=parseFloat(this.parent.dataset.gap||"10"),this.bfc="bfc"in this.parent.dataset,this.theta=this.imageLength>0?2*Math.PI/this.imageLength:0,this.currImage=0}init(){this.createCarousel(),this.setupCarousel(),this.initResize()}getCurrentImagePath(){if(!this.images||this.imageLength===0)return;const e=this.images[this.currImage%this.imageLength];if(!e)return;const t=e.querySelector("img");if(t)return t.src}createCarousel(){if(!this.parent||!this.figure)throw new Error("The figure element is missing!");this.figure.innerHTML="";for(const e of _){const t=document.createElement("div"),n=document.createElement("img");n.src=o(A,e,".png"),t.appendChild(n),this.figure.appendChild(t)}this.images=this.figure.children,this.imageLength=this.images.length,this.theta=this.imageLength>0?2*Math.PI/this.imageLength:0}setupCarousel(){if(!this.images||this.imageLength===0||!this.figure){console.error("No valid images found for the carousel!");return}const e=this.images[0];if(!e){console.error("First image not found!");return}const t=parseFloat(getComputedStyle(e).width);if(isNaN(t)||t<=0){console.error(" Invalid image width detected:",t);return}const n=t/(2*Math.tan(Math.PI/this.imageLength));this.figure.style.transformOrigin=`50% 50% ${-n}px`;for(let s=0;s<this.imageLength;s++){const r=this.images[s];r.style.padding=`0 ${this.gap}px`,r.style.transformOrigin=`50% 50% ${-n}px`,r.style.transform=`rotateY(${s*this.theta}rad)`,this.bfc&&(r.style.backfaceVisibility="hidden")}this.rotateCarousel(this.currImage)}rotateCarousel(e){if(!this.figure){console.error("Error: Figure element is missing!");return}if(isNaN(e)||isNaN(this.theta)||!isFinite(this.theta)){console.error("Invalid rotation value:",{imageIndex:e,theta:this.theta});return}this.figure.style.transform=`rotateY(${e*-this.theta}rad)`}startInfiniteRotation(){if(this.isRotating)return;this.isRotating=!0;let e=50;const t=Math.random()*5e3+4e3,n=Date.now(),s=()=>{this.currImage++,this.rotateCarousel(this.currImage);const r=Date.now()-n;e=50+r/t*950,r>=t?(clearInterval(this.rotationInterval),this.isRotating=!1,this.showWinner()):(clearInterval(this.rotationInterval),this.rotationInterval=window.setInterval(s,e))};this.rotationInterval=window.setInterval(s,e)}showWinner(){var r;const e=b.getWinnerImgContainer(this.teamNumber),t=document.getElementById(e);if(t==null)return;const n=t.querySelector("img");if(n==null)return;const s=this.getCurrentImagePath();s!=null&&(n.src=s,t.classList.remove("!hidden"),(r=this.parent)==null||r.classList.add("!hidden"))}resetDisplay(){var n;const e=b.getWinnerImgContainer(this.teamNumber),t=document.getElementById(e);t!=null&&(t.classList.add("!hidden"),(n=this.parent)==null||n.classList.remove("!hidden"))}initResize(){window.addEventListener("resize",()=>{this.setupCarousel()})}}const h=new w,m={CALCULATE_BTN:"calculate-team",BONUS_INPUT:"bonus-team",PERCENT_INPUT:"percent-team",BET_INPUT:"bet-team",RESULT_TABLE:"table-results-team",PARENT_TABLE:"table-parent-team"};class B{constructor(e){i(this,"teamNumber");i(this,"scores");i(this,"participants");i(this,"percents");i(this,"deposits");i(this,"refs");i(this,"score");i(this,"price");this.teamNumber=e,this.scores=[1,1,1],this.participants=["","",""],this.percents=[33.33,33.33,33.33],this.refs=[!1,!1,!1],this.deposits=[!1,!1,!1],this.score=null,this.price=null}init(){this.setupDepositEventListeners(),this.setupRefEventListeners(),this.setupCalculateBtnEvent()}fullReset(){this.scores=[1,1,1],this.participants=["","",""],this.percents=[33.33,33.33,33.33],this.refs=[!1,!1,!1],this.deposits=[!1,!1,!1],this.score=null,this.price=null}updateScore(){for(let e=0;e<3;e++)this.deposits[e]===!0?this.scores[e]=3:this.refs[e]===!0?this.scores[e]=2:this.scores[e]=1}setupCalculateBtnEvent(){const e=document.getElementById(o(m.CALCULATE_BTN,"-",this.teamNumber.toString())),t=document.getElementById(o(m.BONUS_INPUT,"-",this.teamNumber.toString())),n=document.getElementById(o(m.BET_INPUT,"-",this.teamNumber.toString())),s=document.getElementById(o(m.PERCENT_INPUT,"-",this.teamNumber.toString()));e==null||t==null||n==null||s==null||e.addEventListener("click",()=>{if(t.value==""||n.value==""||s.value=="")return;const r=parseFloat(t.value),c=parseFloat(n.value),C=parseFloat(s.value);if(isNaN(r)||isNaN(c)||isNaN(C))return;const f=Math.floor((r+c)/C),I=h.getTotalScore(this.teamNumber),E=document.getElementById(I);if(E==null)throw new Error("total score is not found");E.textContent=`X${f}`,this.score=f,this.price=r})}resetCalculateInputFields(){const e=document.getElementById(o(m.BONUS_INPUT,"-",this.teamNumber.toString())),t=document.getElementById(o(m.BET_INPUT,"-",this.teamNumber.toString())),n=document.getElementById(o(m.PERCENT_INPUT,"-",this.teamNumber.toString()));e==null||t==null||n==null||(e.value="",t.value="",n.value="")}showCalculateResult(){const e=document.getElementById(o(m.RESULT_TABLE,"-",this.teamNumber.toString())),t=document.getElementById(o(m.PARENT_TABLE,"-",this.teamNumber.toString()));e==null||t==null||(e.classList.remove("!hidden"),t.classList.add("!hidden"))}hideCalculateResult(){const e=document.getElementById(o(m.RESULT_TABLE,"-",this.teamNumber.toString())),t=document.getElementById(o(m.PARENT_TABLE,"-",this.teamNumber.toString()));e==null||t==null||(e.classList.add("!hidden"),t.classList.remove("!hidden"))}resetTotalScoreDisplay(){const e=h.getTotalScore(this.teamNumber),t=document.getElementById(e);if(t==null)throw new Error("total score is not found");t.textContent="Общий балл: 3"}updateDisplayScore(){const e=this.scores.reduce((r,c)=>r+c,0),t=Math.floor(100/e*100)/100,n=h.getTotalScore(this.teamNumber),s=document.getElementById(n);if(s==null)throw new Error("total score is not found");s.textContent=`Общий балл: ${e}`;for(let r=1;r<4;r++){const c=h.getScore(this.teamNumber,r),C=h.getPercent(this.teamNumber,r),f=document.getElementById(c),I=document.getElementById(C);if(f==null||I==null)throw new Error("score or percent are not found");f.textContent=`Балл: ${this.scores[r-1]}`;const E=Math.floor(this.scores[r-1]*t*100)/100;this.percents[r-1]=E,I.textContent=`${E}%`}}setupDepositEventListeners(){for(let e=1;e<4;e++){const t=h.getDeposit(this.teamNumber,e),n=document.getElementById(t);if(n==null)throw new Error("deposit is not found");n.addEventListener("change",()=>{this.updateDeposits(),this.updateScore(),this.updateDisplayScore()})}}setupRefEventListeners(){for(let e=1;e<4;e++){const t=h.getRef(this.teamNumber,e),n=document.getElementById(t);if(n==null)throw new Error("ref is not found");n.addEventListener("change",()=>{this.updateRefs(),this.updateScore(),this.updateDisplayScore()})}}updateRefs(){for(let e=1;e<4;e++){const t=h.getRef(this.teamNumber,e),n=document.getElementById(t);if(n==null)throw new Error("ref is not found");this.refs[e-1]=n.checked}}updateDeposits(){for(let e=1;e<4;e++){const t=h.getDeposit(this.teamNumber,e),n=document.getElementById(t);if(n==null)throw new Error("deposit is not found");this.deposits[e-1]=n.checked}}saveParticipantsNames(){for(let e=1;e<4;e++){const t=h.getParticipant(this.teamNumber,e),n=document.getElementById(t);if(n==null)throw new Error("element is not found");this.participants[e-1]=n.value}}}const g={BTN_LAUNCH_CAROUSEL:"rotate-btn",BTN_RESET:"reset-btn"},S=new P,l=new B(1),a=new B(2),L=new v(1),N=new v(2);class U{constructor(){i(this,"memo");this.memo=new Map}init(){this.setupBtnEventListener(),S.populateTable(1),S.populateTable(2),l.init(),a.init(),L.init(),N.init()}showRestartBtn(){const e=document.getElementById(g.BTN_RESET),t=document.getElementById(g.BTN_LAUNCH_CAROUSEL);t==null||e==null||(e.classList.remove("!hidden"),t.classList.add("!hidden"))}showLaunchCarouselBtn(){const e=document.getElementById(g.BTN_RESET),t=document.getElementById(g.BTN_LAUNCH_CAROUSEL);t==null||e==null||(e.classList.add("!hidden"),t.classList.remove("!hidden"))}setupBtnEventListener(){const e=document.getElementById(g.BTN_LAUNCH_CAROUSEL),t=document.getElementById(g.BTN_RESET),n=document.getElementById("calculate-team-1"),s=document.getElementById("calculate-team-2");e==null||t==null||n==null||s==null||(e.addEventListener("click",()=>{l.resetCalculateInputFields(),a.resetCalculateInputFields(),this.resetWinner(),this.launchCarousel(),l.showCalculateResult(),a.showCalculateResult(),l.saveParticipantsNames(),a.saveParticipantsNames(),setTimeout(()=>this.showRestartBtn(),1e4)}),t.addEventListener("click",()=>{this.cleanup(),l.fullReset(),a.fullReset()}),s.addEventListener("click",()=>{setTimeout(()=>this.assignWinner(),100)}),n.addEventListener("click",()=>{setTimeout(()=>this.assignWinner(),100)}))}cleanup(){S.populateTable(1),S.populateTable(2),L.resetDisplay(),N.resetDisplay(),l.hideCalculateResult(),a.hideCalculateResult(),l.init(),a.init(),l.resetTotalScoreDisplay(),a.resetTotalScoreDisplay(),l.resetCalculateInputFields(),a.resetCalculateInputFields(),this.showLaunchCarouselBtn(),this.resetWinner()}launchCarousel(){L.startInfiniteRotation(),N.startInfiniteRotation()}assignWinner(){if(l.score!=null&&a.score!=null){const e=document.getElementById("container-team-1"),t=document.getElementById("container-team-2");if(e==null||t==null)return;l.score>a.score?(e.classList.add("winner"),t.classList.add("loser"),this.saveWins(l.price,l.participants,l.percents)):l.score<a.score&&(e.classList.add("loser"),t.classList.add("winner"),this.saveWins(a.price,a.participants,a.percents))}}saveWins(e,t,n){if(e==null)throw new Error("the price is null");for(let s=0;s<3;s++){const r=t[s],c=n[s];console.log(r,e,c),this.memo.set(r,Math.floor(e/100*c).toString())}}resetWinner(){if(l.score!=null&&a.score!=null){const e=document.getElementById("container-team-1"),t=document.getElementById("container-team-2");if(e==null||t==null)return;e.classList.remove("winner"),t.classList.remove("loser"),e.classList.remove("loser"),t.classList.remove("winner")}}}const O=new U;O.init();
