import { Keys } from './keys';

export default function renderKeyboard() {
  global.elKeyboard.innerHTML = '';

  for (let row = 0; row <= 5; row += 1) {
    const elRow = document.createElement('div');
    let elKeyHalfContainer;
    if (row === 0) {
      elRow.classList.add('touch-bar');
    } else {
      elRow.classList.add('row');
    }
    for (const keyCode of Object.keys(Keys[global.layout])) {
      if (Keys[global.layout][keyCode].row === row) {
        const elKey = document.createElement('div');
        const keyInfo = Keys[global.layout][keyCode];
        elKey.classList.add('key');
        if (keyInfo.row === 0) {
          elKey.classList.add('emoji');
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
        elKey.id = `key-${keyCode}`;
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
          const elShift = document.createElement('span');
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

    global.elKeyboard.append(elRow);
  }
}
