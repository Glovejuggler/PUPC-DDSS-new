(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Files_Index_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/InfiniteScroll.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/InfiniteScroll.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    loadMore: Function
  },
  data: function data() {
    return {
      loading: false
    };
  },
  mounted: function mounted() {
    var _this = this;
    window.addEventListener('scroll', lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(function (e) {
      var _window$innerHeight;
      var pixelsFromBottom = document.documentElement.offsetHeight - document.documentElement.scrollTop - ((_window$innerHeight = window.innerHeight) !== null && _window$innerHeight !== void 0 ? _window$innerHeight : screen.height);
      if (pixelsFromBottom < 200 && !_this.loading) {
        _this.loading = true;
        _this.loadMore()["finally"](function () {
          return _this.loading = false;
        });
      }
    }, 100));
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Input.vue?vue&type=script&setup=true&lang=js":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Input.vue?vue&type=script&setup=true&lang=js ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'Input',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup: function setup(__props, _ref) {
    var expose = _ref.expose;
    expose();
    var input = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
      }
    });
    var __returned__ = {
      input: input,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Files/Index.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Files/Index.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia-vue3 */ "./node_modules/@inertiajs/inertia-vue3/dist/index.js");
/* harmony import */ var _Components_Input_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/Input.vue */ "./resources/js/Components/Input.vue");
/* harmony import */ var _Components_Dropdown_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/Dropdown.vue */ "./resources/js/Components/Dropdown.vue");
/* harmony import */ var _Components_InfiniteScroll_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/InfiniteScroll.vue */ "./resources/js/Components/InfiniteScroll.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Head: _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.Head,
    useForm: _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.useForm,
    BreezeInput: _Components_Input_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    Dropdown: _Components_Dropdown_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    InfiniteScroll: _Components_InfiniteScroll_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    Link: _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.Link
  },
  data: function data() {
    return {
      view: localStorage.getItem('view'),
      showAddFolderModal: false,
      selectedFolder: '',
      selectedFile: '',
      visibleFiles: this.files,
      context: false,
      showRenameFileModal: false,
      showRenameFolderModal: false,
      showShareModal: false,
      showDeleteFileModal: false,
      showDeleteFolderModal: false,
      temp: '',
      tempIndex: '',
      moveFolders: '',
      showMoveFileModal: false,
      showMoveFolderModal: false,
      loading: false,
      moveFolderChild: '',
      moveFolderParent: '',
      currentFolder: ''
    };
  },
  props: {
    folder_id: Number,
    files: Object,
    folders: Object,
    ancestors: Object,
    roles: Object,
    users: Object,
    errors: Object
  },
  methods: {
    toggleView: function toggleView() {
      this.view = localStorage.getItem('view') === 'list' ? 'grid' : 'list';
      localStorage.setItem('view', this.view);
    },
    folderSelect: function folderSelect(folder) {
      this.selectedFolder = folder;
    },
    fileSelect: function fileSelect(file, index) {
      this.selectedFile = file;
      this.tempIndex = index;
    },
    unselect: function unselect() {
      this.selectedFolder = null;
      this.selectedFile = null;
      this.fileOptions = false;
      this.context = false;
    },
    humanFileSize: function humanFileSize(size) {
      var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
      return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    },
    loadMoreFiles: function loadMoreFiles() {
      var _this = this;
      if (!this.visibleFiles.next_page_url) {
        return Promise.resolve();
      }
      return axios__WEBPACK_IMPORTED_MODULE_4___default().get(this.visibleFiles.next_page_url).then(function (response) {
        _this.visibleFiles = _objectSpread(_objectSpread({}, response.data), {}, {
          data: [].concat(_toConsumableArray(_this.visibleFiles.data), _toConsumableArray(response.data.data))
        });
      });
    },
    contextMenu: function contextMenu(event) {
      if (event.clientX < window.innerWidth - 192) {
        document.querySelector('#context').style.left = "".concat(event.clientX, "px");
      } else {
        document.querySelector('#context').style.left = "".concat(event.clientX - 192, "px");
      }
      if (event.clientY < window.innerHeight - 190) {
        document.querySelector('#context').style.top = "".concat(event.clientY, "px");
      } else {
        document.querySelector('#context').style.top = "".concat(event.clientY - 190, "px");
      }
      this.context = true;
    },
    renameFile: function renameFile() {
      this.temp = this.selectedFile;
      this.renameFileForm.name = this.temp.name;
      this.showRenameFileModal = true;
    },
    renameFolder: function renameFolder() {
      this.temp = this.selectedFolder;
      this.renameFolderForm.name = this.temp.name;
      this.showRenameFolderModal = true;
    },
    shareFile: function shareFile() {
      var _this2 = this;
      this.temp = this.selectedFile;
      this.showShareModal = true;
      this.shareForm.type = 'App\\Models\\File';
      this.context = false;
      this.temp.shares.forEach(function (share) {
        if (share.subject_type === "App\\Models\\User") {
          _this2.shareForm.user.push(share.subject_id);
        } else if (share.subject_type === 'App\\Models\\Role') {
          _this2.shareForm.role.push(share.subject_id);
        }
      });
    },
    shareFolder: function shareFolder() {
      var _this3 = this;
      this.temp = this.selectedFolder;
      this.showShareModal = true;
      this.shareForm.type = 'App\\Models\\Folder';
      this.context = false;
      this.temp.shares.forEach(function (share) {
        if (share.subject_type === "App\\Models\\User") {
          _this3.shareForm.user.push(share.subject_id);
        } else if (share.subject_type === 'App\\Models\\Role') {
          _this3.shareForm.role.push(share.subject_id);
        }
      });
    },
    deleteFile: function deleteFile() {
      this.temp = this.selectedFile;
      this.showDeleteFileModal = true;
      this.context = false;
    },
    deleteFolder: function deleteFolder() {
      this.temp = this.selectedFolder;
      this.showDeleteFolderModal = true;
      this.context = false;
    },
    moveFile: function moveFile() {
      var _this4 = this;
      this.temp = this.selectedFile;
      this.context = false;
      this.moveFolderChild = null;
      this.moveForm.to = this.moveFolderChild;
      if (!this.moveFolders) {
        this.loading = true;
        axios__WEBPACK_IMPORTED_MODULE_4___default().get('/folders').then(function (response) {
          _this4.moveFolders = response.data.folders;
          _this4.moveFolderParent = response.data.parent;
        })["finally"](function () {
          return _this4.loading = false;
        });
      }
      this.showMoveFileModal = true;
    },
    moveFolder: function moveFolder() {
      var _this5 = this;
      this.temp = this.selectedFolder;
      this.context = false;
      this.moveFolderChild = null;
      this.moveForm.to = this.moveFolderChild;
      if (!this.moveFolders) {
        this.loading = true;
        axios__WEBPACK_IMPORTED_MODULE_4___default().get('/folders').then(function (response) {
          _this5.moveFolders = response.data.folders;
          _this5.moveFolderParent = response.data.parent;
        })["finally"](function () {
          return _this5.loading = false;
        });
      }
      this.showMoveFolderModal = true;
    },
    goToFolder: function goToFolder(folder) {
      var _this6 = this;
      this.loading = true;
      this.moveFolderChild = folder;
      this.moveForm.to = this.moveFolderChild;
      axios__WEBPACK_IMPORTED_MODULE_4___default().get(route('folders.index', folder)).then(function (response) {
        _this6.moveFolders = response.data.folders;
        _this6.moveFolderParent = response.data.parent;
      })["finally"](function () {
        return _this6.loading = false;
      });
    }
  },
  setup: function setup(props) {
    var folderform = (0,_inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.useForm)({
      folder_id: props.folder_id === 0 ? null : props.folder_id,
      name: ''
    });
    var form = (0,_inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.useForm)({
      folder_id: props.folder_id === 0 ? null : props.folder_id,
      file: []
    });
    function submit() {
      form.post(route('files.upload'), {
        preserveScroll: true,
        preserveState: false,
        onSuccess: function onSuccess() {
          return form.reset('file');
        },
        onCancel: function onCancel() {
          return form.reset('file');
        }
      });
    }

    // rename file
    var renameFileForm = (0,_inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.useForm)({
      name: ''
    });

    // rename folder
    var renameFolderForm = (0,_inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.useForm)({
      name: ''
    });
    var shareForm = (0,_inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.useForm)({
      type: '',
      role: [],
      user: []
    });
    var moveForm = (0,_inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.useForm)({
      to: ''
    });
    return {
      folderform: folderform,
      form: form,
      submit: submit,
      renameFileForm: renameFileForm,
      renameFolderForm: renameFolderForm,
      shareForm: shareForm,
      moveForm: moveForm
    };
  },
  mounted: function mounted() {
    document.body.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    document.body.addEventListener('drop', function (ev) {
      console.log(ev.dataTransfer);
      ev.preventDefault();
      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        _toConsumableArray(ev.dataTransfer.items).forEach(function (item, i) {
          // If dropped items aren't files, reject them
          if (item.kind === 'file') {
            var file = item.getAsFile();
            console.log("\u2026 file[".concat(i, "].name = ").concat(file.name));
          }
        });
      } else {
        // Use DataTransfer interface to access the file(s)
        _toConsumableArray(ev.dataTransfer.files).forEach(function (file, i) {
          console.log("\u2026 file[".concat(i, "].name = ").concat(file.name));
        });
      }
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/InfiniteScroll.vue?vue&type=template&id=d1c55ee8":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/InfiniteScroll.vue?vue&type=template&id=d1c55ee8 ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  key: 0,
  "class": "mt-4 pb-8 text-center"
};
var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-spinner animate-spin text-3xl text-gray-800 dark:text-white/50"
}, null, -1 /* HOISTED */);
var _hoisted_3 = [_hoisted_2];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default")]), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, _hoisted_3)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Input.vue?vue&type=template&id=43da0f8f":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Input.vue?vue&type=template&id=43da0f8f ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = ["value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("input", {
    "class": "border-gray-300 dark:border-white/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm dark:bg-zinc-800",
    value: $props.modelValue,
    onInput: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('update:modelValue', $event.target.value);
    }),
    ref: "input"
  }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Files/Index.vue?vue&type=template&id=67ce7f01":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Files/Index.vue?vue&type=template&id=67ce7f01 ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("title", null, "\r\n            Files\r\n        ", -1 /* HOISTED */);
var _hoisted_2 = {
  "class": "px-4 py-2 border-b dark:border-b-black/50 flex justify-between items-center sticky top-0 bg-white dark:bg-zinc-900 z-40 duration-300 ease-in-out"
};
var _hoisted_3 = {
  "class": "text-lg p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-700 dark:text-white dark:hover:bg-white/10 select-none"
};
var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-caret-down ml-2"
}, null, -1 /* HOISTED */);
var _hoisted_5 = {
  "class": "py-2 space-y-2"
};
var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  onclick: "document.querySelector('#fileupload').click();",
  "class": "text-sm dark:text-white px-4 p-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/20"
}, " Upload file ", -1 /* HOISTED */);
var _hoisted_7 = {
  "class": "flex flex-row-reverse space-x-2"
};
var _hoisted_8 = {
  key: 0,
  "class": "pb-8"
};
var _hoisted_9 = {
  key: 0
};
var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "dark:text-white/80 px-4 mt-8 font-bold"
}, " Folders ", -1 /* HOISTED */);
var _hoisted_11 = {
  "class": "grid gap-2 grid-cols-6 px-4 mt-8"
};
var _hoisted_12 = ["onFocusin", "onDblclick"];
var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-folder w-8 text-xl mr-2 text-gray-800 dark:text-white"
}, null, -1 /* HOISTED */);
var _hoisted_14 = {
  key: 1
};
var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "dark:text-white/80 px-4 mt-8 font-bold"
}, " Files ", -1 /* HOISTED */);
var _hoisted_16 = {
  "class": "grid gap-2 lg:grid-cols-6 md:grid-cols-5 grid-cols-3 px-4 mt-8"
};
var _hoisted_17 = ["onFocusin", "id"];
var _hoisted_18 = {
  "class": "w-full h-48 overflow-hidden"
};
var _hoisted_19 = ["src", "alt"];
var _hoisted_20 = {
  "class": "absolute bottom-0 bg-white dark:bg-zinc-900 dark:text-white text-sm w-full px-4 py-3 overflow-hidden text-ellipsis whitespace-nowrap"
};
var _hoisted_21 = {
  key: 1,
  "class": "pb-8"
};
var _hoisted_22 = {
  "class": "w-full dark:text-white text-left select-none"
};
var _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", {
  "class": "border-b dark:border-white/30 sticky top-14 bg-white dark:bg-zinc-800 duration-300 ease-in-out"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "text-xs font-bold py-3 pl-4"
}, "Name"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "text-xs font-bold py-3"
}, "Uploaded by"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "text-xs font-bold py-3"
}, "Date uploaded"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "text-xs font-bold py-3 pr-4"
}, "Size")])], -1 /* HOISTED */);
var _hoisted_24 = ["onFocusin", "onDblclick"];
var _hoisted_25 = {
  "class": "py-2 pl-4"
};
var _hoisted_26 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-folder w-6"
}, null, -1 /* HOISTED */);
var _hoisted_27 = {
  "class": "py-2"
};
var _hoisted_28 = {
  "class": "py-2"
};
var _hoisted_29 = {
  "class": "py-2 pr-4"
};
var _hoisted_30 = ["onFocusin"];
var _hoisted_31 = {
  "class": "py-2 pl-4"
};
var _hoisted_32 = {
  "class": "py-2"
};
var _hoisted_33 = {
  "class": "py-2"
};
var _hoisted_34 = {
  "class": "py-2 pr-4"
};
var _hoisted_35 = {
  key: 0,
  "class": "text-center dark:text-white/50 mt-8"
};
var _hoisted_36 = {
  "class": "relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white"
};
var _hoisted_37 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold text-lg block mb-2"
}, "New folder", -1 /* HOISTED */);
var _hoisted_38 = {
  "class": "mt-4"
};
var _hoisted_39 = {
  key: 0
};
var _hoisted_40 = {
  "class": "flex justify-end mt-6"
};
var _hoisted_41 = ["disabled"];
var _hoisted_42 = {
  key: 0,
  "class": "fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
};
var _hoisted_43 = {
  key: 1,
  "class": "fixed bottom-4 rounded-lg p-4 bg-white shadow-lg border dark:bg-zinc-900 dark:border-transparent w-64 right-4"
};
var _hoisted_44 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "dark:text-white"
}, "Uploading file(s)", -1 /* HOISTED */);
var _hoisted_45 = {
  "class": "mt-2 w-full rounded-full bg-zinc-600 h-1"
};
var _hoisted_46 = {
  "class": "flex justify-end mt-2"
};
var _hoisted_47 = {
  id: "context",
  "class": "bg-white dark:bg-zinc-800 rounded-lg shadow-md shadow-black/30 fixed w-48 z-50 py-2 origin-top"
};
var _hoisted_48 = {
  key: 0
};
var _hoisted_49 = ["href"];
var _hoisted_50 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-download w-8"
}, null, -1 /* HOISTED */);
var _hoisted_51 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-file-pen w-8"
}, null, -1 /* HOISTED */);
var _hoisted_52 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-arrows-up-down-left-right w-8"
}, null, -1 /* HOISTED */);
var _hoisted_53 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-share-from-square w-8"
}, null, -1 /* HOISTED */);
var _hoisted_54 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-trash w-8"
}, null, -1 /* HOISTED */);
var _hoisted_55 = {
  key: 1
};
var _hoisted_56 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-folder-open w-8"
}, null, -1 /* HOISTED */);
var _hoisted_57 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-file-pen w-8"
}, null, -1 /* HOISTED */);
var _hoisted_58 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-arrows-up-down-left-right w-8"
}, null, -1 /* HOISTED */);
var _hoisted_59 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-share-from-square w-8"
}, null, -1 /* HOISTED */);
var _hoisted_60 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-trash w-8"
}, null, -1 /* HOISTED */);
var _hoisted_61 = {
  "class": "relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white"
};
var _hoisted_62 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold text-lg block mb-2"
}, "Rename", -1 /* HOISTED */);
var _hoisted_63 = {
  "class": "mt-4"
};
var _hoisted_64 = {
  "class": "flex justify-end mt-6"
};
var _hoisted_65 = ["disabled"];
var _hoisted_66 = {
  key: 0,
  "class": "fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
};
var _hoisted_67 = {
  "class": "relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white"
};
var _hoisted_68 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold text-lg block mb-2"
}, "Rename", -1 /* HOISTED */);
var _hoisted_69 = {
  "class": "mt-4"
};
var _hoisted_70 = {
  "class": "flex justify-end mt-6"
};
var _hoisted_71 = ["disabled"];
var _hoisted_72 = {
  key: 0,
  "class": "fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
};
var _hoisted_73 = {
  "class": "relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white"
};
var _hoisted_74 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold text-lg block mb-2"
}, "Share", -1 /* HOISTED */);
var _hoisted_75 = {
  "class": "mt-4"
};
var _hoisted_76 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold"
}, "Roles", -1 /* HOISTED */);
var _hoisted_77 = {
  "class": "flex items-center"
};
var _hoisted_78 = ["id", "onUpdate:modelValue", "value"];
var _hoisted_79 = ["for"];
var _hoisted_80 = {
  "class": "mt-4"
};
var _hoisted_81 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold"
}, "Users", -1 /* HOISTED */);
var _hoisted_82 = {
  key: 0,
  "class": "flex items-center"
};
var _hoisted_83 = ["id", "onUpdate:modelValue", "value"];
var _hoisted_84 = ["for"];
var _hoisted_85 = {
  "class": "flex justify-end mt-6"
};
var _hoisted_86 = ["disabled"];
var _hoisted_87 = {
  key: 0,
  "class": "fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
};
var _hoisted_88 = {
  "class": "relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white"
};
var _hoisted_89 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold text-lg block mb-2"
}, "Move to", -1 /* HOISTED */);
var _hoisted_90 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-arrow-left"
}, null, -1 /* HOISTED */);
var _hoisted_91 = [_hoisted_90];
var _hoisted_92 = ["onClick"];
var _hoisted_93 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-folder w-8"
}, null, -1 /* HOISTED */);
var _hoisted_94 = {
  "class": "mt-4 flex justify-end"
};
var _hoisted_95 = ["disabled"];
var _hoisted_96 = {
  key: 0,
  "class": "fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
};
var _hoisted_97 = {
  "class": "relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white"
};
var _hoisted_98 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold text-lg block mb-2"
}, "Move to", -1 /* HOISTED */);
var _hoisted_99 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fa-solid fa-arrow-left"
}, null, -1 /* HOISTED */);
var _hoisted_100 = [_hoisted_99];
var _hoisted_101 = ["onClick"];
var _hoisted_102 = {
  "class": "mt-4 flex justify-end"
};
var _hoisted_103 = ["disabled"];
var _hoisted_104 = {
  key: 0,
  "class": "fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
};
var _hoisted_105 = {
  "class": "relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white"
};
var _hoisted_106 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold text-lg block mb-2"
}, "Confirmation", -1 /* HOISTED */);
var _hoisted_107 = {
  "class": "break-words"
};
var _hoisted_108 = {
  "class": "font-semibold"
};
var _hoisted_109 = {
  "class": "mt-4 flex justify-end space-x-2"
};
var _hoisted_110 = {
  key: 0,
  "class": "fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
};
var _hoisted_111 = {
  "class": "relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white"
};
var _hoisted_112 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "font-bold text-lg block mb-2"
}, "Confirmation", -1 /* HOISTED */);
var _hoisted_113 = {
  "class": "break-words"
};
var _hoisted_114 = {
  "class": "font-semibold"
};
var _hoisted_115 = {
  "class": "mt-4 flex justify-end space-x-2"
};
var _hoisted_116 = {
  key: 0,
  "class": "fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this,
    _$setup$form$progress;
  var _component_Head = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Head");
  var _component_Dropdown = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dropdown");
  var _component_InfiniteScroll = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InfiniteScroll");
  var _component_BreezeInput = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("BreezeInput");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Head, null, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_1];
    }),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dropdown, {
    align: "left"
  }, {
    trigger: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      var _$props$ancestors;
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$props$ancestors = $props.ancestors[$props.ancestors.length - 1]) !== null && _$props$ancestors !== void 0 ? _$props$ancestors : 'Files') + " ", 1 /* TEXT */), _hoisted_4])])];
    }),
    content: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return _this.showAddFolderModal = true;
        }),
        "class": "text-sm dark:text-white px-4 p-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/20"
      }, " New folder ")])];
    }),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.toggleView();
    }),
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$data.view === 'grid' ? 'fa-list' : 'fa-grip', "fa-solid dark:text-white dark:hover:bg-white/10 hover:bg-black/10 inline-flex items-center justify-center h-10 w-10 rounded-full cursor-pointer"]),
    id: "viewToggle"
  }, null, 2 /* CLASS */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Files "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InfiniteScroll, {
    loadMore: $options.loadMoreFiles
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.view === 'grid' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, [$props.folders.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_9, [_hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.folders, function (folder) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          onClick: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
            return $event.target.focus();
          }, ["self"])),
          tabindex: "-1",
          onContextmenu: _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
            return $options.contextMenu && $options.contextMenu.apply($options, arguments);
          }, ["prevent"])),
          onFocusin: function onFocusin($event) {
            return $options.folderSelect(folder);
          },
          onFocusout: _cache[4] || (_cache[4] = function () {
            return $options.unselect && $options.unselect.apply($options, arguments);
          }),
          onDblclick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
            return _this.$inertia.get(_ctx.route('files', folder.id));
          }, ["prevent"]),
          "class": "w-full group cursor-pointer select-none p-4 border border-black/30 dark:border-zinc-900 focus:bg-blue-100 focus:ring-blue-700 focus:ring-1 hover:bg-black/10 dark:hover:bg-white/5 dark:focus:bg-blue-900 dark:bg-zinc-900 dark:text-white rounded-lg text-sm text-ellipsis overflow-hidden flex items-center"
        }, [_hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */)], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_12);
      }), 256 /* UNKEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.visibleFiles.data.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_14, [_hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Grid "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.visibleFiles.data, function (file, index) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          onContextmenu: _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
            return $options.contextMenu && $options.contextMenu.apply($options, arguments);
          }, ["prevent"])),
          key: index,
          onClick: _cache[7] || (_cache[7] = function ($event) {
            return $event.target.focus();
          }),
          tabindex: "-1",
          onFocusin: function onFocusin($event) {
            return $options.fileSelect(file, index);
          },
          onFocusout: _cache[8] || (_cache[8] = function () {
            return $options.unselect && $options.unselect.apply($options, arguments);
          }),
          id: "file".concat(file.id),
          "class": "w-full h-56 overflow-hidden border border-black/30 focus:ring-blue-700 focus:ring-1 dark:border-zinc-900 [&>div:nth-child(2)]:dark:focus:bg-blue-900 [&>div:nth-child(2)]:focus:bg-blue-100 rounded-lg text-sm relative select-none cursor-pointer"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
          onDragstart: _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {}, ["prevent"])),
          src: "".concat(file.img_source),
          "class": "object-cover h-48 w-full bg-white dark:bg-zinc-900",
          alt: file.name
        }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_19)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(file.name), 1 /* TEXT */)], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_17);
      }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.view === 'list' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_22, [_hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.folders, function (folder) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
          tabindex: "-1",
          onContextmenu: _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
            return $options.contextMenu && $options.contextMenu.apply($options, arguments);
          }, ["prevent"])),
          "class": "text-sm border-b dark:border-white/30 hover:bg-black/10 dark:hover:bg-white/20 focus:bg-blue-100 dark:focus:bg-blue-900 cursor-pointer",
          onClick: _cache[10] || (_cache[10] = function ($event) {
            return $event.target.focus();
          }),
          onFocusin: function onFocusin($event) {
            return $options.folderSelect(folder);
          },
          onFocusout: _cache[11] || (_cache[11] = function () {
            return $options.unselect && $options.unselect.apply($options, arguments);
          }),
          onDblclick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
            return _this.$inertia.get(_ctx.route('files', folder.id));
          }, ["prevent"])
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_25, [_hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.user.full_name === _ctx.$page.props.auth.user.full_name ? 'You' : folder.user.full_name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.formatDate(folder.created_at)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.humanFileSize(folder.size)), 1 /* TEXT */)], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_24);
      }), 256 /* UNKEYED_FRAGMENT */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.visibleFiles.data, function (file) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
          tabindex: "-1",
          onContextmenu: _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
            return $options.contextMenu && $options.contextMenu.apply($options, arguments);
          }, ["prevent"])),
          "class": "text-sm border-b dark:border-white/30 hover:bg-black/10 dark:hover:bg-white/20 focus:bg-blue-100 dark:focus:bg-blue-900 cursor-pointer",
          onClick: _cache[13] || (_cache[13] = function ($event) {
            return $event.target.focus();
          }),
          onFocusin: function onFocusin($event) {
            return $options.fileSelect(file);
          },
          onFocusout: _cache[14] || (_cache[14] = function () {
            return $options.unselect && $options.unselect.apply($options, arguments);
          })
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(file.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(file.user.full_name === _ctx.$page.props.auth.user.full_name ? 'You' : file.user.full_name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.formatDate(file.created_at)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.humanFileSize(file.size)), 1 /* TEXT */)], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_30);
      }), 256 /* UNKEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["loadMore"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Empty folder "), !$props.folders.length && !$data.visibleFiles.data.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, " Empty folder ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" File input "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "file",
    name: "file",
    "class": "hidden",
    id: "fileupload",
    onInput: _cache[15] || (_cache[15] = function ($event) {
      return $setup.form.file = $event.target.files;
    }),
    onChange: _cache[16] || (_cache[16] = function () {
      return $setup.submit && $setup.submit.apply($setup, arguments);
    }),
    multiple: ""
  }, null, 32 /* HYDRATE_EVENTS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" New folder modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease-out",
    "enter-from-class": "transform opacity-0 scale-75",
    "enter-to-class": "opacity-100 scale-100",
    "leave-active-class": "duration-200 ease-out",
    "leave-from-class": "opacity-100 scale-100",
    "leave-to-class": "transform opacity-0 scale-75"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showAddFolderModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        "class": "overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center",
        onClick: _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return _this.showAddFolderModal = false;
        }, ["self"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
        onSubmit: _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return $setup.folderform.post(_ctx.route('folders.store'), {
            onSuccess: function onSuccess() {
              return _this.showAddFolderModal = $props.errors.length ? true : false;
            },
            preserveState: true,
            preserveScroll: true
          });
        }, ["prevent"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_BreezeInput, {
        type: "text",
        "class": "w-full",
        modelValue: $setup.folderform.name,
        "onUpdate:modelValue": _cache[17] || (_cache[17] = function ($event) {
          return $setup.folderform.name = $event;
        }),
        autofocus: ""
      }, null, 8 /* PROPS */, ["modelValue"]), $props.errors.name ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.errors.name), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": "mx-2 text-sm hover:underline",
        type: "button",
        onClick: _cache[18] || (_cache[18] = function ($event) {
          return _this.showAddFolderModal = false;
        })
      }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([{
          'opacity-25': $setup.folderform.processing
        }, "mx-2 p-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-white text-sm rounded-lg disabled:cursor-not-allowed"]),
        disabled: $setup.folderform.processing
      }, " Create", 10 /* CLASS, PROPS */, _hoisted_41)])], 32 /* HYDRATE_EVENTS */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease opacity-0",
    "enter-from-class": "opacity-0",
    "enter-to-class": "opacity-100",
    "leave-active-class": "duration-200 ease opacity-90",
    "leave-from-class": "opacity-90",
    "leave-to-class": "transform opacity-0",
    appear: ""
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showAddFolderModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_42)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Uploading file "), $setup.form.progress ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_43, [_hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "bg-blue-600 h-1 rounded-full",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)("width: ".concat((_$setup$form$progress = $setup.form.progress) === null || _$setup$form$progress === void 0 ? void 0 : _$setup$form$progress.percentage, "%"))
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": "text-sm dark:text-white cursor-pointer hover:underline",
    onClick: _cache[21] || (_cache[21] = function () {
      var _$setup$form;
      return $setup.form.cancel && (_$setup$form = $setup.form).cancel.apply(_$setup$form, arguments);
    })
  }, "Cancel")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Context menu "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-from-class": "scale-y-0",
    "enter-to-class": "duration-200 ease-out",
    "leave-from-class": "duration-200 ease-out",
    "leave-to-class": "scale-y-0",
    persisted: ""
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [$data.selectedFile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        href: _ctx.route('files.download', _this.selectedFile.id),
        onMousedown: _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {}, ["prevent"])),
        "class": "dark:text-white flex px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
      }, [_hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Download")], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_49), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        onMousedown: _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
          return $options.renameFile && $options.renameFile.apply($options, arguments);
        }, ["prevent"])),
        "class": "dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
      }, [_hoisted_51, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Rename")], 32 /* HYDRATE_EVENTS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        onMousedown: _cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
          return $options.moveFile && $options.moveFile.apply($options, arguments);
        }, ["prevent"])),
        "class": "dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
      }, [_hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Move")], 32 /* HYDRATE_EVENTS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        onMousedown: _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
          return $options.shareFile && $options.shareFile.apply($options, arguments);
        }, ["prevent"])),
        "class": "dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
      }, [_hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Share")], 32 /* HYDRATE_EVENTS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        onMousedown: _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
          return $options.deleteFile && $options.deleteFile.apply($options, arguments);
        }, ["prevent"])),
        "class": "dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
      }, [_hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Delete")], 32 /* HYDRATE_EVENTS */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.selectedFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        onMousedown: _cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return _this.$inertia.get(_ctx.route('files', $data.selectedFolder.id));
        }, ["prevent"])),
        "class": "dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
      }, [_hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Open")], 32 /* HYDRATE_EVENTS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        onMousedown: _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
          return $options.renameFolder && $options.renameFolder.apply($options, arguments);
        }, ["prevent"])),
        "class": "dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
      }, [_hoisted_57, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Rename ")], 32 /* HYDRATE_EVENTS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        onMousedown: _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
          return $options.moveFolder && $options.moveFolder.apply($options, arguments);
        }, ["prevent"])),
        "class": "dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
      }, [_hoisted_58, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Move ")], 32 /* HYDRATE_EVENTS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        onMousedown: _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
          return $options.shareFolder && $options.shareFolder.apply($options, arguments);
        }, ["prevent"])),
        "class": "dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
      }, [_hoisted_59, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Share")], 32 /* HYDRATE_EVENTS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        onMousedown: _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
          return $options.deleteFolder && $options.deleteFolder.apply($options, arguments);
        }, ["prevent"])),
        "class": "dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
      }, [_hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Delete ")], 32 /* HYDRATE_EVENTS */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.context]])];
    }),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Rename file modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease-out",
    "enter-from-class": "transform opacity-0 scale-75",
    "enter-to-class": "opacity-100 scale-100",
    "leave-active-class": "duration-200 ease-out",
    "leave-from-class": "opacity-100 scale-100",
    "leave-to-class": "transform opacity-0 scale-75"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showRenameFileModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        "class": "overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center",
        onClick: _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return _this.showRenameFileModal = false;
        }, ["self"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [_hoisted_62, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
        onSubmit: _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return $setup.renameFileForm.put(_ctx.route('files.rename', _this.temp.id), {
            preserveScroll: true,
            preserveState: false,
            onSuccess: function onSuccess() {
              _this.showRenameFileModal = $props.errors.length ? true : false;
            }
          });
        }, ["prevent"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_BreezeInput, {
        type: "text",
        "class": "w-full text-xs",
        name: "name",
        modelValue: $setup.renameFileForm.name,
        "onUpdate:modelValue": _cache[32] || (_cache[32] = function ($event) {
          return $setup.renameFileForm.name = $event;
        }),
        autofocus: "",
        onfocus: "this.setSelectionRange(0, this.value.lastIndexOf('.'))"
      }, null, 8 /* PROPS */, ["modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": "mx-2 text-sm hover:underline",
        type: "button",
        onClick: _cache[33] || (_cache[33] = function ($event) {
          return _this.showRenameFileModal = false;
        })
      }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([{
          'opacity-25': $setup.renameFileForm.processing
        }, "mx-2 p-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-white text-sm rounded-lg disabled:cursor-not-allowed"]),
        disabled: $setup.renameFileForm.processing
      }, " Rename", 10 /* CLASS, PROPS */, _hoisted_65)])], 32 /* HYDRATE_EVENTS */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease opacity-0",
    "enter-from-class": "opacity-0",
    "enter-to-class": "opacity-100",
    "leave-active-class": "duration-200 ease opacity-90",
    "leave-from-class": "opacity-90",
    "leave-to-class": "transform opacity-0",
    appear: ""
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showRenameFileModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_66)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Rename folder modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease-out",
    "enter-from-class": "transform opacity-0 scale-75",
    "enter-to-class": "opacity-100 scale-100",
    "leave-active-class": "duration-200 ease-out",
    "leave-from-class": "opacity-100 scale-100",
    "leave-to-class": "transform opacity-0 scale-75"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showRenameFolderModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        "class": "overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center",
        onClick: _cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return _this.showRenameFolderModal = false;
        }, ["self"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [_hoisted_68, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
        onSubmit: _cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return $setup.renameFolderForm.put(_ctx.route('folders.rename', _this.temp.id), {
            preserveScroll: true,
            preserveState: false,
            onSuccess: function onSuccess() {
              _this.showRenameFolderModal = $props.errors.length ? true : false;
            }
          });
        }, ["prevent"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_BreezeInput, {
        type: "text",
        "class": "w-full text-xs",
        name: "name",
        modelValue: $setup.renameFolderForm.name,
        "onUpdate:modelValue": _cache[36] || (_cache[36] = function ($event) {
          return $setup.renameFolderForm.name = $event;
        }),
        autofocus: "",
        onfocus: "this.setSelectionRange(0, this.value.lastIndexOf('.'))"
      }, null, 8 /* PROPS */, ["modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": "mx-2 text-sm hover:underline",
        type: "button",
        onClick: _cache[37] || (_cache[37] = function ($event) {
          return _this.showRenameFolderModal = false;
        })
      }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([{
          'opacity-25': $setup.renameFolderForm.processing
        }, "mx-2 p-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-white text-sm rounded-lg disabled:cursor-not-allowed"]),
        disabled: $setup.renameFolderForm.processing
      }, " Rename", 10 /* CLASS, PROPS */, _hoisted_71)])], 32 /* HYDRATE_EVENTS */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease opacity-0",
    "enter-from-class": "opacity-0",
    "enter-to-class": "opacity-100",
    "leave-active-class": "duration-200 ease opacity-90",
    "leave-from-class": "opacity-90",
    "leave-to-class": "transform opacity-0",
    appear: ""
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showRenameFolderModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_72)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Share modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease-out",
    "enter-from-class": "transform opacity-0 scale-75",
    "enter-to-class": "opacity-100 scale-100",
    "leave-active-class": "duration-200 ease-out",
    "leave-from-class": "opacity-100 scale-100",
    "leave-to-class": "transform opacity-0 scale-75"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showShareModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        "class": "overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center",
        onClick: _cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          _this.showShareModal = false;
          _this.shareForm.reset();
        }, ["self"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [_hoisted_74, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
        onSubmit: _cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return $setup.shareForm.post(_ctx.route('share', _this.temp.id), {
            onSuccess: function onSuccess() {
              return _this.showShareModal = false;
            },
            preserveState: false
          });
        }, ["prevent"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [_hoisted_76, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.roles, function (role) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_77, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
          id: "role".concat(role.id, "checkbox"),
          type: "checkbox",
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return $setup.shareForm.role = $event;
          },
          "class": "text-xs rounded-full mr-4 focus:ring-0 focus:outline-none",
          value: role.id
        }, null, 8 /* PROPS */, _hoisted_78), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $setup.shareForm.role]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": "role".concat(role.id, "checkbox")
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(role.name), 9 /* TEXT, PROPS */, _hoisted_79)]);
      }), 256 /* UNKEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [_hoisted_81, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.users, function (user) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_this.temp.user_id !== user.id ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_82, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
          id: "user".concat(user.id, "checkbox"),
          type: "checkbox",
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return $setup.shareForm.user = $event;
          },
          "class": "text-xs rounded-full mr-4 focus:ring-0 focus:outline-none",
          value: user.id
        }, null, 8 /* PROPS */, _hoisted_83), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $setup.shareForm.user]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": "user".concat(user.id, "checkbox")
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.full_name), 9 /* TEXT, PROPS */, _hoisted_84)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */);
      }), 256 /* UNKEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_85, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": "mx-2 text-sm hover:underline",
        type: "button",
        onClick: _cache[40] || (_cache[40] = function ($event) {
          _this.showShareModal = false;
          _this.shareForm.reset();
        })
      }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([{
          'opacity-25': $setup.shareForm.processing
        }, "mx-2 p-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-white text-sm rounded-lg disabled:cursor-not-allowed"]),
        disabled: $setup.shareForm.processing
      }, " Share", 10 /* CLASS, PROPS */, _hoisted_86)])], 32 /* HYDRATE_EVENTS */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease opacity-0",
    "enter-from-class": "opacity-0",
    "enter-to-class": "opacity-100",
    "leave-active-class": "duration-200 ease opacity-90",
    "leave-from-class": "opacity-90",
    "leave-to-class": "transform opacity-0",
    appear: ""
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showShareModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_87)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Move file modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease-out",
    "enter-from-class": "transform opacity-0 scale-75",
    "enter-to-class": "opacity-100 scale-100",
    "leave-active-class": "duration-200 ease-out",
    "leave-from-class": "opacity-100 scale-100",
    "leave-to-class": "transform opacity-0 scale-75"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showMoveFileModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        "class": "overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center",
        onClick: _cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          _this.showMoveFileModal = false;
          _this.moveFolders = '';
          _this.moveFolderChild = false;
        }, ["self"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [_hoisted_89, _this.moveFolderChild ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        onClick: _cache[43] || (_cache[43] = function ($event) {
          return $options.goToFolder(_this.moveFolderParent);
        }),
        "class": "p-2 hover:bg-black/10 dark:hover:bg-white/20 rounded-lg cursor-pointer"
      }, _hoisted_91)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !_this.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: 1
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.moveFolders, function (folder) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          onClick: function onClick($event) {
            return $options.goToFolder(folder.id);
          },
          "class": "p-2 hover:bg-black/10 dark:hover:bg-white/20 rounded-lg cursor-pointer"
        }, [_hoisted_93, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_92);
      }), 256 /* UNKEYED_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["px-4 py-2 text-sm rounded-lg bg-blue-500 text-white", {
          'opacity-25 cursor-not-allowed': _this.temp.folder_id === $data.moveFolderChild
        }]),
        onClick: _cache[44] || (_cache[44] = function ($event) {
          return _this.moveForm.put(_ctx.route('files.move', _this.temp.id), {
            preserveState: false,
            onSuccess: function onSuccess() {
              return _this.showMoveFileModal = false;
            }
          });
        }),
        disabled: _this.temp.folder_id === $data.moveFolderChild
      }, "Move here", 10 /* CLASS, PROPS */, _hoisted_95)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease opacity-0",
    "enter-from-class": "opacity-0",
    "enter-to-class": "opacity-100",
    "leave-active-class": "duration-200 ease opacity-90",
    "leave-from-class": "opacity-90",
    "leave-to-class": "transform opacity-0",
    appear: ""
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showMoveFileModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_96)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Move folder modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease-out",
    "enter-from-class": "transform opacity-0 scale-75",
    "enter-to-class": "opacity-100 scale-100",
    "leave-active-class": "duration-200 ease-out",
    "leave-from-class": "opacity-100 scale-100",
    "leave-to-class": "transform opacity-0 scale-75"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showMoveFolderModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        "class": "overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center",
        onClick: _cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          _this.showMoveFolderModal = false;
          _this.moveFolders = '';
          _this.moveFolderChild = false;
        }, ["self"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [_hoisted_98, _this.moveFolderChild ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        onClick: _cache[46] || (_cache[46] = function ($event) {
          return $options.goToFolder(_this.moveFolderParent);
        }),
        "class": "p-2 hover:bg-black/10 dark:hover:bg-white/20 rounded-lg cursor-pointer"
      }, _hoisted_100)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !_this.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: 1
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.moveFolders, function (folder) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          onClick: function onClick($event) {
            return $options.goToFolder(folder.id);
          },
          "class": "p-2 hover:bg-black/10 dark:hover:bg-white/20 rounded-lg cursor-pointer"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fa-solid fa-folder w-8", {
            'opacity-25': _this.temp.id === folder.id
          }])
        }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_101);
      }), 256 /* UNKEYED_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["px-4 py-2 text-sm rounded-lg bg-blue-500 text-white", {
          'opacity-25 cursor-not-allowed': _this.temp.parent_folder_id === $data.moveFolderChild || _this.temp.id === $data.moveFolderChild
        }]),
        onClick: _cache[47] || (_cache[47] = function ($event) {
          return _this.moveForm.put(_ctx.route('folders.move', _this.temp.id), {
            preserveState: false,
            onSuccess: function onSuccess() {
              return _this.showMoveFolderModal = false;
            }
          });
        }),
        disabled: _this.temp.parent_folder_id === $data.moveFolderChild || _this.temp.id === $data.moveFolderChild
      }, "Move here", 10 /* CLASS, PROPS */, _hoisted_103)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease opacity-0",
    "enter-from-class": "opacity-0",
    "enter-to-class": "opacity-100",
    "leave-active-class": "duration-200 ease opacity-90",
    "leave-from-class": "opacity-90",
    "leave-to-class": "transform opacity-0",
    appear: ""
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showMoveFolderModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_104)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Delete file modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease-out",
    "enter-from-class": "transform opacity-0 scale-75",
    "enter-to-class": "opacity-100 scale-100",
    "leave-active-class": "duration-200 ease-out",
    "leave-from-class": "opacity-100 scale-100",
    "leave-to-class": "transform opacity-0 scale-75"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showDeleteFileModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        "class": "overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center",
        onClick: _cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return _this.showDeleteFileModal = false;
        }, ["self"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_105, [_hoisted_106, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_107, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Are you sure you want to delete "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_108, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.temp.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("? ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_109, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        onClick: _cache[49] || (_cache[49] = function ($event) {
          return _this.showDeleteFileModal = false;
        }),
        type: "button",
        "class": "hover:underline text-sm px-3"
      }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        onClick: _cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return _this.$inertia["delete"](_ctx.route('files.destroy', _this.temp.id), {
            onSuccess: function onSuccess() {
              _this.showDeleteFileModal = false, _this.visibleFiles.data.splice(_this.tempIndex, 1);
            }
          });
        }, ["stop"])),
        "class": "px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 active:bg-red-900 text-sm"
      }, "Delete")])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease opacity-0",
    "enter-from-class": "opacity-0",
    "enter-to-class": "opacity-100",
    "leave-active-class": "duration-200 ease opacity-90",
    "leave-from-class": "opacity-90",
    "leave-to-class": "transform opacity-0",
    appear: ""
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showDeleteFileModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_110)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Delete folder modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease-out",
    "enter-from-class": "transform opacity-0 scale-75",
    "enter-to-class": "opacity-100 scale-100",
    "leave-active-class": "duration-200 ease-out",
    "leave-from-class": "opacity-100 scale-100",
    "leave-to-class": "transform opacity-0 scale-75"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showDeleteFolderModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        "class": "overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center",
        onClick: _cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return _this.showDeleteFolderModal = false;
        }, ["self"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [_hoisted_112, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_113, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Are you sure you want to delete "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_114, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.temp.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("? ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_115, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        onClick: _cache[52] || (_cache[52] = function ($event) {
          return _this.showDeleteFolderModal = false;
        }),
        type: "button",
        "class": "hover:underline text-sm px-3"
      }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        onClick: _cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return _this.$inertia["delete"](_ctx.route('folders.destroy', _this.temp.id), {
            onSuccess: function onSuccess() {
              _this.showDeleteFolderModal = false, $props.folders.splice(_this.tempIndex, 1);
            }
          });
        }, ["stop"])),
        "class": "px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 active:bg-red-900 text-sm"
      }, "Delete")])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "duration-200 ease opacity-0",
    "enter-from-class": "opacity-0",
    "enter-to-class": "opacity-100",
    "leave-active-class": "duration-200 ease opacity-90",
    "leave-from-class": "opacity-90",
    "leave-to-class": "transform opacity-0",
    appear: ""
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showDeleteFolderModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_116)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  })])], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseTrim.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseTrim.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trimmedEndIndex = __webpack_require__(/*! ./_trimmedEndIndex */ "./node_modules/lodash/_trimmedEndIndex.js");

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_trimmedEndIndex.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_trimmedEndIndex.js ***!
  \*************************************************/
/***/ ((module) => {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "./node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTrim = __webpack_require__(/*! ./_baseTrim */ "./node_modules/lodash/_baseTrim.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "./resources/js/Components/InfiniteScroll.vue":
/*!****************************************************!*\
  !*** ./resources/js/Components/InfiniteScroll.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _InfiniteScroll_vue_vue_type_template_id_d1c55ee8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InfiniteScroll.vue?vue&type=template&id=d1c55ee8 */ "./resources/js/Components/InfiniteScroll.vue?vue&type=template&id=d1c55ee8");
/* harmony import */ var _InfiniteScroll_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InfiniteScroll.vue?vue&type=script&lang=js */ "./resources/js/Components/InfiniteScroll.vue?vue&type=script&lang=js");
/* harmony import */ var F_PUP_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,F_PUP_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_InfiniteScroll_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_InfiniteScroll_vue_vue_type_template_id_d1c55ee8__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/InfiniteScroll.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/Input.vue":
/*!*******************************************!*\
  !*** ./resources/js/Components/Input.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Input_vue_vue_type_template_id_43da0f8f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Input.vue?vue&type=template&id=43da0f8f */ "./resources/js/Components/Input.vue?vue&type=template&id=43da0f8f");
/* harmony import */ var _Input_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Input.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Components/Input.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var F_PUP_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,F_PUP_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Input_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Input_vue_vue_type_template_id_43da0f8f__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/Input.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/Files/Index.vue":
/*!********************************************!*\
  !*** ./resources/js/Pages/Files/Index.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Index_vue_vue_type_template_id_67ce7f01__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=67ce7f01 */ "./resources/js/Pages/Files/Index.vue?vue&type=template&id=67ce7f01");
/* harmony import */ var _Index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js */ "./resources/js/Pages/Files/Index.vue?vue&type=script&lang=js");
/* harmony import */ var F_PUP_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,F_PUP_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Index_vue_vue_type_template_id_67ce7f01__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/Files/Index.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/InfiniteScroll.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/Components/InfiniteScroll.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_InfiniteScroll_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_InfiniteScroll_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./InfiniteScroll.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/InfiniteScroll.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/Input.vue?vue&type=script&setup=true&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/Components/Input.vue?vue&type=script&setup=true&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Input_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Input_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Input.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Input.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Files/Index.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./resources/js/Pages/Files/Index.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Index.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Files/Index.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/InfiniteScroll.vue?vue&type=template&id=d1c55ee8":
/*!**********************************************************************************!*\
  !*** ./resources/js/Components/InfiniteScroll.vue?vue&type=template&id=d1c55ee8 ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_InfiniteScroll_vue_vue_type_template_id_d1c55ee8__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_InfiniteScroll_vue_vue_type_template_id_d1c55ee8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./InfiniteScroll.vue?vue&type=template&id=d1c55ee8 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/InfiniteScroll.vue?vue&type=template&id=d1c55ee8");


/***/ }),

/***/ "./resources/js/Components/Input.vue?vue&type=template&id=43da0f8f":
/*!*************************************************************************!*\
  !*** ./resources/js/Components/Input.vue?vue&type=template&id=43da0f8f ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Input_vue_vue_type_template_id_43da0f8f__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Input_vue_vue_type_template_id_43da0f8f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Input.vue?vue&type=template&id=43da0f8f */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Input.vue?vue&type=template&id=43da0f8f");


/***/ }),

/***/ "./resources/js/Pages/Files/Index.vue?vue&type=template&id=67ce7f01":
/*!**************************************************************************!*\
  !*** ./resources/js/Pages/Files/Index.vue?vue&type=template&id=67ce7f01 ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Index_vue_vue_type_template_id_67ce7f01__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Index_vue_vue_type_template_id_67ce7f01__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Index.vue?vue&type=template&id=67ce7f01 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Files/Index.vue?vue&type=template&id=67ce7f01");


/***/ })

}]);