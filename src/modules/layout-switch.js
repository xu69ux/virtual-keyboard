import renderKeyboard from './keyboard-render';

export default function switchLayout() {
  if (global.layout === 'en') global.layout = 'ru';
  else global.layout = 'en';
  localStorage.layout = global.layout;
  renderKeyboard();
}
