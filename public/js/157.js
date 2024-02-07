"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[157],{3744:(e,t)=>{t.Z=(e,t)=>{const r=e.__vccOpts||e;for(const[e,o]of t)r[e]=o;return r}},7887:(e,t,r)=>{r.d(t,{Z:()=>a});var o=r(821),l=["value"];const a={__name:"Input",props:["modelValue"],emits:["update:modelValue"],setup:function(e){var t=(0,o.ref)(null);return(0,o.onMounted)((function(){t.value.hasAttribute("autofocus")&&t.value.focus()})),function(r,a){return(0,o.openBlock)(),(0,o.createElementBlock)("input",{class:"border-gray-300 dark:border-white/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm dark:bg-zinc-800",value:e.modelValue,onInput:a[0]||(a[0]=function(e){return r.$emit("update:modelValue",e.target.value)}),ref_key:"input",ref:t},null,40,l)}}}},1329:(e,t,r)=>{r.d(t,{Z:()=>s});var o=r(821),l={class:"block font-medium text-sm text-gray-700 dark:text-white/80"},a={key:0},n={key:1};const s={__name:"Label",props:["value"],setup:function(e){return function(t,r){return(0,o.openBlock)(),(0,o.createElementBlock)("label",l,[e.value?((0,o.openBlock)(),(0,o.createElementBlock)("span",a,(0,o.toDisplayString)(e.value),1)):((0,o.openBlock)(),(0,o.createElementBlock)("span",n,[(0,o.renderSlot)(t.$slots,"default")]))])}}}},6157:(e,t,r)=>{r.r(t),r.d(t,{default:()=>F});var o=r(821),l=(0,o.createElementVNode)("title",null,"\r\n            Users\r\n        ",-1),a={class:"px-4 py-2 border-b dark:border-b-black/50 sticky top-0 bg-white dark:bg-zinc-900 z-40 duration-300 ease-in-out"},n=(0,o.createElementVNode)("button",{class:"text-lg p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-700 dark:text-white dark:hover:bg-white/10"},[(0,o.createElementVNode)("span",null,[(0,o.createTextVNode)("Users "),(0,o.createElementVNode)("i",{class:"fa-solid fa-caret-down ml-2"})])],-1),s={class:"py-2"},c={class:"w-full dark:text-white text-left select-none"},d=(0,o.createElementVNode)("thead",{class:"border-b dark:border-white/30 sticky top-14 bg-white dark:bg-zinc-900 duration-300 ease-in-out"},[(0,o.createElementVNode)("tr",null,[(0,o.createElementVNode)("th",{class:"text-xs font-bold py-3 pl-4"},"Name"),(0,o.createElementVNode)("th",{class:"text-xs font-bold py-3"},"Role")])],-1),i=["onClick"],u={class:"py-2 pl-4"},m={class:"py-2"},p={class:"relative bg-white dark:bg-zinc-900 w-full lg:w-1/3 h-auto max-h-[80%] p-6 rounded-lg dark:text-white overflow-auto"},f=(0,o.createElementVNode)("span",{class:"font-bold text-lg block mb-2"},"New user",-1),k={class:"grid grid-flow-col space-x-2"},V={key:0,class:"text-xs text-red-500"},b={key:0,class:"text-xs text-red-500"},v={class:"mt-4"},N={class:"mt-4 grid grid-flow-col space-x-2"},w={key:0,class:"text-xs text-red-500"},y={key:0,class:"text-xs text-red-500"},g={class:"mt-4"},x={key:0,class:"text-xs text-red-500"},h={class:"mt-4"},E=(0,o.createElementVNode)("option",{value:"",selected:"",hidden:"",disabled:""},"Select one",-1),B=["value"],_={key:0,class:"text-xs text-red-500"},C={class:"mt-4 grid grid-flow-col space-x-2"},S={key:0,class:"text-xs text-red-500"},U={key:0,class:"text-xs text-red-500"},D={class:"mt-6 flex justify-end space-x-2"},z=["disabled"],M={key:0,class:"fixed inset-0 z-40 bg-black/50 backdrop-blur-md"};var q=r(2343),Z=r(7887),L=r(1329),j=r(9038);const A={components:{Dropdown:q.Z,BreezeInput:Z.Z,BreezeLabel:L.Z,Head:j.Fb},data:function(){return{showNewUserModal:!1}},props:{users:Object,roles:Object,errors:Object},methods:{},setup:function(){return{form:(0,j.cI)({first_name:"",middle_name:"",last_name:"",birthday:"",address:"",contact:"",role_id:"",email:"",password:""})}}};const F=(0,r(3744).Z)(A,[["render",function(e,t,r,q,Z,L){var j=this,A=(0,o.resolveComponent)("Head"),F=(0,o.resolveComponent)("Dropdown"),I=(0,o.resolveComponent)("BreezeLabel"),O=(0,o.resolveComponent)("BreezeInput");return(0,o.openBlock)(),(0,o.createElementBlock)(o.Fragment,null,[(0,o.createVNode)(A,null,{default:(0,o.withCtx)((function(){return[l]})),_:1}),(0,o.createElementVNode)("div",a,[(0,o.createVNode)(F,{align:"left"},{trigger:(0,o.withCtx)((function(){return[n]})),content:(0,o.withCtx)((function(){return[(0,o.createElementVNode)("div",s,[(0,o.createElementVNode)("div",{onClick:t[0]||(t[0]=function(e){return j.showNewUserModal=!0}),class:"text-sm px-4 p-1 dark:text-white cursor-pointer hover:bg-black/10 dark:hover:bg-white/20"}," Add new user ")])]})),_:1})]),(0,o.createElementVNode)("div",null,[(0,o.createElementVNode)("table",c,[d,(0,o.createElementVNode)("tbody",null,[((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)(r.users,(function(t){var r;return(0,o.openBlock)(),(0,o.createElementBlock)("tr",{onClick:function(r){return j.$inertia.get(e.route("users.show",t.id))},class:"text-sm border-b dark:border-white/30 hover:bg-black/10 dark:hover:bg-white/20 cursor-pointer"},[(0,o.createElementVNode)("td",u,(0,o.toDisplayString)(t.full_name),1),(0,o.createElementVNode)("td",m,(0,o.toDisplayString)((null===(r=t.role)||void 0===r?void 0:r.name)||"Unassigned"),1)],8,i)})),256))])])]),(0,o.createElementVNode)("div",null,[(0,o.createVNode)(o.Transition,{"enter-active-class":"duration-200 ease-out","enter-from-class":"transform opacity-0 scale-75","enter-to-class":"opacity-100 scale-100","leave-active-class":"duration-200 ease-out","leave-from-class":"opacity-100 scale-100","leave-to-class":"transform opacity-0 scale-75"},{default:(0,o.withCtx)((function(){return[Z.showNewUserModal?((0,o.openBlock)(),(0,o.createElementBlock)("div",{key:0,class:"inset-0 fixed z-50 h-screen w-screen flex justify-center items-center",onClick:t[12]||(t[12]=(0,o.withModifiers)((function(e){return j.showNewUserModal=!1}),["self"]))},[(0,o.createElementVNode)("div",p,[f,(0,o.createElementVNode)("form",{onSubmit:t[11]||(t[11]=(0,o.withModifiers)((function(t){return q.form.post(e.route("users.store"),{onSuccess:function(){return j.showNewUserModal=!!r.errors.length},preserveState:!0,preserveScroll:!0})}),["prevent"]))},[(0,o.createElementVNode)("div",k,[(0,o.createElementVNode)("div",null,[(0,o.createVNode)(I,{for:"first_name",value:"First name"}),(0,o.createVNode)(O,{id:"first_name",type:"text",class:"mt-1 block w-full",modelValue:q.form.first_name,"onUpdate:modelValue":t[1]||(t[1]=function(e){return q.form.first_name=e}),required:"",autofocus:""},null,8,["modelValue"]),r.errors.first_name?((0,o.openBlock)(),(0,o.createElementBlock)("span",V,(0,o.toDisplayString)(r.errors.first_name),1)):(0,o.createCommentVNode)("",!0)]),(0,o.createElementVNode)("div",null,[(0,o.createVNode)(I,{for:"last_name",value:"Last name"}),(0,o.createVNode)(O,{id:"last_name",type:"text",class:"mt-1 block w-full",modelValue:q.form.last_name,"onUpdate:modelValue":t[2]||(t[2]=function(e){return q.form.last_name=e}),required:""},null,8,["modelValue"]),r.errors.last_name?((0,o.openBlock)(),(0,o.createElementBlock)("span",b,(0,o.toDisplayString)(r.errors.last_name),1)):(0,o.createCommentVNode)("",!0)])]),(0,o.createElementVNode)("div",v,[(0,o.createVNode)(I,{for:"middle_name",value:"Middle name"}),(0,o.createVNode)(O,{id:"middle_name",type:"text",class:"mt-1 block w-full",modelValue:q.form.middle_name,"onUpdate:modelValue":t[3]||(t[3]=function(e){return q.form.middle_name=e})},null,8,["modelValue"])]),(0,o.createElementVNode)("div",N,[(0,o.createElementVNode)("div",null,[(0,o.createVNode)(I,{for:"birthday",value:"Birthday"}),(0,o.createVNode)(O,{id:"birthday",type:"date",class:"mt-1 block w-full dark:text-white/70",modelValue:q.form.birthday,"onUpdate:modelValue":t[4]||(t[4]=function(e){return q.form.birthday=e}),required:""},null,8,["modelValue"]),r.errors.birthday?((0,o.openBlock)(),(0,o.createElementBlock)("span",w,(0,o.toDisplayString)(r.errors.birthday),1)):(0,o.createCommentVNode)("",!0)]),(0,o.createElementVNode)("div",null,[(0,o.createVNode)(I,{for:"contact",value:"Contact number"}),(0,o.createVNode)(O,{id:"contact",type:"text",class:"mt-1 block w-full",modelValue:q.form.contact,"onUpdate:modelValue":t[5]||(t[5]=function(e){return q.form.contact=e}),required:""},null,8,["modelValue"]),r.errors.contact?((0,o.openBlock)(),(0,o.createElementBlock)("span",y,(0,o.toDisplayString)(r.errors.contact),1)):(0,o.createCommentVNode)("",!0)])]),(0,o.createElementVNode)("div",g,[(0,o.createVNode)(I,{for:"Address",value:"Address"}),(0,o.createVNode)(O,{id:"Address",type:"text",class:"mt-1 block w-full",modelValue:q.form.address,"onUpdate:modelValue":t[6]||(t[6]=function(e){return q.form.address=e}),required:""},null,8,["modelValue"]),r.errors.address?((0,o.openBlock)(),(0,o.createElementBlock)("span",x,(0,o.toDisplayString)(r.errors.address),1)):(0,o.createCommentVNode)("",!0)]),(0,o.createElementVNode)("div",h,[(0,o.createVNode)(I,{for:"role",value:"Role"}),(0,o.withDirectives)((0,o.createElementVNode)("select",{id:"role","onUpdate:modelValue":t[7]||(t[7]=function(e){return q.form.role_id=e}),required:"",class:"block rounded-lg dark:bg-zinc-800 text-sm dark:text-white/70 text-gray-700 border-gray-300 dark:border-white/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm mt-2 w-full"},[E,((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)(r.roles,(function(e){return(0,o.openBlock)(),(0,o.createElementBlock)("option",{value:e.id},(0,o.toDisplayString)(e.name),9,B)})),256))],512),[[o.vModelSelect,q.form.role_id]]),r.errors.role_id?((0,o.openBlock)(),(0,o.createElementBlock)("span",_,(0,o.toDisplayString)(r.errors.role_id),1)):(0,o.createCommentVNode)("",!0)]),(0,o.createElementVNode)("div",C,[(0,o.createElementVNode)("div",null,[(0,o.createVNode)(I,{for:"email",value:"Email"}),(0,o.createVNode)(O,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:q.form.email,"onUpdate:modelValue":t[8]||(t[8]=function(e){return q.form.email=e}),required:""},null,8,["modelValue"]),r.errors.email?((0,o.openBlock)(),(0,o.createElementBlock)("span",S,(0,o.toDisplayString)(r.errors.email),1)):(0,o.createCommentVNode)("",!0)]),(0,o.createElementVNode)("div",null,[(0,o.createVNode)(I,{for:"password",value:"Password"}),(0,o.createVNode)(O,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:q.form.password,"onUpdate:modelValue":t[9]||(t[9]=function(e){return q.form.password=e}),required:""},null,8,["modelValue"]),r.errors.password?((0,o.openBlock)(),(0,o.createElementBlock)("span",U,(0,o.toDisplayString)(r.errors.password),1)):(0,o.createCommentVNode)("",!0)])]),(0,o.createElementVNode)("div",D,[(0,o.createElementVNode)("button",{onClick:t[10]||(t[10]=function(e){return j.showNewUserModal=!1}),type:"button",class:"hover:underline dark:text-white/80"},"Cancel"),(0,o.createElementVNode)("button",{type:"submit",disabled:q.form.processing,class:(0,o.normalizeClass)([{"opacity-25":q.form.processing},"px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-sm rounded-lg"])},"Save",10,z)])],32)])])):(0,o.createCommentVNode)("",!0)]})),_:1}),(0,o.createVNode)(o.Transition,{"enter-active-class":"duration-200 ease opacity-0","enter-from-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"duration-200 ease opacity-90","leave-from-class":"opacity-90","leave-to-class":"transform opacity-0",appear:""},{default:(0,o.withCtx)((function(){return[Z.showNewUserModal?((0,o.openBlock)(),(0,o.createElementBlock)("div",M)):(0,o.createCommentVNode)("",!0)]})),_:1})])],64)}]])}}]);