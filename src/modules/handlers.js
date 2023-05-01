import { Keys } from './keys';
import { pptr, pain } from './notes';
import insertText from './textarea';
import switchLayout from './layout-switch';

const handlers = {
  keyDown(e) {
    const elKey = document.getElementById(`key-${e.code}`);
    const keyInfo = Keys[global.layout][e.code];
    let val;
    let pos;
    if (!global.context) global.context = new AudioContext();
    const o = global.context.createOscillator();
    o.frequency.value = pain[pptr.prop];
    pptr.prop += 1;
    pptr.prop %= pain.length;
    o.type = 'sine';
    o.connect(global.context.destination);
    o.start();
    setTimeout(() => { o.stop(); }, 100);

    if (elKey) {
      elKey.classList.add('active');
    }
    // Особые клавиши
    switch (e.code) {
      case 'ArrowLeft':
        global.textarea.selectionStart -= 1;
        global.textarea.selectionEnd = global.textarea.selectionStart;
        break;
      case 'ArrowRight':
        global.textarea.selectionStart += 1;
        global.textarea.selectionEnd = global.textarea.selectionStart;
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
        val = global.textarea.value;
        pos = global.textarea.selectionStart;
        if (e.shiftKey) {
          val = global.textarea.value;
          pos = global.textarea.selectionStart;
          if (pos < val.length) {
            global.textarea.value = val.slice(0, pos) + val.slice(pos + 1);
            global.textarea.selectionStart = pos;
            global.textarea.selectionEnd = global.textarea.selectionStart;
          }
        } else if (pos > 0) {
          global.textarea.value = val.slice(0, pos - 1) + val.slice(pos);
          global.textarea.selectionStart = pos - 1;
          global.textarea.selectionEnd = global.textarea.selectionStart;
        }
        break;
      case 'ShiftLeft':
        // Переключаем раскладку по Ctrl+Shift (левый);
        if (e.ctrlKey) {
          switchLayout();
        }
        break;
      case 'CapsLock':
        global.isCapsLock = !global.isCapsLock;
        break;
      default:
        if (keyInfo !== undefined && keyInfo.char) {
          if ((e.shiftKey && !global.isCapsLock) || (!e.shiftKey && global.isCapsLock)) {
            insertText(keyInfo.shift ? keyInfo.shift : keyInfo.char.toUpperCase());
          } else {
            insertText(keyInfo.char);
          }
        }
    }
    global.textarea.focus();
  },
  keyUp(e) {
    const elKey = document.getElementById(`key-${e.code}`);
    if (elKey) {
      elKey.classList.remove('active');
    }
  },
  keyboardMouseDown(e) {
    global.textarea.focus();
    let { target } = e;
    let match;
    while (target && target !== document && !(match = target.matches('div.key'))) {
      target = target.parentNode;
    }
    if (!match) return;
    window.dispatchEvent(new KeyboardEvent('keydown', {
      code: target.id.slice(4), shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey,
    }));
  },
  keyboardMouseUp(e) {
    let { target } = e;
    let match;
    while (target && target !== document && !(match = target.matches('div.key'))) {
      target = target.parentNode;
    }
    if (!match) return;
    const key = target.id.slice(4);
    if (key === 'CapsLock' && global.isCapsLock) {
      return;
    }
    window.dispatchEvent(new KeyboardEvent('keyup', { code: key }));
  },
};

export const { keyDown } = handlers;
export const { keyUp } = handlers;
export const { keyboardMouseDown } = handlers;
export const { keyboardMouseUp } = handlers;
