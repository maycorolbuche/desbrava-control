import{_ as b,r,o as e,c as t,w as o,a as d,b as Q,d as u,t as y,e as x,f as g,g as C,h as l,i as c,u as w}from"./index-BL08uNKe.js";const M={__name:"AppButton",props:{icon:{type:[String,Object]},label:{type:String}},setup(m){const a=m,n=g(a,"icon"),p=g(a,"label"),s=x(()=>typeof n.value);return(v,f)=>{const _=r("v-icon"),k=r("v-card-text"),L=r("v-card-title"),h=r("v-card");return e(),t(h,{class:"__app-button__",width:150},{default:o(()=>[d(k,{class:"text-center mx-0 px-0 pb-0 mb-0"},{default:o(()=>[s.value==="object"?(e(),t(_,{key:0,size:60},{default:o(()=>[(e(),t(Q(n.value)))]),_:1})):(e(),t(_,{key:1,size:60},{default:o(()=>[u(y(n.value),1)]),_:1}))]),_:1}),d(L,{class:"text-center font-weight-medium mx-0 px-0",style:{"font-size":"17px","text-wrap":"auto"}},{default:o(()=>[u(y(p.value),1)]),_:1})]),_:1})}}},i=b(M,[["__scopeId","data-v-6d121d9d"]]),B={},V={xmlns:"http://www.w3.org/2000/svg",version:"1.1","xmlns:xlink":"http://www.w3.org/1999/xlink",preserveAspectRatio:"none",x:"0px",y:"0px",width:"50px",height:"50px",viewBox:"0 0 50 50"};function A(m,a){return e(),C("svg",V,[...a[0]||(a[0]=[l("defs",null,[l("g",{id:"Layer0_0_FILL"},[l("path",{fill:"currentColor",stroke:"none",d:`
M 50 25
Q 50 14.65 42.6 7.25 35.3 0 25 0 14.65 0 7.25 7.25 0 14.65 0 25 0 35.3 7.25 42.6 14.65 50 25 50 35.3 50 42.6 42.6 50 35.3 50 25
M 44.25 9.95
L 44.25 15.75 25.1 48.15 5.9 15.75 5.9 9.95 44.25 9.95
M 7.1 15.85
L 25.1 45.95 43.05 15.85 7.1 15.85
M 22.95 18.05
Q 24.15 17.75 25.1 17.5
L 27.35 18.05
Q 29.9 18.6 31.45 18.55 32.9 18.55 35.25 18 36.4 17.75 37.25 17.5 37.15 18.65 36.95 20.15
L 37.7 19.9 36.9 20.3
Q 36.85 20.4 36.85 20.5 36.2 23.9 35.25 25.75 33.75 28.65 29.25 31.9 27.05 33.55 25.1 34.6 23.15 33.55 20.9 31.9 18.85 30.4 17.45 29
L 17.6 30.05 16.55 30.5 15 26.75 15.45 26.65
Q 15.15 26.2 14.9 25.75 13.95 23.9 13.35 20.5 13.15 19.45 13 18.35
L 12.9 17.5 15.05 18.05
Q 17.5 18.55 19 18.55 20.5 18.55 22.95 18.05
M 19.6 28.15
L 18.45 28.55
Q 19.5 29.55 20.95 30.65
L 20.95 30.5 19.6 28.15
M 35.45 21.35
L 35.55 20.9 20.95 27.65 20.75 27.7 21.9 29.7 23.2 30.25 21.65 31.2
Q 23.5 32.5 25.1 33.4 26.8 32.45 28.8 31 32.75 28.1 34.1 25.55 34.85 24.05 35.45 21.35
M 25.1 18.6
Q 24.3 18.8 23.2 19.05 21.05 19.5 19.7 19.55 18.35 19.6 16.2 19.3
L 14.3 18.95 14.75 21.35
Q 15.3 24.1 16.1 25.55 16.5 26.3 17.15 27.15
L 18.75 26.4 17.95 24.05 16.75 23.5 19.95 22.6 19.4 23.5 20 25.85 20.15 25.75 35.6 20.6 35.9 18.95
Q 35.1 19.1 34.05 19.25 32 19.6 30.75 19.55 29.35 19.55 27.1 19.05
L 25.1 18.6
M 43.1 14.85
L 43.1 11.1 7.05 11.1 7.05 14.85 43.1 14.85 Z`})])],-1),l("g",{transform:"matrix( 1, 0, 0, 1, 0,0) "},[l("use",{"xlink:href":"#Layer0_0_FILL"})],-1)])])}const I=b(B,[["render",A]]),N={class:"pa-2 d-flex justify-center flex-wrap",style:{gap:"20px"}},j={__name:"HomeView",setup(m){const a=x(()=>w()?.user),n=x(()=>w().role?.permissions?.map(p=>p.code));return(p,s)=>{const v=r("router-link"),f=r("v-alert"),_=r("v-container");return e(),t(_,{class:"pa-0 ma-0 mx-auto"},{default:o(()=>[a.value?.is_temporary_password?(e(),t(f,{key:0,class:"mx-5 mb-5",border:"start",title:"Altere sua senha",type:"warning"},{default:o(()=>[s[1]||(s[1]=u(" Você está acessando o sistema com uma senha provisória! ",-1)),d(v,{to:{name:"change-password"}},{default:o(()=>[...s[0]||(s[0]=[u("Clique aqui",-1)])]),_:1}),s[2]||(s[2]=u(" e altere sua senha. ",-1))]),_:1})):c("",!0),l("div",N,[n.value?.includes("districts.manage")?(e(),t(i,{key:0,icon:"mdi-map-marker-radius",label:"Distritos",to:{name:"districts"}})):c("",!0),n.value?.includes("clubs.manage")?(e(),t(i,{key:1,icon:"mdi-home-city-outline",label:"Clubes",to:{name:"clubs"}})):c("",!0),n.value?.includes("users.manage")?(e(),t(i,{key:2,icon:"mdi-account-group",label:"Usuários",to:{name:"users"}})):c("",!0),n.value?.includes("classes.control")?(e(),t(i,{key:3,icon:I,label:"Controle de Classes",to:{name:"classes-control"}})):c("",!0),n.value?c("",!0):(e(),t(i,{key:4,icon:"mdi-progress-check",label:"Meu Progresso",to:{name:"my-progress"}}))])]),_:1})}}};export{j as default};
