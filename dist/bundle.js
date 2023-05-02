/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/init */ \"./src/modules/init.js\");\n\n\nwindow.onload = _modules_init__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n\n//# sourceURL=webpack://virtual-keyboard/./src/app.js?");

/***/ }),

/***/ "./src/modules/handlers.js":
/*!*********************************!*\
  !*** ./src/modules/handlers.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"keyDown\": () => (/* binding */ keyDown),\n/* harmony export */   \"keyUp\": () => (/* binding */ keyUp),\n/* harmony export */   \"keyboardMouseDown\": () => (/* binding */ keyboardMouseDown),\n/* harmony export */   \"keyboardMouseUp\": () => (/* binding */ keyboardMouseUp)\n/* harmony export */ });\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys */ \"./src/modules/keys.js\");\n/* harmony import */ var _notes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notes */ \"./src/modules/notes.js\");\n/* harmony import */ var _textarea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./textarea */ \"./src/modules/textarea.js\");\n/* harmony import */ var _layout_switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout-switch */ \"./src/modules/layout-switch.js\");\n\n\n\n\n\nconst handlers = {\n  keyDown(e) {\n    const elKey = document.getElementById(`key-${e.code}`);\n    const keyInfo = _keys__WEBPACK_IMPORTED_MODULE_0__.Keys[__webpack_require__.g.layout][e.code];\n    let val;\n    let pos;\n    if (!__webpack_require__.g.context) __webpack_require__.g.context = new AudioContext();\n    const o = __webpack_require__.g.context.createOscillator();\n    o.frequency.value = _notes__WEBPACK_IMPORTED_MODULE_1__.pain[_notes__WEBPACK_IMPORTED_MODULE_1__.pptr.prop];\n    _notes__WEBPACK_IMPORTED_MODULE_1__.pptr.prop += 1;\n    _notes__WEBPACK_IMPORTED_MODULE_1__.pptr.prop %= _notes__WEBPACK_IMPORTED_MODULE_1__.pain.length;\n    o.type = 'sine';\n    o.connect(__webpack_require__.g.context.destination);\n    o.start();\n    setTimeout(() => { o.stop(); }, 100);\n\n    if (elKey) {\n      elKey.classList.add('active');\n    }\n    // Особые клавиши\n    switch (e.code) {\n      case 'ArrowLeft':\n        __webpack_require__.g.textarea.selectionStart -= 1;\n        __webpack_require__.g.textarea.selectionEnd = __webpack_require__.g.textarea.selectionStart;\n        break;\n      case 'ArrowRight':\n        __webpack_require__.g.textarea.selectionStart += 1;\n        __webpack_require__.g.textarea.selectionEnd = __webpack_require__.g.textarea.selectionStart;\n        break;\n      case 'ArrowUp':\n        (0,_textarea__WEBPACK_IMPORTED_MODULE_2__[\"default\"])('▲');\n        break;\n      case 'ArrowDown':\n        (0,_textarea__WEBPACK_IMPORTED_MODULE_2__[\"default\"])('▼');\n        break;\n      case 'Tab':\n        (0,_textarea__WEBPACK_IMPORTED_MODULE_2__[\"default\"])('    ');\n        break;\n      case 'Enter':\n        (0,_textarea__WEBPACK_IMPORTED_MODULE_2__[\"default\"])('\\n');\n        break;\n      case 'Backspace':\n        val = __webpack_require__.g.textarea.value;\n        pos = __webpack_require__.g.textarea.selectionStart;\n        if (e.shiftKey) {\n          val = __webpack_require__.g.textarea.value;\n          pos = __webpack_require__.g.textarea.selectionStart;\n          if (pos < val.length) {\n            __webpack_require__.g.textarea.value = val.slice(0, pos) + val.slice(pos + 1);\n            __webpack_require__.g.textarea.selectionStart = pos;\n            __webpack_require__.g.textarea.selectionEnd = __webpack_require__.g.textarea.selectionStart;\n          }\n        } else if (pos > 0) {\n          __webpack_require__.g.textarea.value = val.slice(0, pos - 1) + val.slice(pos);\n          __webpack_require__.g.textarea.selectionStart = pos - 1;\n          __webpack_require__.g.textarea.selectionEnd = __webpack_require__.g.textarea.selectionStart;\n        }\n        break;\n      case 'ShiftLeft':\n        // Переключаем раскладку по Ctrl+Shift (левый);\n        if (e.ctrlKey) {\n          (0,_layout_switch__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n        }\n        break;\n      case 'CapsLock':\n        __webpack_require__.g.isCapsLock = !__webpack_require__.g.isCapsLock;\n        break;\n      default:\n        if (keyInfo !== undefined && keyInfo.char) {\n          if ((e.shiftKey && !__webpack_require__.g.isCapsLock) || (!e.shiftKey && __webpack_require__.g.isCapsLock)) {\n            (0,_textarea__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(keyInfo.shift ? keyInfo.shift : keyInfo.char.toUpperCase());\n          } else {\n            (0,_textarea__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(keyInfo.char);\n          }\n        }\n    }\n    __webpack_require__.g.textarea.focus();\n  },\n  keyUp(e) {\n    const elKey = document.getElementById(`key-${e.code}`);\n    if (elKey) {\n      elKey.classList.remove('active');\n    }\n  },\n  keyboardMouseDown(e) {\n    __webpack_require__.g.textarea.focus();\n    let { target } = e;\n    let match;\n    while (target && target !== document && !(match = target.matches('div.key'))) {\n      target = target.parentNode;\n    }\n    if (!match) return;\n    window.dispatchEvent(new KeyboardEvent('keydown', {\n      code: target.id.slice(4), shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey,\n    }));\n  },\n  keyboardMouseUp(e) {\n    let { target } = e;\n    let match;\n    while (target && target !== document && !(match = target.matches('div.key'))) {\n      target = target.parentNode;\n    }\n    if (!match) return;\n    const key = target.id.slice(4);\n    if (key === 'CapsLock' && __webpack_require__.g.isCapsLock) {\n      return;\n    }\n    window.dispatchEvent(new KeyboardEvent('keyup', { code: key }));\n  },\n};\n\nconst { keyDown } = handlers;\nconst { keyUp } = handlers;\nconst { keyboardMouseDown } = handlers;\nconst { keyboardMouseUp } = handlers;\n\n\n//# sourceURL=webpack://virtual-keyboard/./src/modules/handlers.js?");

/***/ }),

/***/ "./src/modules/init.js":
/*!*****************************!*\
  !*** ./src/modules/init.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _layout_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout-render */ \"./src/modules/layout-render.js\");\n/* harmony import */ var _keyboard_render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboard-render */ \"./src/modules/keyboard-render.js\");\n/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handlers */ \"./src/modules/handlers.js\");\n\n\n\n\nfunction init() {\n  __webpack_require__.g.isCapsLock = false;\n  __webpack_require__.g.layout = localStorage.layout ?? 'en';\n  (0,_layout_render__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  (0,_keyboard_render__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  window.addEventListener('keydown', _handlers__WEBPACK_IMPORTED_MODULE_2__.keyDown);\n  window.addEventListener('keyup', _handlers__WEBPACK_IMPORTED_MODULE_2__.keyUp);\n  __webpack_require__.g.elKeyboard.addEventListener('mousedown', _handlers__WEBPACK_IMPORTED_MODULE_2__.keyboardMouseDown);\n  __webpack_require__.g.elKeyboard.addEventListener('mouseup', _handlers__WEBPACK_IMPORTED_MODULE_2__.keyboardMouseUp);\n  __webpack_require__.g.textarea.focus();\n  __webpack_require__.g.textarea.addEventListener('keydown', (e) => e.preventDefault());\n  __webpack_require__.g.textarea.addEventListener('keyup', (e) => e.preventDefault());\n  __webpack_require__.g.textarea.addEventListener('keypress', (e) => e.preventDefault());\n}\n\n\n//# sourceURL=webpack://virtual-keyboard/./src/modules/init.js?");

/***/ }),

/***/ "./src/modules/keyboard-render.js":
/*!****************************************!*\
  !*** ./src/modules/keyboard-render.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ renderKeyboard)\n/* harmony export */ });\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys */ \"./src/modules/keys.js\");\n\n\nfunction renderKeyboard() {\n  __webpack_require__.g.elKeyboard.innerHTML = '';\n\n  for (let row = 0; row <= 5; row += 1) {\n    const elRow = document.createElement('div');\n    let elKeyHalfContainer;\n    if (row === 0) {\n      elRow.classList.add('touch-bar');\n    } else {\n      elRow.classList.add('row');\n    }\n    for (const keyCode of Object.keys(_keys__WEBPACK_IMPORTED_MODULE_0__.Keys[__webpack_require__.g.layout])) {\n      if (_keys__WEBPACK_IMPORTED_MODULE_0__.Keys[__webpack_require__.g.layout][keyCode].row === row) {\n        const elKey = document.createElement('div');\n        const keyInfo = _keys__WEBPACK_IMPORTED_MODULE_0__.Keys[__webpack_require__.g.layout][keyCode];\n        elKey.classList.add('key');\n        if (keyInfo.row === 0) {\n          elKey.classList.add('emoji');\n        }\n        if (keyInfo.char === undefined) {\n          elKey.classList.add('modifier');\n        }\n        if (keyInfo.class === 'activatable') {\n          elKey.classList.add(keyInfo.class);\n        }\n        if (keyInfo.class === 'half-key') {\n          elKey.classList.add(keyInfo.class);\n        }\n        elKey.id = `key-${keyCode}`;\n        if (keyInfo.show) {\n          elKey.innerHTML = keyInfo.show;\n        } else {\n          elKey.innerHTML = keyInfo.char.toUpperCase();\n        }\n        if (keyCode === 'ArrowUp') {\n          elKeyHalfContainer = document.createElement('div');\n          elRow.append(elKeyHalfContainer);\n        }\n\n        if (keyInfo.shift) {\n          const elShift = document.createElement('span');\n          elShift.innerHTML = keyInfo.shift;\n          elKey.append(elShift);\n        }\n\n        if (keyCode === 'ArrowUp' || keyCode === 'ArrowDown') {\n          elKeyHalfContainer.append(elKey);\n        } else {\n          elRow.append(elKey);\n        }\n      }\n    }\n\n    __webpack_require__.g.elKeyboard.append(elRow);\n  }\n}\n\n\n//# sourceURL=webpack://virtual-keyboard/./src/modules/keyboard-render.js?");

/***/ }),

/***/ "./src/modules/keys.js":
/*!*****************************!*\
  !*** ./src/modules/keys.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Keys\": () => (/* binding */ Keys),\n/* harmony export */   \"KeysEn\": () => (/* binding */ KeysEn),\n/* harmony export */   \"KeysRu\": () => (/* binding */ KeysRu)\n/* harmony export */ });\nconst KeysEn = {\n  '😅': { char: '😅', row: 0 },\n  '😂': { char: '😂', row: 0 },\n  '🤯': { char: '🤯', row: 0 },\n  '🤬': { char: '🤬', row: 0 },\n  '🤢': { char: '🤢', row: 0 },\n  '🤮': { char: '🤮', row: 0 },\n  '💩': { char: '💩', row: 0 },\n  '🤡': { char: '🤡', row: 0 },\n  '👺': { char: '👺', row: 0 },\n  '👻': { char: '👻', row: 0 },\n  '❓': { char: '❓', row: 0 },\n  '❗': { char: '❗', row: 0 },\n  '👉': { char: '👉', row: 0 },\n  '🖕': { char: '🖕', row: 0 },\n  '👈': { char: '👈', row: 0 },\n  '👅': { char: '👅', row: 0 },\n  '🦄': { char: '🦄', row: 0 },\n  '🐁': { char: '🐁', row: 0 },\n  '😎': { char: '😎', row: 0 },\n  '🤓': { char: '🤓', row: 0 },\n  '🌻': { char: '🌻', row: 0 },\n  '🕊': { char: '🕊', row: 0 },\n  '💙': { char: '💙', row: 0 },\n  '💛': { char: '💛', row: 0 },\n  '🧡': { char: '🧡', row: 0 },\n  '💚': { char: '💚', row: 0 },\n  '💜': { char: '💜', row: 0 },\n  '🤝': { char: '🤝', row: 0 },\n  '🐞': { char: '🐞', row: 0 },\n  '🐢': { char: '🐢', row: 0 },\n  '🤘': { char: '🤘', row: 0 },\n  '✊': { char: '✊', row: 0 },\n\n  Backquote: { char: '`', shift: '~', row: 1 },\n  Digit1: { char: '1', shift: '!', row: 1 },\n  Digit2: { char: '2', shift: '@', row: 1 },\n  Digit3: { char: '3', shift: '#', row: 1 },\n  Digit4: { char: '4', shift: '$', row: 1 },\n  Digit5: { char: '5', shift: '%', row: 1 },\n  Digit6: { char: '6', shift: '^', row: 1 },\n  Digit7: { char: '7', shift: '&', row: 1 },\n  Digit8: { char: '8', shift: '*', row: 1 },\n  Digit9: { char: '9', shift: '(', row: 1 },\n  Digit0: { char: '0', shift: ')', row: 1 },\n  Minus: { char: '-', shift: '_', row: 1 },\n  Equal: { char: '=', shift: '+', row: 1 },\n  Backspace: { show: 'delete', row: 1 },\n\n  Tab: { show: 'tab', row: 2 },\n  KeyQ: { char: 'q', row: 2 },\n  KeyW: { char: 'w', row: 2 },\n  KeyE: { char: 'e', row: 2 },\n  KeyR: { char: 'r', row: 2 },\n  KeyT: { char: 't', row: 2 },\n  KeyY: { char: 'y', row: 2 },\n  KeyU: { char: 'u', row: 2 },\n  KeyI: { char: 'i', row: 2 },\n  KeyO: { char: 'o', row: 2 },\n  KeyP: { char: 'p', row: 2 },\n  BracketLeft: { char: '[', shift: '{', row: 2 },\n  BracketRight: { char: ']', shift: '}', row: 2 },\n  Backslash: { char: '\\\\', shift: '|', row: 2 },\n\n  CapsLock: { show: 'caps lock', row: 3, class: 'activatable' },\n  KeyA: { char: 'a', row: 3 },\n  KeyS: { char: 's', row: 3 },\n  KeyD: { char: 'd', row: 3 },\n  KeyF: { char: 'f', row: 3 },\n  KeyG: { char: 'g', row: 3 },\n  KeyH: { char: 'h', row: 3 },\n  KeyJ: { char: 'j', row: 3 },\n  KeyK: { char: 'k', row: 3 },\n  KeyL: { char: 'l', row: 3 },\n  Semicolon: { char: ';', shift: ':', row: 3 },\n  Quote: { char: '\\'', shift: '\"', row: 3 },\n  Enter: { show: 'return', shift: 'enter', row: 3 },\n\n  ShiftLeft: { show: 'shift', row: 4 },\n  KeyZ: { char: 'z', row: 4 },\n  KeyX: { char: 'x', row: 4 },\n  KeyC: { char: 'c', row: 4 },\n  KeyV: { char: 'v', row: 4 },\n  KeyB: { char: 'b', row: 4 },\n  KeyN: { char: 'n', row: 4 },\n  KeyM: { char: 'm', row: 4 },\n  Comma: { char: ',', shift: '<', row: 4 },\n  Period: { char: '.', shift: '>', row: 4 },\n  Slash: { char: '/', shift: '?', row: 4 },\n  ShiftRight: { show: 'shift', row: 4 },\n\n  Fn: { show: 'fn', row: 5 },\n  ControlLeft: { show: 'control', row: 5 },\n  AltLeft: { show: 'option', shift: 'alt', row: 5 },\n  MetaLeft: { show: 'command', row: 5 },\n  Space: { show: '', char: ' ', row: 5 },\n  MetaRight: { show: 'command', row: 5 },\n  AltRight: { show: 'option', shift: 'alt', row: 5 },\n  ArrowLeft: { show: '&larr;', row: 5 },\n  ArrowUp: { show: '&uarr;', row: 5, class: 'half-key' },\n  ArrowDown: { show: '&darr;', row: 5, class: 'half-key' },\n  ArrowRight: { show: '&rarr;', row: 5 },\n};\n\nconst KeysRu = {\n  '😅': { char: '😅', row: 0 },\n  '😂': { char: '😂', row: 0 },\n  '🤯': { char: '🤯', row: 0 },\n  '🤬': { char: '🤬', row: 0 },\n  '🤢': { char: '🤢', row: 0 },\n  '🤮': { char: '🤮', row: 0 },\n  '💩': { char: '💩', row: 0 },\n  '🤡': { char: '🤡', row: 0 },\n  '👺': { char: '👺', row: 0 },\n  '👻': { char: '👻', row: 0 },\n  '❓': { char: '❓', row: 0 },\n  '❗': { char: '❗', row: 0 },\n  '👉': { char: '👉', row: 0 },\n  '🖕': { char: '🖕', row: 0 },\n  '👈': { char: '👈', row: 0 },\n  '👅': { char: '👅', row: 0 },\n  '🦄': { char: '🦄', row: 0 },\n  '🐁': { char: '🐁', row: 0 },\n  '😎': { char: '😎', row: 0 },\n  '🤓': { char: '🤓', row: 0 },\n  '🌻': { char: '🌻', row: 0 },\n  '🕊': { char: '🕊', row: 0 },\n  '💙': { char: '💙', row: 0 },\n  '💛': { char: '💛', row: 0 },\n  '🧡': { char: '🧡', row: 0 },\n  '💚': { char: '💚', row: 0 },\n  '💜': { char: '💜', row: 0 },\n  '🤝': { char: '🤝', row: 0 },\n  '🐞': { char: '🐞', row: 0 },\n  '🐢': { char: '🐢', row: 0 },\n  '🤘': { char: '🤘', row: 0 },\n  '✊': { char: '✊', row: 0 },\n\n  Backquote: { char: ']', shift: '[', row: 1 },\n  Digit1: { char: '1', shift: '!', row: 1 },\n  Digit2: { char: '2', shift: '\"', row: 1 },\n  Digit3: { char: '3', shift: '№', row: 1 },\n  Digit4: { char: '4', shift: '%', row: 1 },\n  Digit5: { char: '5', shift: ':', row: 1 },\n  Digit6: { char: '6', shift: ',', row: 1 },\n  Digit7: { char: '7', shift: '.', row: 1 },\n  Digit8: { char: '8', shift: ';', row: 1 },\n  Digit9: { char: '9', shift: '(', row: 1 },\n  Digit0: { char: '0', shift: ')', row: 1 },\n  Minus: { char: '-', shift: '_', row: 1 },\n  Equal: { char: '=', shift: '+', row: 1 },\n  Backspace: { show: 'delete', row: 1 },\n\n  Tab: { show: 'tab', row: 2 },\n  KeyQ: { char: 'й', row: 2 },\n  KeyW: { char: 'ц', row: 2 },\n  KeyE: { char: 'у', row: 2 },\n  KeyR: { char: 'к', row: 2 },\n  KeyT: { char: 'е', row: 2 },\n  KeyY: { char: 'н', row: 2 },\n  KeyU: { char: 'г', row: 2 },\n  KeyI: { char: 'ш', row: 2 },\n  KeyO: { char: 'щ', row: 2 },\n  KeyP: { char: 'з', row: 2 },\n  BracketLeft: { char: 'х', row: 2 },\n  BracketRight: { char: 'ъ', row: 2 },\n  Backslash: { char: 'ё', row: 2 },\n\n  CapsLock: { show: 'caps lock', row: 3, class: 'activatable' },\n  KeyA: { char: 'ф', row: 3 },\n  KeyS: { char: 'ы', row: 3 },\n  KeyD: { char: 'в', row: 3 },\n  KeyF: { char: 'а', row: 3 },\n  KeyG: { char: 'п', row: 3 },\n  KeyH: { char: 'р', row: 3 },\n  KeyJ: { char: 'о', row: 3 },\n  KeyK: { char: 'л', row: 3 },\n  KeyL: { char: 'д', row: 3 },\n  Semicolon: { char: 'ж', row: 3 },\n  Quote: { char: 'э', row: 3 },\n  Enter: { show: 'return', row: 3 },\n\n  ShiftLeft: { show: 'shift', row: 4 },\n  KeyZ: { char: 'я', row: 4 },\n  KeyX: { char: 'ч', row: 4 },\n  KeyC: { char: 'с', row: 4 },\n  KeyV: { char: 'м', row: 4 },\n  KeyB: { char: 'и', row: 4 },\n  KeyN: { char: 'т', row: 4 },\n  KeyM: { char: 'ь', row: 4 },\n  Comma: { char: 'б', row: 4 },\n  Period: { char: 'ю', row: 4 },\n  Slash: { char: '/', shift: '?', row: 4 },\n  ShiftRight: { show: 'shift', row: 4 },\n\n  Fn: { show: 'fn', row: 5 },\n  ControlLeft: { show: 'control', row: 5 },\n  AltLeft: { show: 'option', row: 5 },\n  MetaLeft: { show: 'command', row: 5 },\n  Space: { show: '', char: ' ', row: 5 },\n  MetaRight: { show: 'command', row: 5 },\n  AltRight: { show: 'option', row: 5 },\n  ArrowLeft: { show: '&larr;', row: 5 },\n  ArrowUp: { show: '&uarr;', row: 5, class: 'half-key' },\n  ArrowDown: { show: '&darr;', row: 5, class: 'half-key' },\n  ArrowRight: { show: '&rarr;', row: 5 },\n};\n\nconst Keys = {\n  en: KeysEn,\n  ru: KeysRu,\n};\n\n\n\n\n//# sourceURL=webpack://virtual-keyboard/./src/modules/keys.js?");

/***/ }),

/***/ "./src/modules/layout-render.js":
/*!**************************************!*\
  !*** ./src/modules/layout-render.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ renderLayout)\n/* harmony export */ });\nfunction renderLayout() {\n  const title = document.createElement('h1');\n  title.classList.add('title');\n  title.innerHTML = 'virtual keyboard mac';\n  document.body.append(title);\n\n  __webpack_require__.g.textarea = document.createElement('textarea');\n  __webpack_require__.g.textarea.classList.add('textarea');\n  __webpack_require__.g.textarea.rows = 4;\n  __webpack_require__.g.textarea.placeholder = 'type something...';\n  document.body.append(__webpack_require__.g.textarea);\n\n  __webpack_require__.g.elKeyboard = document.createElement('div');\n  __webpack_require__.g.elKeyboard.classList.add('keyboard');\n  document.body.append(__webpack_require__.g.elKeyboard);\n\n  const elHint = document.createElement('p');\n  elHint.classList.add('hint');\n  elHint.innerHTML = 'switch language <strong>ctrl+shift</strong>';\n  document.body.append(elHint);\n\n  const elDeleteHint = document.createElement('p');\n  elDeleteHint.classList.add('delete-hint');\n  elDeleteHint.innerHTML = '<strong>delete</strong> removes character before the text cursor<br><strong>shift + delete</strong> removes character after';\n  document.body.append(elDeleteHint);\n\n  const elMusicHint = document.createElement('p');\n  elMusicHint.classList.add('music-hint');\n  elMusicHint.innerHTML = 'and <strong>sound on</strong>, it\\'s made with some <strong>pain</strong> :)';\n  document.body.append(elMusicHint);\n}\n\n\n//# sourceURL=webpack://virtual-keyboard/./src/modules/layout-render.js?");

/***/ }),

/***/ "./src/modules/layout-switch.js":
/*!**************************************!*\
  !*** ./src/modules/layout-switch.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ switchLayout)\n/* harmony export */ });\n/* harmony import */ var _keyboard_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keyboard-render */ \"./src/modules/keyboard-render.js\");\n\n\nfunction switchLayout() {\n  if (__webpack_require__.g.layout === 'en') __webpack_require__.g.layout = 'ru';\n  else __webpack_require__.g.layout = 'en';\n  localStorage.layout = __webpack_require__.g.layout;\n  (0,_keyboard_render__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n}\n\n\n//# sourceURL=webpack://virtual-keyboard/./src/modules/layout-switch.js?");

/***/ }),

/***/ "./src/modules/notes.js":
/*!******************************!*\
  !*** ./src/modules/notes.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"B\": () => (/* binding */ B),\n/* harmony export */   \"Cd\": () => (/* binding */ Cd),\n/* harmony export */   \"D\": () => (/* binding */ D),\n/* harmony export */   \"E\": () => (/* binding */ E),\n/* harmony export */   \"Fd\": () => (/* binding */ Fd),\n/* harmony export */   \"G\": () => (/* binding */ G),\n/* harmony export */   \"pain\": () => (/* binding */ pain),\n/* harmony export */   \"pptr\": () => (/* binding */ pptr)\n/* harmony export */ });\nconst pptr = { prop: 0 };\nconst B = 493.9;\nconst Fd = 740.0;\nconst G = 784.0;\nconst E = 659.3;\nconst Cd = 554.4;\nconst D = 587.3;\n\nconst pain = [\n  B, Fd, E, G, Fd, E, Fd, E, Fd, G, G, Fd, E,\n  B, Fd, B, G, Fd, E, D, E, D, Cd, Cd, D, Cd];\n\n\n//# sourceURL=webpack://virtual-keyboard/./src/modules/notes.js?");

/***/ }),

/***/ "./src/modules/textarea.js":
/*!*********************************!*\
  !*** ./src/modules/textarea.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ insertText)\n/* harmony export */ });\nfunction insertText(text) {\n  const val = __webpack_require__.g.textarea.value;\n  const pos = __webpack_require__.g.textarea.selectionStart;\n  __webpack_require__.g.textarea.value = val.slice(0, pos) + text + val.slice(pos);\n  __webpack_require__.g.textarea.selectionStart = pos + text.length;\n  __webpack_require__.g.textarea.selectionEnd = __webpack_require__.g.textarea.selectionStart;\n}\n\n\n//# sourceURL=webpack://virtual-keyboard/./src/modules/textarea.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;