let textarea = document.querySelector('textarea'),
    // Контейнер, куда рендерится клавиатура функцией renderKeyboard()
    elKeyboard = document.getElementById('keyboard');
    layout = 'en';

// KeyboardEvent.code: {char?, shift?, show?, row}
// char: какой символ вставить
// shift: какой символ вставить с шифтом (показывается рядом). Если свойства нет, то вставляется char.upper()
// show: что показать на клавише (если свойство отсутствует, то показывается char)
// row: какой ряд
// class: какой дополнительный класс навесить клавише    
const Keys_en = {
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
    Enter: { show: 'return', row: 3 },

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
    Control: { show: 'control', row: 5 },
    OptionLeft: { show: 'option', row: 5 },
    CommandLeft: { show: 'command', row: 5 },
    Space: { show: '', char: ' ', row: 5 },
    CommandRight: { show: 'command', row: 5 },
    OptionRight: { show: 'option', row: 5 },
    ArrowLeft: { show: '&larr;', row: 5 },
    ArrowUp: { show: '&uarr;', row: 5, class: 'half-key' },
    ArrowDown: { show: '&darr;', row: 5, class: 'half-key' },
    ArrowRight: { show: '&rarr;', row: 5 },
};

const Keys_ru = {
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
    Enter: { show: 'enter', row: 3 },

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
    Control: { show: 'control', row: 5 },
    OptionLeft: { show: 'option', row: 5 },
    CommandLeft: { show: 'command', row: 5 },
    Space: { show: '', char: ' ', row: 5 },
    CommandRight: { show: 'command', row: 5 },
    OptionRight: { show: 'option', row: 5 },
    ArrowLeft: { show: '&larr;', row: 5 },
    ArrowUp: { show: '&uarr;', row: 5, class: 'half-key' },
    ArrowDown: { show: '&darr;', row: 5, class: 'half-key' },
    ArrowRight: { show: '&rarr;', row: 5 },
};

const Keys = {
  en: Keys_en,
  ru: Keys_ru
};

// Рендерит страницу
function renderLayout() {
    textarea = document.createElement('textarea');
    textarea.classList.add('textarea');
    textarea.rows = 4;
    document.body.append(textarea);

    elKeyboard = document.createElement('div');
    elKeyboard.classList.add('keyboard')
    document.body.append(elKeyboard);
};

// Рендерит клавиатуру в текущей раскладке в elKeyboard
function renderKeyboard() {
    elKeyboard.innerHTML = '';

    for (let row = 1; row <= 5; row++) {
        let elRow = document.createElement('div');
        elRow.classList.add('row');
        for (let keyCode in Keys[layout]) {
            if (Keys[layout][keyCode].row === row) {  
                let elKey = document.createElement('div');
                let keyInfo = Keys[layout][keyCode];
                elKey.classList.add('key');
                if (keyInfo.char === undefined) {
                    elKey.classList.add('modifier');
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
                elRow.append(elKey);
            }
        }    
        elKeyboard.append(elRow);
    }
};

function init() {
    renderLayout();
    renderKeyboard();
};

window.onload = init;