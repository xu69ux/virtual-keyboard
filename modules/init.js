import renderLayout from './layout-render';
import renderKeyboard from './keyboard-render';
import {
  keyDown, keyUp, keyboardMouseDown, keyboardMouseUp,
} from './handlers';

export default function init() {
  global.isCapsLock = false;
  global.layout = localStorage.layout ?? 'en';
  renderLayout();
  renderKeyboard();
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);
  global.elKeyboard.addEventListener('mousedown', keyboardMouseDown);
  global.elKeyboard.addEventListener('mouseup', keyboardMouseUp);
  global.textarea.focus();
  global.textarea.addEventListener('keydown', (e) => e.preventDefault());
  global.textarea.addEventListener('keyup', (e) => e.preventDefault());
  global.textarea.addEventListener('keypress', (e) => e.preventDefault());
}
