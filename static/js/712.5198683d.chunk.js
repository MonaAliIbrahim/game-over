"use strict";(self.webpackChunkgame_over=self.webpackChunkgame_over||[]).push([[712],{3712:function(e,t,a){a.r(t),a.d(t,{default:function(){return y}});var o=a(2791),r=a(9743),n=a(2677),s=a(9140),l=a(5736),i=a(4075),c=a.n(i),d="Home_homeContent__ghsqc",u="Home_homeCards__aHIEm",m="Home_card__Yq+aI",f="Home_title__-mY+P",p=a(3817),h=a(7689),b=a(1087),x=a(9434),v=a(5915),g=a(184);function y(){var e=localStorage.getItem("userToken"),t=(0,h.s0)(),a=(0,x.I0)(),i=(0,x.v9)((function(e){return e.games.gameList}));(0,o.useEffect)((function(){e?a((0,v.Cq)("popularity")):t("/login")}),[]);var y=(0,o.useCallback)((function(){return i.slice(0,3).map((function(e){return(0,g.jsx)(n.Z,{md:6,lg:4,children:(0,g.jsx)(c(),{cascade:!0,children:(0,g.jsxs)(s.Z,{className:m,children:[(0,g.jsx)(s.Z.Img,{variant:"top",src:e.thumbnail}),(0,g.jsx)(s.Z.Body,{className:"py-4 px-3",children:(0,g.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[(0,g.jsx)(s.Z.Title,{className:f,children:(0,g.jsx)(b.rU,{to:"/game-details/".concat(e.id),className:"stretched-link",children:e.title.length>15?"".concat(e.title.slice(0,15),"..."):e.title})}),(0,g.jsx)(s.Z.Text,{children:(0,g.jsx)(l.Z,{className:"text-white p-2",children:"Free"})})]})})]})})},e.id)}))}),[i]);return(0,g.jsxs)("div",{children:[(0,g.jsxs)("div",{className:"".concat(d," py-5 px-3"),children:[(0,g.jsxs)("h2",{className:"mb-3 pt-3",children:["Find & track the best ",(0,g.jsx)("span",{children:"free-to-play"})," games!"]}),(0,g.jsx)("p",{className:"mb-4",children:"Track what you've played and search for what to play next! Plus get free premium loot!"}),(0,g.jsx)(b.rU,{to:"/all",className:"btn mb-3 px-3 pb-2",children:"Browse Games"})]}),(0,g.jsxs)("div",{className:"".concat(u," mt-4 py-4"),children:[(0,g.jsxs)("h2",{className:"mb-5",children:[(0,g.jsx)("i",{className:"fa-solid fa-robot me-2"}),"Personalized Recommendations"]}),i.length>0?(0,g.jsx)(r.Z,{className:"gy-5 px-4 gx-md-5",children:y()}):(0,g.jsx)(p.Z,{})]})]})}},5736:function(e,t,a){var o=a(1413),r=a(5987),n=a(1694),s=a.n(n),l=a(2791),i=a(162),c=a(184),d=["bsPrefix","bg","pill","text","className","as"],u=l.forwardRef((function(e,t){var a=e.bsPrefix,n=e.bg,l=e.pill,u=e.text,m=e.className,f=e.as,p=void 0===f?"span":f,h=(0,r.Z)(e,d),b=(0,i.vE)(a,"badge");return(0,c.jsx)(p,(0,o.Z)((0,o.Z)({ref:t},h),{},{className:s()(m,b,l&&"rounded-pill",u&&"text-".concat(u),n&&"bg-".concat(n))}))}));u.displayName="Badge",u.defaultProps={bg:"primary",pill:!1},t.Z=u},4075:function(e,t,a){function o(e,t){var a={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(a[o]=e[o]);return a}function r(e,t){var a=t.distance,o=t.left,r=t.right,n=t.up,s=t.down,l=t.top,c=t.bottom,d=t.big,u=t.mirror,f=t.opposite,p=(a?a.toString():0)+((o?1:0)|(r?2:0)|(l||s?4:0)|(c||n?8:0)|(u?16:0)|(f?32:0)|(e?64:0)|(d?128:0));if(m.hasOwnProperty(p))return m[p];var h=o||r||n||s||l||c,b=void 0,x=void 0;if(h){if(!u!=!(e&&f)){var v=[r,o,c,l,s,n];o=v[0],r=v[1],l=v[2],c=v[3],n=v[4],s=v[5]}var g=a||(d?"2000px":"100%");b=o?"-"+g:r?g:"0",x=s||l?"-"+g:n||c?g:"0"}return m[p]=(0,i.animation)((e?"to":"from")+" {opacity: 0;"+(h?" transform: translate3d("+b+", "+x+", 0);":"")+"}\n     "+(e?"from":"to")+" {opacity: 1;transform: none;} "),m[p]}function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i.defaults,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=e.children,n=(e.out,e.forever),s=e.timeout,l=e.duration,c=void 0===l?i.defaults.duration:l,u=e.delay,m=void 0===u?i.defaults.delay:u,f=e.count,p=void 0===f?i.defaults.count:f,h=o(e,["children","out","forever","timeout","duration","delay","count"]),b={make:r,duration:void 0===s?c:s,delay:m,forever:n,count:p,style:{animationFillMode:"both"},reverse:h.left};return t?(0,d.default)(h,b,b,a):b}Object.defineProperty(t,"__esModule",{value:!0});var s,l=a(2007),i=a(4006),c=a(6208),d=(s=c)&&s.__esModule?s:{default:s},u={out:l.bool,left:l.bool,right:l.bool,top:l.bool,bottom:l.bool,big:l.bool,mirror:l.bool,opposite:l.bool,duration:l.number,timeout:l.number,distance:l.string,delay:l.number,count:l.number,forever:l.bool},m={};n.propTypes=u,t.default=n,e.exports=t.default}}]);
//# sourceMappingURL=712.5198683d.chunk.js.map