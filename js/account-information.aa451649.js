(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["account-information"],{1492:function(t,e,s){"use strict";s("31db")},"31db":function(t,e,s){},"4fad":function(t,e,s){var a=s("23e7"),n=s("6f53").entries;a({target:"Object",stat:!0},{entries:function(t){return n(t)}})},9734:function(t,e,s){},c681:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"acc-info__div--main-container"},[s("div",{staticClass:"acc-info__div"},[s("h2",{directives:[{name:"t",rawName:"v-t",value:"settings.header",expression:"'settings.header'"}],staticClass:"acc-info__h2"}),s("v-form",{ref:"form",staticClass:"acc-info__form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[s("v-card",{staticClass:"acc-info__card"},[s("v-card-title",{directives:[{name:"t",rawName:"v-t",value:"settings.generalInf",expression:"'settings.generalInf'"}],staticClass:"acc-info__h3"}),s("v-card-text",[s("v-text-field",{attrs:{placeholder:t.$t("settings.name"),rules:[t.rules.required],clearable:""},model:{value:t.generalInfo.name,callback:function(e){t.$set(t.generalInfo,"name",e)},expression:"generalInfo.name"}}),s("v-text-field",{attrs:{placeholder:t.$t("settings.surname"),clearable:""},model:{value:t.generalInfo.surname,callback:function(e){t.$set(t.generalInfo,"surname",e)},expression:"generalInfo.surname"}}),s("div",{staticClass:"acc-info__div--multiple"},[s("v-text-field",{staticClass:"acc-info__input--multiple-left",attrs:{placeholder:t.$t("common.email"),type:"email",rules:[t.rules.required],clearable:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),s("v-text-field",{staticClass:"acc-info__input--multiple-right",attrs:{placeholder:t.$t("settings.phone"),type:"number",rules:[t.rules.required],clearable:""},model:{value:t.generalInfo.number,callback:function(e){t.$set(t.generalInfo,"number",e)},expression:"generalInfo.number"}})],1),s("v-autocomplete",{attrs:{items:t.attributesOptions,chips:"","small-chips":"",label:t.$t("settings.chooseCategory"),multiple:"","deletable-chips":"",clearable:"",solo:"",rules:[t.attributesRequired]},model:{value:t.generalInfo.attributes,callback:function(e){t.$set(t.generalInfo,"attributes",e)},expression:"generalInfo.attributes"}}),t.canNotGeoLocateUser?s("v-tooltip",{attrs:{left:"","max-width":"90%"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("div",t._g({},a),[s("v-switch",{attrs:{disabled:"",label:t.$t("settings.visible"),color:"#6CBD6F","hide-details":"",inset:""},model:{value:t.generalInfo.activeUser,callback:function(e){t.$set(t.generalInfo,"activeUser",e)},expression:"generalInfo.activeUser"}})],1)]}}],null,!1,3800056750)},[s("span",[t._v(t._s(t.$t("settings.visibleError")))])]):s("v-switch",{attrs:{label:t.$t("settings.visible"),color:"#6CBD6F","hide-details":"",inset:""},model:{value:t.generalInfo.activeUser,callback:function(e){t.$set(t.generalInfo,"activeUser",e)},expression:"generalInfo.activeUser"}}),s("v-switch",{attrs:{label:t.$t("common.showEmail"),rules:[t.evenOneContactMethodEnabled],color:"#6CBD6F",inset:""},model:{value:t.generalInfo.showEmail,callback:function(e){t.$set(t.generalInfo,"showEmail",e)},expression:"generalInfo.showEmail"}}),t.generalInfo.number?s("v-switch",{attrs:{rules:[t.evenOneContactMethodEnabled],label:t.$t("common.showPhone"),color:"#6CBD6F",inset:""},model:{value:t.generalInfo.showPhoneNumber,callback:function(e){t.$set(t.generalInfo,"showPhoneNumber",e)},expression:"generalInfo.showPhoneNumber"}}):t._e()],1)],1),s("v-card",{staticClass:"acc-info__card"},[s("v-card-title",{directives:[{name:"t",rawName:"v-t",value:"settings.addressInf",expression:"'settings.addressInf'"}],staticClass:"acc-info__h3"}),s("v-card-text",[s("p",[t._v(" "+t._s(t.$t("settings.privacyInfo"))+" ")]),s("v-switch",{attrs:{label:t.$t("settings.addressVisible"),color:"#6CBD6F","hide-details":"",inset:""},model:{value:t.address.showAddress,callback:function(e){t.$set(t.address,"showAddress",e)},expression:"address.showAddress"}}),t.address.showAddress||t.canNotGeoLocateUser?s("div",[s("div",{staticClass:"acc-info__div--multiple"},[s("v-text-field",{staticClass:"acc-info__input--multiple-left",attrs:{placeholder:t.$t("address.street"),clearable:"",rules:[t.streetRequired]},model:{value:t.address.street,callback:function(e){t.$set(t.address,"street",e)},expression:"address.street"}}),s("v-text-field",{staticClass:"acc-info__input--multiple-right",attrs:{placeholder:t.$t("address.streetNum"),rules:[t.houseNumberRequired],clearable:""},model:{value:t.address.houseNumber,callback:function(e){t.$set(t.address,"houseNumber",e)},expression:"address.houseNumber"}})],1),s("div",{staticClass:"acc-info__div--multiple"},[s("v-text-field",{staticClass:"acc-info__input--multiple-left",attrs:{placeholder:t.$t("address.zipCode"),clearable:""},model:{value:t.address.zipCode,callback:function(e){t.$set(t.address,"zipCode",e)},expression:"address.zipCode"}}),s("v-text-field",{staticClass:"acc-info__input--multiple-right",attrs:{placeholder:t.$t("address.city"),rules:[t.cityRequired],clearable:""},model:{value:t.address.city,callback:function(e){t.$set(t.address,"city",e)},expression:"address.city"}})],1),s("v-text-field",{attrs:{placeholder:t.$t("address.country"),rules:[t.countryRequired],clearable:""},model:{value:t.address.country,callback:function(e){t.$set(t.address,"country",e)},expression:"address.country"}})],1):t._e()],1)],1),t._e(),s("v-card",{staticClass:"acc-info__card"},[s("v-card-title",{directives:[{name:"t",rawName:"v-t",value:"settings.changePass",expression:"'settings.changePass'"}],staticClass:"acc-info__h3"}),s("v-card-text",[s("v-text-field",{attrs:{placeholder:t.$t("common.password"),type:"password",rules:[t.passwordConfirmationRule]},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),s("v-text-field",{attrs:{placeholder:t.$t("createAccountEmail.confirmPassword"),type:"password",rules:[t.passwordConfirmationRule]},model:{value:t.confirmPassword,callback:function(e){t.confirmPassword=e},expression:"confirmPassword"}})],1)],1)],1),s("v-btn",{directives:[{name:"t",rawName:"v-t",value:"settings.action",expression:"'settings.action'"}],staticClass:"acc-info__button text-uppercase",attrs:{color:"#C5E1A5"},on:{click:t.save}})],1)])},n=[],i=s("3835"),r=s("1da1"),o=s("5530"),c=(s("99af"),s("159b"),s("4fad"),s("96cf"),s("755e")),l=s("2f62"),d=s("dc59"),u=s("c9d9"),h={name:"AccountInformation",props:{alreadyCreated:{type:Boolean,default:!1}},mounted:function(){var t=this;if(this.userInformation.generalInfo&&this.userInformation.address&&(this.userInformation.socialMedia||this.userInformation.coordinates))if(null!==JSON.parse(localStorage.getItem("nh-user-information"))){var e=JSON.parse(localStorage.getItem("nh-user-information")),s=e.generalInfo,a=e.address,n=e.socialMedia,i=e.location;this.generalInfo=Object(o["a"])({},s),this.address=Object(o["a"])({},a),this.socialMedia=Object(o["a"])({},n),this.location=Object(o["a"])({},i)}else this.SET_INFO_SNACK(this.$t("notifications.provideInfo"));else this.generalInfo=Object(o["a"])({},this.userInformation.generalInfo),this.address=Object(o["a"])({},this.userInformation.address),this.socialMedia=Object(o["a"])({},this.userInformation.socialMedia),this.location=Object(o["a"])({},this.userInformation.location);this.email=this.userInformation.email||localStorage.getItem("nh-user-information-mail"),navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(s){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.newLocation.lat=s.coords.latitude,t.newLocation.lng=s.coords.longitude,e.next=4,t.getGeocodeAddress();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),this.isLocalizationEmpty&&this.isAddressEmpty&&(this.generalInfo.activeUser=!1)},computed:Object(o["a"])(Object(o["a"])({},Object(l["d"])("user",["userUID","userInformation","userObject"])),{},{google:c["gmapApi"],passwordConfirmationRule:function(){var t=this;return function(){return t.password===t.confirmPassword||"Password doesn't match."}},attributesRequired:function(){var t=this;return function(){return!!t.generalInfo.attributes.length||"Required"}},fullAddress:function(){return this.address.flatNumber?"".concat(this.address.street," ").concat(this.address.houseNumber,"/").concat(this.address.flatNumber,", ").concat(this.address.zipCode,", ").concat(this.address.city,", ").concat(this.address.country):"".concat(this.address.street," ").concat(this.address.houseNumber,", ").concat(this.address.zipCode,", ").concat(this.address.city,", ").concat(this.address.country)},evenOneContactMethodEnabled:function(){var t=this;return function(){return t.generalInfo.showPhoneNumber||t.generalInfo.showEmail||"At least one contact method should be enabled if account is public"}},streetRequired:function(){return!this.isLocalizationEmpty||(!!this.address.street||this.addressError)},houseNumberRequired:function(){return!this.isLocalizationEmpty||(!!this.address.houseNumber||this.addressError)},cityRequired:function(){return!this.isLocalizationEmpty||(!!this.address.city||this.addressError)},countryRequired:function(){return!this.isLocalizationEmpty||(!!this.address.houseNumber||this.addressError)},attributesOptions:function(){return[{value:0,text:this.$i18n.t("settings.categories.cat:0")},{value:10,text:this.$i18n.t("settings.categories.cat:10")},{value:20,text:this.$i18n.t("settings.categories.cat:20")},{value:30,text:this.$i18n.t("settings.categories.cat:30")},{value:31,text:this.$i18n.t("settings.categories.cat:31")},{value:40,text:this.$i18n.t("settings.categories.cat:40")},{value:50,text:this.$i18n.t("settings.categories.cat:50")},{value:60,text:this.$i18n.t("settings.categories.cat:60")}]},isAddressEmpty:function(){return!(this.address.street&&this.address.houseNumber&&this.address.city&&this.address.country)},canNotGeoLocateUser:function(){return this.isLocalizationEmpty&&this.isAddressEmpty},isLocalizationEmpty:function(){return!this.location.lat&&!this.location.lng&&!this.newLocation.lat&&!this.newLocation.lng}}),watch:{userUID:function(t){t||this.$router.push({name:"Home"})}},data:function(){return{generalInfo:{name:"",surname:"",phone:"",attributes:[],showEmail:!1,showPhoneNumber:!0,activeUser:!0},address:{street:"",houseNumber:"",zipCode:"",city:"",country:"",showAddress:!1},location:{lat:null,lng:null},newLocation:{lat:null,lng:null},socialMedia:{facebook:""},email:"",password:"",confirmPassword:"",valid:!0,rules:{required:function(t){return!!t||"Required."}},addressError:"This field is required, as we can not get you position. We can get your position based on address or enable localization."}},methods:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(l["c"])("notification",["SET_SUCCESS_SNACK","SET_INFO_SNACK","SET_ERROR_SNACK"])),Object(l["c"])("user",["SET_USER_INFORMATION"])),{},{save:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.$refs.form.validate(),t.valid){e.next=4;break}return t.SET_ERROR_SNACK(t.$t("notifications.requiredError")),e.abrupt("return");case 4:return e.next=6,t.changeEmail();case 6:return e.next=8,t.changePassword();case 8:if(!t.newLocation.lat||!t.newLocation.lng||t.newLocation.lat===t.location.lat||t.newLocation.lng===t.location.lng){e.next=13;break}return e.next=11,t.setToFirestore(t.newLocation.lat,t.newLocation.lng);case 11:e.next=14;break;case 13:t.location.lat||t.location.lng||t.$gmapApiPromiseLazy().then((function(){var e=new t.google.maps.Geocoder,s=t.fullAddress;e.geocode({address:s},function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(s,a){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n="OK"===a?s[0]:null,i=n.geometry,e.next=3,t.setToFirestore(i.location.lat(),i.location.lng());case 3:case"end":return e.stop()}}),e)})));return function(t,s){return e.apply(this,arguments)}}())}));case 14:case"end":return e.stop()}}),e)})))()},setToFirestore:function(t,e){var s=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(null==t&&null==e){a.next=15;break}return a.prev=1,n={generalInfo:s.generalInfo,address:s.address,socialMedia:s.socialMedia,email:s.email,coordinates:new d["a"].firebase.firestore.GeoPoint(t,e)},a.next=5,d["a"].geocollection.doc(s.userUID).set(n);case 5:s.SET_SUCCESS_SNACK(s.$t("notifications.accUpdates")),s.SET_USER_INFORMATION(n),localStorage.setItem("nh-user-information",JSON.stringify(n)),a.next=13;break;case 10:a.prev=10,a.t0=a["catch"](1),s.SET_ERROR_SNACK(a.t0.message);case 13:a.next=16;break;case 15:s.SET_ERROR_SNACK("Some error occur during geocoding!");case 16:case"end":return a.stop()}}),a,null,[[1,10]])})))()},getGeocodeAddress:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.$gmapApiPromiseLazy().then((function(){var e=new t.google.maps.Geocoder;e.geocode({location:{lat:t.newLocation.lat,lng:t.newLocation.lng}},(function(e,s){"OK"===s&&e[0].address_components.forEach((function(e){for(var s=function(){var s=Object(i["a"])(n[a],2),r=s[0],o=s[1];if(e.types.every((function(t,e){return t===o[e]})))return t.address[r]=e.long_name,"break"},a=0,n=Object.entries(u["a"]);a<n.length;a++){var r=s();if("break"===r)break}}))}))}));case 1:case"end":return e.stop()}}),e)})))()},changeEmail:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.userObject.email===t.email||t.email){e.next=9;break}return e.prev=1,e.next=4,d["a"].auth.user.updateEmail(t.email);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](1),t.SET_ERROR_SNACK(e.t0.message);case 9:case"end":return e.stop()}}),e,null,[[1,6]])})))()},changePassword:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.password||!t.confirmPassword){e.next=11;break}return e.prev=1,e.next=4,d["a"].auth.currentUser.updatePassword(t.password);case 4:t.password="",t.confirmPassword="",e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),t.SET_ERROR_SNACK(e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})))()}})},f=h,m=(s("1492"),s("2877")),p=s("6544"),v=s.n(p),g=s("c6a6"),b=s("8336"),w=s("b0af"),x=s("99d9"),_=s("4bd4"),I=s("b73d"),y=s("8654"),C=s("ade3"),O=(s("a9e3"),s("9734"),s("4ad4")),E=s("a9ad"),R=s("16b7"),$=s("b848"),A=s("f573"),N=s("f2e7"),k=s("80d2"),S=s("d9bd"),j=s("58df"),T=Object(j["a"])(E["a"],R["a"],$["a"],A["a"],N["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,s=t.content,a=!this.bottom&&!this.left&&!this.top&&!this.right,n=!1!==this.attach?e.offsetLeft:e.left,i=0;return this.top||this.bottom||a?i=n+e.width/2-s.width/2:(this.left||this.right)&&(i=n+(this.right?e.width:-s.width)+(this.right?10:-10)),this.nudgeLeft&&(i-=parseInt(this.nudgeLeft)),this.nudgeRight&&(i+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(i,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,s=t.content,a=!1!==this.attach?e.offsetTop:e.top,n=0;return this.top||this.bottom?n=a+(this.bottom?e.height:-s.height)+(this.bottom?10:-10):(this.left||this.right)&&(n=a+e.height/2-s.height/2),this.nudgeTop&&(n-=parseInt(this.nudgeTop)),this.nudgeBottom&&(n+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(n+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(k["f"])(this.maxWidth),minWidth:Object(k["f"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(k["o"])(this,"activator",!0)&&Object(S["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=O["a"].options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===k["r"].esc&&(t.getActivator(e),t.runDelay("close"))},e},genActivatorAttributes:function(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition:function(){var t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(C["a"])(t,this.contentClass,!0),Object(C["a"])(t,"menuable__content__active",this.isActive),Object(C["a"])(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}}),L=Object(m["a"])(f,a,n,!1,null,"5c046c51",null);e["default"]=L.exports;v()(L,{VAutocomplete:g["a"],VBtn:b["a"],VCard:w["a"],VCardText:x["c"],VCardTitle:x["d"],VForm:_["a"],VSwitch:I["a"],VTextField:y["a"],VTooltip:T})}}]);
//# sourceMappingURL=account-information.aa451649.js.map