/*! For license information please see 22.a945cfcc.chunk.js.LICENSE.txt */
(this["webpackJsonpshreyu-react"]=this["webpackJsonpshreyu-react"]||[]).push([[22],{119:function(e,t,n){"use strict";var a=n(8),r=n(12),o=n(0),i=n.n(o),c=n(6),s=n.n(c),l=n(77),u=n.n(l),d=n(78),h={tag:d.tagPropType,fluid:s.a.oneOfType([s.a.bool,s.a.string]),className:s.a.string,cssModule:s.a.object},m=function(e){var t=e.className,n=e.cssModule,o=e.fluid,c=e.tag,s=Object(r.a)(e,["className","cssModule","fluid","tag"]),l="container";!0===o?l="container-fluid":o&&(l="container-"+o);var h=Object(d.mapToCssModules)(u()(t,l),n);return i.a.createElement(c,Object(a.a)({},s,{className:h}))};m.propTypes=h,m.defaultProps={tag:"div"},t.a=m},165:function(e,t,n){"use strict";var a=n(27),r=n(28),o=n(44),i=n(29),c=n(30),s=n(0),l=n.n(s),u=n(32),d=n(83),h=n(18),m=function(e){Object(i.a)(n,e);var t=Object(c.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).componentDidMount=function(){r._loadStateFromProps()},r.componentDidUpdate=function(e,t){e!==r.props&&r._loadStateFromProps()},r.handleClose=function(e){e.preventDefault(),r.props.hideRightSidebar()},r.changeLayout=function(e){switch(e.currentTarget.value){case"horizontal":r.setState({isHorizontalLayout:!r.state.isHorizontalLayout,isCondensed:!1,isDetachedLayout:!1}),r.props.changeLayout(h.a);break;default:r.setState({isHorizontalLayout:!1,isCondensed:!1,isDetachedLayout:!1}),r.props.changeLayout(h.b)}},r.changeWidthMode=function(e){switch(e.currentTarget.value){case"boxed":r.setState({isBoxed:!0}),r.props.changeLayoutWidth(h.c);break;default:r.setState({isBoxed:!1}),r.props.changeLayoutWidth(h.d)}},r.changeTheme=function(e){switch(e.currentTarget.value){case"dark":r.setState({isLight:!1,isDark:!0}),r.props.changeSidebarTheme(h.e);break;default:r.setState({isLight:!0,isDark:!1}),r.props.changeSidebarTheme(h.f)}},r.changeLeftSiderbarType=function(e){switch(e.currentTarget.value){case"condensed":r.setState({isCondensed:!0,isSidebarScrollable:!1,isLight:!1,isDark:!1}),r.props.changeSidebarType(h.g);break;case"scrollable":r.setState({isCondensed:!1,isSidebarScrollable:!0}),r.props.changeSidebarType(h.i);break;default:r.setState({isCondensed:!1,isSidebarScrollable:!1}),r.props.changeSidebarType(h.h)}},r.handleClose=r.handleClose.bind(Object(o.a)(r)),r.changeLayout=r.changeLayout.bind(Object(o.a)(r)),r.changeWidthMode=r.changeWidthMode.bind(Object(o.a)(r)),r.changeTheme=r.changeTheme.bind(Object(o.a)(r)),r.changeLeftSiderbarType=r.changeLeftSiderbarType.bind(Object(o.a)(r)),r.state={isHorizontalLayout:!1,isBoxed:!1,isSidebarScrollable:!1,isCondensed:!1,isLight:!1,isDark:!1},r}return Object(r.a)(n,[{key:"_loadStateFromProps",value:function(){this.setState({isHorizontalLayout:this.props.layoutType===h.a,isBoxed:this.props.layoutWidth===h.c,isSidebarScrollable:this.props.leftSideBarType===h.i,isCondensed:this.props.leftSideBarType===h.g,isDark:this.props.leftSideBarTheme===h.e})}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"mt-2 p-2"},l.a.createElement("div",{className:"alert alert-primary",role:"alert"},l.a.createElement("strong",null,"Customize the layout, sidebar menu, etc"))),l.a.createElement("h5",{className:"pl-3 font-size-15"},"Layout"),l.a.createElement("div",{className:"pl-3"},l.a.createElement("div",{className:"pt-2"},l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"layout",value:"vertical",id:"vertical-check",onChange:this.changeLayout,checked:!this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"vertical-check"},"Vertical Layout (Default)")),l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"layout",value:"horizontal",id:"horizontal-check",onChange:this.changeLayout,checked:this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"horizontal-check"},"Horizontal Layout")))),l.a.createElement("h5",{className:"pl-3 pt-3 border-top font-size-15"},"Width"),l.a.createElement("div",{className:"mt-2 pl-3"},l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"width",value:"fluid",id:"fluid-check",checked:!this.state.isBoxed,onChange:this.changeWidthMode,disabled:this.state.isDetachedLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"fluid-check"},"Fluid")),l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"width",value:"boxed",id:"boxed-check",checked:this.state.isBoxed,onChange:this.changeWidthMode,disabled:this.state.isDetachedLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"boxed-check"},"Boxed"))),l.a.createElement("hr",{className:"mb-0"}),l.a.createElement("h5",{className:"pl-3 pt-3 font-size-15"},"Left Sidebar"),l.a.createElement("div",{className:"pl-3"},l.a.createElement("div",{className:"pt-2"},l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"theme",value:"default",id:"default-theme-check",checked:!this.state.isDark,onChange:this.changeTheme,disabled:this.state.isDetachedLayout||this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"default-theme-check"},"Default")),l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"theme",value:"dark",id:"dark-theme-check",onChange:this.changeTheme,checked:this.state.isDark,disabled:this.state.isDetachedLayout||this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"dark-theme-check"},"Dark")))),l.a.createElement("div",{className:"pl-3"},l.a.createElement("div",{className:"pt-2"},l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"left-sidebar-width",value:"fixed",id:"left-sidebar-width-fixed",checked:!this.state.isCondensed&&!this.state.isSidebarScrollable,onChange:this.changeLeftSiderbarType,disabled:this.state.isDetachedLayout||this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"left-sidebar-width-fixed"},"Fixed (Default)")),l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"left-sidebar-width",value:"condensed",id:"left-sidebar-width-condensed",onChange:this.changeLeftSiderbarType,checked:this.state.isCondensed,disabled:this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"left-sidebar-width-condensed"},"Condensed")),l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"left-sidebar-width",value:"scrollable",id:"left-sidebar-width-scrollable",onChange:this.changeLeftSiderbarType,checked:this.state.isSidebarScrollable,disabled:this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"left-sidebar-width-scrollable"},"Scrollable")))))}}]),n}(s.Component);t.a=Object(u.b)((function(e){return{showRightSidebar:e.Layout.showRightSidebar,layoutType:e.Layout.layoutType,layoutWidth:e.Layout.layoutWidth,leftSideBarTheme:e.Layout.leftSideBarTheme,leftSideBarType:e.Layout.leftSideBarType}}),{hideRightSidebar:d.f,changeLayout:d.b,changeLayoutWidth:d.c,changeSidebarType:d.e,changeSidebarTheme:d.d})(m)},539:function(e,t,n){"use strict";n.r(t);var a=n(27),r=n(28),o=n(44),i=n(29),c=n(30),s=n(0),l=n.n(s),u=n(119),d=n(32),h=n(83),m=n(18),f=n(165),p=l.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(5),n.e(6)]).then(n.bind(null,300))})),b=l.a.lazy((function(){return Promise.all([n.e(1),n.e(18)]).then(n.bind(null,536))})),y=l.a.lazy((function(){return Promise.all([n.e(3),n.e(9)]).then(n.bind(null,302))})),g=l.a.lazy((function(){return n.e(8).then(n.bind(null,299))})),v=function(){return l.a.createElement("div",{className:"text-center"})},E=function(e){Object(i.a)(n,e);var t=Object(c.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).componentDidMount=function(){r.props.changeLayout(m.a)},r.openMenu=function(e){e.preventDefault(),r.setState({isMenuOpened:!r.state.isMenuOpened})},r.openMenu=r.openMenu.bind(Object(o.a)(r)),r.state={isMenuOpened:!1},r}return Object(r.a)(n,[{key:"render",value:function(){var e=this.props.children||null;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{id:"wrapper"},l.a.createElement(s.Suspense,{fallback:v()},l.a.createElement(p,Object.assign({openLeftMenuCallBack:this.openMenu},this.props))),l.a.createElement(s.Suspense,{fallback:v()},l.a.createElement(b,Object.assign({isMenuOpened:this.state.isMenuOpened},this.props))),l.a.createElement("div",{className:"content-page"},l.a.createElement("div",{className:"content"},l.a.createElement(u.a,{fluid:!0},l.a.createElement(s.Suspense,{fallback:v()},e))),l.a.createElement(g,null))),l.a.createElement(y,Object.assign({title:"Customize"},this.props),l.a.createElement(f.a,null)))}}]),n}(s.Component);t.default=Object(d.b)((function(e){return{layout:e.Layout,user:e.Auth.user}}),{changeLayout:h.b})(E)},77:function(e,t,n){var a;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var o=typeof a;if("string"===o||"number"===o)e.push(a);else if(Array.isArray(a)&&a.length){var i=r.apply(null,a);i&&e.push(i)}else if("object"===o)for(var c in a)n.call(a,c)&&a[c]&&e.push(c)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(a=function(){return r}.apply(t,[]))||(e.exports=a)}()},78:function(e,t,n){"use strict";n.r(t),n.d(t,"getScrollbarWidth",(function(){return i})),n.d(t,"setScrollbarWidth",(function(){return c})),n.d(t,"isBodyOverflowing",(function(){return s})),n.d(t,"getOriginalBodyPadding",(function(){return l})),n.d(t,"conditionallyUpdateScrollbar",(function(){return u})),n.d(t,"setGlobalCssModule",(function(){return d})),n.d(t,"mapToCssModules",(function(){return h})),n.d(t,"omit",(function(){return m})),n.d(t,"pick",(function(){return f})),n.d(t,"warnOnce",(function(){return b})),n.d(t,"deprecated",(function(){return y})),n.d(t,"DOMElement",(function(){return v})),n.d(t,"targetPropType",(function(){return E})),n.d(t,"tagPropType",(function(){return S})),n.d(t,"TransitionTimeouts",(function(){return N})),n.d(t,"TransitionPropTypeKeys",(function(){return L})),n.d(t,"TransitionStatuses",(function(){return T})),n.d(t,"keyCodes",(function(){return w})),n.d(t,"PopperPlacements",(function(){return k})),n.d(t,"canUseDOM",(function(){return O})),n.d(t,"isReactRefObj",(function(){return j})),n.d(t,"toNumber",(function(){return C})),n.d(t,"isObject",(function(){return D})),n.d(t,"isFunction",(function(){return M})),n.d(t,"findDOMElements",(function(){return z})),n.d(t,"isArrayOrNodeList",(function(){return F})),n.d(t,"getTarget",(function(){return A})),n.d(t,"defaultToggleEvents",(function(){return W})),n.d(t,"addMultipleEventListeners",(function(){return B})),n.d(t,"focusableElements",(function(){return P}));var a,r=n(6),o=n.n(r);function i(){var e=document.createElement("div");e.style.position="absolute",e.style.top="-9999px",e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e);var t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t}function c(e){document.body.style.paddingRight=e>0?e+"px":null}function s(){return document.body.clientWidth<window.innerWidth}function l(){var e=window.getComputedStyle(document.body,null);return parseInt(e&&e.getPropertyValue("padding-right")||0,10)}function u(){var e=i(),t=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],n=t?parseInt(t.style.paddingRight||0,10):0;s()&&c(n+e)}function d(e){a=e}function h(e,t){return void 0===e&&(e=""),void 0===t&&(t=a),t?e.split(" ").map((function(e){return t[e]||e})).join(" "):e}function m(e,t){var n={};return Object.keys(e).forEach((function(a){-1===t.indexOf(a)&&(n[a]=e[a])})),n}function f(e,t){for(var n,a=Array.isArray(t)?t:[t],r=a.length,o={};r>0;)o[n=a[r-=1]]=e[n];return o}var p={};function b(e){p[e]||("undefined"!==typeof console&&console.error(e),p[e]=!0)}function y(e,t){return function(n,a,r){null!==n[a]&&"undefined"!==typeof n[a]&&b('"'+a+'" property of "'+r+'" has been deprecated.\n'+t);for(var o=arguments.length,i=new Array(o>3?o-3:0),c=3;c<o;c++)i[c-3]=arguments[c];return e.apply(void 0,[n,a,r].concat(i))}}var g="object"===typeof window&&window.Element||function(){};function v(e,t,n){if(!(e[t]instanceof g))return new Error("Invalid prop `"+t+"` supplied to `"+n+"`. Expected prop to be an instance of Element. Validation failed.")}var E=o.a.oneOfType([o.a.string,o.a.func,v,o.a.shape({current:o.a.any})]),S=o.a.oneOfType([o.a.func,o.a.string,o.a.shape({$$typeof:o.a.symbol,render:o.a.func}),o.a.arrayOf(o.a.oneOfType([o.a.func,o.a.string,o.a.shape({$$typeof:o.a.symbol,render:o.a.func})]))]),N={Fade:150,Collapse:350,Modal:300,Carousel:600},L=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],T={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},w={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},k=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],O=!("undefined"===typeof window||!window.document||!window.document.createElement);function j(e){return!(!e||"object"!==typeof e)&&"current"in e}function x(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}function C(e){var t=typeof e;if("number"===t)return e;if("symbol"===t||"object"===t&&"[object Symbol]"===x(e))return NaN;if(D(e)){var n="function"===typeof e.valueOf?e.valueOf():e;e=D(n)?""+n:n}if("string"!==t)return 0===e?e:+e;e=e.replace(/^\s+|\s+$/g,"");var a=/^0b[01]+$/i.test(e);return a||/^0o[0-7]+$/i.test(e)?parseInt(e.slice(2),a?2:8):/^[-+]0x[0-9a-f]+$/i.test(e)?NaN:+e}function D(e){var t=typeof e;return null!=e&&("object"===t||"function"===t)}function M(e){if(!D(e))return!1;var t=x(e);return"[object Function]"===t||"[object AsyncFunction]"===t||"[object GeneratorFunction]"===t||"[object Proxy]"===t}function z(e){if(j(e))return e.current;if(M(e))return e();if("string"===typeof e&&O){var t=document.querySelectorAll(e);if(t.length||(t=document.querySelectorAll("#"+e)),!t.length)throw new Error("The target '"+e+"' could not be identified in the dom, tip: check spelling");return t}return e}function F(e){return null!==e&&(Array.isArray(e)||O&&"number"===typeof e.length)}function A(e,t){var n=z(e);return t?F(n)?n:null===n?[]:[n]:F(n)?n[0]:n}var W=["touchstart","click"];function B(e,t,n,a){var r=e;F(r)||(r=[r]);var o=n;if("string"===typeof o&&(o=o.split(/\s+/)),!F(r)||"function"!==typeof t||!Array.isArray(o))throw new Error("\n      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.\n      The second must be a function.\n      The third is a string or an array of strings that represents DOM events\n    ");return Array.prototype.forEach.call(o,(function(e){Array.prototype.forEach.call(r,(function(n){n.addEventListener(e,t,a)}))})),function(){Array.prototype.forEach.call(o,(function(e){Array.prototype.forEach.call(r,(function(n){n.removeEventListener(e,t,a)}))}))}}var P=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']},83:function(e,t,n){"use strict";var a=n(17);n.d(t,"h",(function(){return a.c})),n.d(t,"i",(function(){return a.f})),n.d(t,"j",(function(){return a.g}));var r=n(24);n.d(t,"b",(function(){return r.a})),n.d(t,"c",(function(){return r.b})),n.d(t,"d",(function(){return r.c})),n.d(t,"e",(function(){return r.d})),n.d(t,"f",(function(){return r.e})),n.d(t,"k",(function(){return r.f}));var o=n(37);n.d(t,"a",(function(){return o.a})),n.d(t,"g",(function(){return o.c}))}}]);
//# sourceMappingURL=22.a945cfcc.chunk.js.map