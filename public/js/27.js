"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[27],{3744:(e,t)=>{t.Z=(e,t)=>{const n=e.__vccOpts||e;for(const[e,o]of t)n[e]=o;return n}},9018:(e,t,n)=>{n.d(t,{Z:()=>a});var o=n(821),r=["type"];const a={__name:"Button",props:{type:{type:String,default:"submit"}},setup:function(e){return function(t,n){return(0,o.openBlock)(),(0,o.createElementBlock)("button",{type:e.type,class:"inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"},[(0,o.renderSlot)(t.$slots,"default")],8,r)}}}},7887:(e,t,n)=>{n.d(t,{Z:()=>a});var o=n(821),r=["value"];const a={__name:"Input",props:["modelValue"],emits:["update:modelValue"],setup:function(e){var t=(0,o.ref)(null);return(0,o.onMounted)((function(){t.value.hasAttribute("autofocus")&&t.value.focus()})),function(n,a){return(0,o.openBlock)(),(0,o.createElementBlock)("input",{class:"border-gray-300 dark:border-white/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm dark:bg-zinc-800",value:e.modelValue,onInput:a[0]||(a[0]=function(e){return n.$emit("update:modelValue",e.target.value)}),ref_key:"input",ref:t},null,40,r)}}}},1329:(e,t,n)=>{n.d(t,{Z:()=>l});var o=n(821),r={class:"block font-medium text-sm text-gray-700 dark:text-white/80"},a={key:0},s={key:1};const l={__name:"Label",props:["value"],setup:function(e){return function(t,n){return(0,o.openBlock)(),(0,o.createElementBlock)("label",r,[e.value?((0,o.openBlock)(),(0,o.createElementBlock)("span",a,(0,o.toDisplayString)(e.value),1)):((0,o.openBlock)(),(0,o.createElementBlock)("span",s,[(0,o.renderSlot)(t.$slots,"default")]))])}}}},5414:(e,t,n)=>{n.d(t,{Z:()=>u});var o=n(821),r=n(9038),a={key:0},s=(0,o.createElementVNode)("div",{class:"font-medium text-red-600"},"Whoops! Something went wrong.",-1),l={class:"mt-3 list-disc list-inside text-sm text-red-600"};const u={__name:"ValidationErrors",setup:function(e){var t=(0,o.computed)((function(){return(0,r.qt)().props.value.errors})),n=(0,o.computed)((function(){return Object.keys(t.value).length>0}));return function(e,r){return(0,o.unref)(n)?((0,o.openBlock)(),(0,o.createElementBlock)("div",a,[s,(0,o.createElementVNode)("ul",l,[((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)((0,o.unref)(t),(function(e,t){return(0,o.openBlock)(),(0,o.createElementBlock)("li",{key:t},(0,o.toDisplayString)(e),1)})),128))])])):(0,o.createCommentVNode)("",!0)}}}},2318:(e,t,n)=>{n.d(t,{Z:()=>c});var o=n(821),r={class:"min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100"},a=(0,o.createElementVNode)("img",{src:"logo.png",alt:"PUPC Logo",class:"w-32 h-auto"},null,-1),s=(0,o.createElementVNode)("p",{class:"font-bold text-2xl mt-4"},"Digitalized Document Storage System",-1),l={class:"w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"};const u={},c=(0,n(3744).Z)(u,[["render",function(e,t){return(0,o.openBlock)(),(0,o.createElementBlock)("div",r,[a,s,(0,o.createElementVNode)("div",l,[(0,o.renderSlot)(e.$slots,"default")])])}]])},6027:(e,t,n)=>{n.r(t),n.d(t,{default:()=>p});var o=n(821),r=n(9018),a=n(2318),s=n(7887),l=n(1329),u=n(5414),c=n(9038),i=(0,o.createElementVNode)("div",{class:"mb-4 text-sm text-gray-600"}," This is a secure area of the application. Please confirm your password before continuing. ",-1),d=["onSubmit"],m={class:"flex justify-end mt-4"};const p={__name:"ConfirmPassword",setup:function(e){var t=(0,c.cI)({password:""}),n=function(){t.post(route("password.confirm"),{onFinish:function(){return t.reset()}})};return function(e,p){return(0,o.openBlock)(),(0,o.createBlock)(a.Z,null,{default:(0,o.withCtx)((function(){return[(0,o.createVNode)((0,o.unref)(c.Fb),{title:"Confirm Password"}),i,(0,o.createVNode)(u.Z,{class:"mb-4"}),(0,o.createElementVNode)("form",{onSubmit:(0,o.withModifiers)(n,["prevent"])},[(0,o.createElementVNode)("div",null,[(0,o.createVNode)(l.Z,{for:"password",value:"Password"}),(0,o.createVNode)(s.Z,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:(0,o.unref)(t).password,"onUpdate:modelValue":p[0]||(p[0]=function(e){return(0,o.unref)(t).password=e}),required:"",autocomplete:"current-password",autofocus:""},null,8,["modelValue"])]),(0,o.createElementVNode)("div",m,[(0,o.createVNode)(r.Z,{class:(0,o.normalizeClass)(["ml-4",{"opacity-25":(0,o.unref)(t).processing}]),disabled:(0,o.unref)(t).processing},{default:(0,o.withCtx)((function(){return[(0,o.createTextVNode)(" Confirm ")]})),_:1},8,["class","disabled"])])],40,d)]})),_:1})}}}}}]);