let textarea = document.querySelector('textarea'),
    // Контейнер, куда рендерится клавиатура функцией renderKeyboard()
    elKeyboard = document.getElementById('keyboard');
    // Раскладка хранится в localStorage, ключ "layout". Если её туда ещё не записали, то используем дефолтное значение "en"
    layout = localStorage.layout ?? 'en',
    // Включен ли наш "виртуальный" CapsLock
    isCapsLock = false;

// KeyboardEvent.code: {char?, shift?, show?, row}
// char: какой символ вставить
// shift: какой символ вставить с шифтом (показывается рядом). Если свойства нет, то вставляется char.upper()
// show: что показать на клавише (если свойство отсутствует, то показывается char)
// row: какой ряд
// class: какой дополнительный класс навесить клавише    
const Keys_en = {
    '😅': { char: '😅', row: 0 },
    '😂': { char: '😂', row: 0 },
    '🤯': { char: '🤯', row: 0 },
    '🤬': { char: '🤬', row: 0 },
    '🤢': { char: '🤢', row: 0 },
    '🤮': { char: '🤮', row: 0 },
    '💩': { char: '💩', row: 0 },
    '🤡': { char: '🤡', row: 0 },
    '👺': { char: '👺', row: 0 },
    '👻': { char: '👻', row: 0 },
    '❓': { char: '❓', row: 0 },
    '❗': { char: '❗', row: 0 },
    '👉': { char: '👉', row: 0 },
    '🖕': { char: '🖕', row: 0 },
    '👈': { char: '👈', row: 0 },
    '👅': { char: '👅', row: 0 },
    '🦄': { char: '🦄', row: 0 },
    '🐁': { char: '🐁', row: 0 },
    '😎': { char: '😎', row: 0 },
    '🤓': { char: '🤓', row: 0 },
    '🌻': { char: '🌻', row: 0 },
    '🕊': { char: '🕊', row: 0 },
    '💙': { char: '💙', row: 0 },
    '💛': { char: '💛', row: 0 },
    '🧡': { char: '🧡', row: 0 },
    '💚': { char: '💚', row: 0 },
    '💜': { char: '💜', row: 0 },
    '🤝': { char: '🤝', row: 0 },
    '🐞': { char: '🐞', row: 0 },
    '🐢': { char: '🐢', row: 0 },
    '🤘': { char: '🤘', row: 0 },
    '✊': { char: '✊', row: 0 },

    Backquote: { char: '`', shift: '~', row: 1 },
    Digit1: { char: '1', shift: '!', row: 1 },
    Digit2: { char: '2', shift: '@', row: 1 },
    Digit3: { char: '3', shift: '#', row: 1 },
    Digit4: { char: '4', shift: '$', row: 1 },
    Digit5: { char: '5', shift: '%', row: 1 },
    Digit6: { char: '6', shift: '^', row: 1 },
    Digit7: { char: '7', shift: '&', row: 1 },
    Digit8: { char: '8', shift: '*', row: 1 },
    Digit9: { char: '9', shift: '(', row: 1 },
    Digit0: { char: '0', shift: ')', row: 1 },
    Minus: { char: '-', shift: '_', row: 1 },
    Equal: { char: '=', shift: '+', row: 1 },
    Backspace: { show: 'delete', row: 1 },

    Tab: { show: 'tab', row: 2 },
    KeyQ: { char: 'q', row: 2 },
    KeyW: { char: 'w', row: 2 },
    KeyE: { char: 'e', row: 2 },
    KeyR: { char: 'r', row: 2 },
    KeyT: { char: 't', row: 2 },
    KeyY: { char: 'y', row: 2 },
    KeyU: { char: 'u', row: 2 },
    KeyI: { char: 'i', row: 2 },
    KeyO: { char: 'o', row: 2 },
    KeyP: { char: 'p', row: 2 },
    BracketLeft: { char: '[', shift: '{', row: 2 },
    BracketRight: { char: ']', shift: '}', row: 2 },
    Backslash: { char: '\\', shift: '|', row: 2 },

    CapsLock: { show: 'caps lock', row: 3, class: 'activatable' },
    KeyA: { char: 'a', row: 3 },
    KeyS: { char: 's', row: 3 },
    KeyD: { char: 'd', row: 3 },
    KeyF: { char: 'f', row: 3 },
    KeyG: { char: 'g', row: 3 },
    KeyH: { char: 'h', row: 3 },
    KeyJ: { char: 'j', row: 3 },
    KeyK: { char: 'k', row: 3 },
    KeyL: { char: 'l', row: 3 },
    Semicolon: { char: ';', shift: ':', row: 3 },
    Quote: { char: '\'', shift: '"', row: 3 },
    Enter: { show: 'return', shift: 'enter', row: 3 },

    ShiftLeft: { show: 'shift', row: 4 },
    KeyZ: { char: 'z', row: 4 },
    KeyX: { char: 'x', row: 4 },
    KeyC: { char: 'c', row: 4 },
    KeyV: { char: 'v', row: 4 },
    KeyB: { char: 'b', row: 4 },
    KeyN: { char: 'n', row: 4 },
    KeyM: { char: 'm', row: 4 },
    Comma: { char: ',', shift: '<', row: 4 },
    Period: { char: '.', shift: '>', row: 4 },
    Slash: { char: '/', shift: '?', row: 4 },
    ShiftRight: { show: 'shift', row: 4 },

    Fn: { show: 'fn', row: 5 },
    ControlLeft: { show: 'control', row: 5 },
    AltLeft: { show: 'option', shift: 'alt', row: 5 },
    MetaLeft: { show: 'command', row: 5 },
    Space: { show: '', char: ' ', row: 5 },
    MetaRight: { show: 'command', row: 5 },
    AltRight: { show: 'option', shift: 'alt', row: 5 },
    ArrowLeft: { show: '&larr;', row: 5 },
    ArrowUp: { show: '&uarr;', row: 5, class: 'half-key' },
    ArrowDown: { show: '&darr;', row: 5, class: 'half-key' },
    ArrowRight: { show: '&rarr;', row: 5 },
};

const Keys_ru = {
    '😅': { char: '😅', row: 0 },
    '😂': { char: '😂', row: 0 },
    '🤯': { char: '🤯', row: 0 },
    '🤬': { char: '🤬', row: 0 },
    '🤢': { char: '🤢', row: 0 },
    '🤮': { char: '🤮', row: 0 },
    '💩': { char: '💩', row: 0 },
    '🤡': { char: '🤡', row: 0 },
    '👺': { char: '👺', row: 0 },
    '👻': { char: '👻', row: 0 },
    '❓': { char: '❓', row: 0 },
    '❗': { char: '❗', row: 0 },
    '👉': { char: '👉', row: 0 },
    '🖕': { char: '🖕', row: 0 },
    '👈': { char: '👈', row: 0 },
    '👅': { char: '👅', row: 0 },
    '🦄': { char: '🦄', row: 0 },
    '🐁': { char: '🐁', row: 0 },
    '😎': { char: '😎', row: 0 },
    '🤓': { char: '🤓', row: 0 },
    '🌻': { char: '🌻', row: 0 },
    '🕊': { char: '🕊', row: 0 },
    '💙': { char: '💙', row: 0 },
    '💛': { char: '💛', row: 0 },
    '🧡': { char: '🧡', row: 0 },
    '💚': { char: '💚', row: 0 },
    '💜': { char: '💜', row: 0 },
    '🤝': { char: '🤝', row: 0 },
    '🐞': { char: '🐞', row: 0 },
    '🐢': { char: '🐢', row: 0 },
    '🤘': { char: '🤘', row: 0 },
    '✊': { char: '✊', row: 0 },

    Backquote: { char: ']', shift: '[', row: 1 },
    Digit1: { char: '1', shift: '!', row: 1 },
    Digit2: { char: '2', shift: '"', row: 1 },
    Digit3: { char: '3', shift: '№', row: 1 },
    Digit4: { char: '4', shift: '%', row: 1 },
    Digit5: { char: '5', shift: ':', row: 1 },
    Digit6: { char: '6', shift: ',', row: 1 },
    Digit7: { char: '7', shift: '.', row: 1 },
    Digit8: { char: '8', shift: ';', row: 1 },
    Digit9: { char: '9', shift: '(', row: 1 },
    Digit0: { char: '0', shift: ')', row: 1 },
    Minus: { char: '-', shift: '_', row: 1 },
    Equal: { char: '=', shift: '+', row: 1 },
    Backspace: { show: 'delete', row: 1 },

    Tab: { show: 'tab', row: 2 },
    KeyQ: { char: 'й', row: 2 },
    KeyW: { char: 'ц', row: 2 },
    KeyE: { char: 'у', row: 2 },
    KeyR: { char: 'к', row: 2 },
    KeyT: { char: 'е', row: 2 },
    KeyY: { char: 'н', row: 2 },
    KeyU: { char: 'г', row: 2 },
    KeyI: { char: 'ш', row: 2 },
    KeyO: { char: 'щ', row: 2 },
    KeyP: { char: 'з', row: 2 },
    BracketLeft: { char: 'х', row: 2 },
    BracketRight: { char: 'ъ', row: 2 },
    Backslash: { char: 'ё', row: 2 },

    CapsLock: { show: 'caps lock', row: 3, class: 'activatable' },
    KeyA: { char: 'ф', row: 3 },
    KeyS: { char: 'ы', row: 3 },
    KeyD: { char: 'в', row: 3 },
    KeyF: { char: 'а', row: 3 },
    KeyG: { char: 'п', row: 3 },
    KeyH: { char: 'р', row: 3 },
    KeyJ: { char: 'о', row: 3 },
    KeyK: { char: 'л', row: 3 },
    KeyL: { char: 'д', row: 3 },
    Semicolon: { char: 'ж', row: 3 },
    Quote: { char: 'э', row: 3 },
    Enter: { show: 'return', row: 3 },

    ShiftLeft: { show: 'shift', row: 4 },
    KeyZ: { char: 'я', row: 4 },
    KeyX: { char: 'ч', row: 4 },
    KeyC: { char: 'с', row: 4 },
    KeyV: { char: 'м', row: 4 },
    KeyB: { char: 'и', row: 4 },
    KeyN: { char: 'т', row: 4 },
    KeyM: { char: 'ь', row: 4 },
    Comma: { char: 'б', row: 4 },
    Period: { char: 'ю', row: 4 },
    Slash: { char: '/', shift: '?', row: 4 },
    ShiftRight: { show: 'shift', row: 4 },

    Fn: { show: 'fn', row: 5 },
    ControlLeft: { show: 'control', row: 5 },
    AltLeft: { show: 'option', row: 5 },
    MetaLeft: { show: 'command', row: 5 },
    Space: { show: '', char: ' ', row: 5 },
    MetaRight: { show: 'command', row: 5 },
    AltRight: { show: 'option', row: 5 },
    ArrowLeft: { show: '&larr;', row: 5 },
    ArrowUp: { show: '&uarr;', row: 5, class: 'half-key' },
    ArrowDown: { show: '&darr;', row: 5, class: 'half-key' },
    ArrowRight: { show: '&rarr;', row: 5 },
};

const Keys = {
  en: Keys_en,
  ru: Keys_ru
};

let pptr = 0,
      B = 493.9,
      Fd = 740.0,
      G = 784.0,
      E = 659.3,
      C = 523.3,
      Cd = 554.4,
      D = 587.3;

// B F# B G E F# G G F# E B B F# B G F# E D E D C C D C B
const pain = [B, Fd, E, G, Fd, E, Fd, E, Fd, G, G, Fd, E, B, Fd, B, G, Fd, E, D, E, D, Cd, Cd, D, Cd, B];


// Рендерит страницу
function renderLayout() {
    let title = document.createElement('h1');
    title.classList.add('title');
    title.innerHTML = 'virtual keyboard mac';
    document.body.append(title);

    textarea = document.createElement('textarea');
    textarea.classList.add('textarea');
    textarea.rows = 4;
    textarea.placeholder = 'type something...';
    document.body.append(textarea);

    elKeyboard = document.createElement('div');
    elKeyboard.classList.add('keyboard')
    document.body.append(elKeyboard);

    let elHint = document.createElement('p');
    elHint.classList.add('hint');
    elHint.innerHTML = 'switch language <strong>ctrl+shift</strong>';
    document.body.append(elHint);

    let elDeleteHint = document.createElement('p');
    elDeleteHint.classList.add('delete-hint');
    elDeleteHint.innerHTML = '<strong>delete</strong> removes character before the text cursor<br><strong>shift + delete</strong> removes character after';
    document.body.append(elDeleteHint);
    
    let elMusicHint = document.createElement('p');
    elMusicHint.classList.add('music-hint');
    elMusicHint.innerHTML = 'and <strong>sound on</strong>, it\'s made with some <strong>pain</strong> :)';
    document.body.append(elMusicHint);
};

// Рендерит клавиатуру в текущей раскладке в elKeyboard и перерендеривает её при смене раскладки
function renderKeyboard() {
    elKeyboard.innerHTML = '';

    for (let row = 0; row <= 5; row++) {
        let elRow = document.createElement('div'), 
            elKeyHalfContainer;
        if (row === 0) {
            elRow.classList.add('touch-bar')
        } else {
            elRow.classList.add('row');
        }
        
        for (let keyCode in Keys[layout]) {
            if (Keys[layout][keyCode].row === row) {  
                let elKey = document.createElement('div');
                let keyInfo = Keys[layout][keyCode];
                elKey.classList.add('key');
                if (keyInfo.row === 0) {
                    elKey.classList.add('emoji')
                }
                if (keyInfo.char === undefined) {
                    elKey.classList.add('modifier');
                }
                if (keyInfo.class === 'activatable') {
                    elKey.classList.add(keyInfo.class);
                }
                if (keyInfo.class === 'half-key') {
                    elKey.classList.add(keyInfo.class);
                }
                elKey.id = 'key-' + keyCode;

                if (keyInfo.show) {
                  elKey.innerHTML = keyInfo.show;
                } else {
                  elKey.innerHTML = keyInfo.char.toUpperCase();
                }

                if (keyCode === 'ArrowUp') {
                    elKeyHalfContainer = document.createElement('div');
                    elRow.append(elKeyHalfContainer);
                }

                if (keyInfo.shift) {
                    let elShift = document.createElement('span');
                    elShift.innerHTML = keyInfo.shift;
                    elKey.append(elShift);
                }

                if (keyCode === 'ArrowUp' || keyCode === 'ArrowDown') {
                    elKeyHalfContainer.append(elKey);

                } else {
                    elRow.append(elKey);
                }
            }
        }    
        elKeyboard.append(elRow);
    }
};

// Вставляет в textarea текст text в позиции курсора
function insertText(text) {
    let val = textarea.value, pos = textarea.selectionStart;
    textarea.value = val.slice(0, pos) + text + val.slice(pos);
    textarea.selectionStart = pos + text.length;
    textarea.selectionEnd = textarea.selectionStart;
};

// Переключает раскладку и запоминает её в localStorage
function switchLayout() {
    if (layout === 'en') layout = 'ru';
    else layout = 'en';
    localStorage.layout = layout;
    console.log('switchLayout', layout);
    renderKeyboard();
};

// Обработчик нажатия на клавишу
function keyDownHendler(e) {
    console.log('keydown: code=%s [ctrl=%s] selectionStart=%s', e.code, e.ctrlKey, textarea.selectionStart);
    let elKey = document.getElementById('key-' + e.code);
    let val;
    let context = new AudioContext();
    let o = context.createOscillator()
    o.frequency.value = pain[pptr++];
    pptr %= pain.length;
    o.type = "sine"
    o.connect(context.destination)
    o.start()
    setTimeout(() => {o.stop()}, 100)

    if (elKey) {
        elKey.classList.add('active');
    }
    // Особые клавиши
    switch (e.code) {
        case 'ArrowLeft':
            textarea.selectionStart--;
            textarea.selectionEnd = textarea.selectionStart;
            break;
        case 'ArrowRight':
            textarea.selectionStart++;
            textarea.selectionEnd = textarea.selectionStart;
            break;
        case 'ArrowUp':
            insertText('▲');
            break;
        case 'ArrowDown':
            insertText('▼');
            break;
        case 'Tab':
            insertText('    ');
            break;
        case 'Enter':
            insertText('\n');
            break;
        case 'Backspace':
            val = textarea.value, pos = textarea.selectionStart;
            if (e.shiftKey) {
                val = textarea.value, pos = textarea.selectionStart;
                if (pos < val.length ) {
                    textarea.value = val.slice(0, pos) + val.slice(pos + 1);
                    textarea.selectionStart = pos;
                    textarea.selectionEnd = textarea.selectionStart;
                }
            } else {
                if (pos > 0) {
                    textarea.value = val.slice(0, pos - 1) + val.slice(pos);
                    textarea.selectionStart = pos - 1;
                    textarea.selectionEnd = textarea.selectionStart;
                }
            }
            break;
        case 'ShiftLeft':
            // Переключаем раскладку по Ctrl+Shift (левый);
            if (e.ctrlKey) {
                switchLayout();
            }
            break;
        case 'CapsLock':
            isCapsLock = !isCapsLock;
            // if (isCapsLock) {
            //     document.getElementById('key-CapsLock').classList.add('on');
            // } else {
            //     document.getElementById('key-CapsLock').classList.remove('on');
            // }
            break;
        default:
            let keyInfo = Keys[layout][e.code];
            if (keyInfo !== undefined && keyInfo.char) {
                if (e.shiftKey && !isCapsLock || !e.shiftKey && isCapsLock) {
                    insertText(keyInfo.shift ? keyInfo.shift : keyInfo.char.toUpperCase());
                } else {
                    insertText(keyInfo.char);
                }
            }
    }
    textarea.focus();
};

function keyUpHendler(e) {
    console.log('keyup: code=%s', e.code);
    let elKey =  document.getElementById('key-' + e.code);
    if (elKey) {
        elKey.classList.remove('active');
    }
};

function keyboardMouseDownHandler(e) {
    console.log('click')
    textarea.focus();
    // Поднимаемся вверх до div.key
    let target = e.target;
    while (target && target != document && !( match = target.matches('div.key'))) {
        target = target.parentNode;
    }
    if (!match) return;
    window.dispatchEvent(new KeyboardEvent('keydown', {code: target.id.slice(4), shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey}));
};

function keyboardMouseUpHandler(e) {
    // Поднимаемся вверх до div.key
    let target = e.target;
    while (target && target != document && !( match = target.matches('div.key'))) {
        target = target.parentNode;
    }
    if (!match) return;
    let key = target.id.slice(4);
    if (key === 'CapsLock' && isCapsLock) {
        return;
    }
    window.dispatchEvent(new KeyboardEvent('keyup', {code: key}));
};

function init() {
    renderLayout();
    renderKeyboard();
    window.addEventListener('keydown', keyDownHendler);
    window.addEventListener('keyup', keyUpHendler);
    elKeyboard.addEventListener('mousedown', keyboardMouseDownHandler);
    elKeyboard.addEventListener('mouseup', keyboardMouseUpHandler);
    // elKeyboard.addEventListener('mousedown', touchbarMouseDownHandler);
    // elKeyboard.addEventListener('mouseup', touchbarMouseUpHandler);
    textarea.focus();
    // Блокируем ввод текста в textarea естественным образом
    textarea.addEventListener('keydown', e => e.preventDefault());
    textarea.addEventListener('keyup', e => e.preventDefault());
    textarea.addEventListener('keypress', e => e.preventDefault());
};

window.onload = init;