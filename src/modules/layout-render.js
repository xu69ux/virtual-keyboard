export default function renderLayout() {
  const title = document.createElement('h1');
  title.classList.add('title');
  title.innerHTML = 'virtual keyboard mac';
  document.body.append(title);

  global.textarea = document.createElement('textarea');
  global.textarea.classList.add('textarea');
  global.textarea.rows = 4;
  global.textarea.placeholder = 'type something...';
  document.body.append(global.textarea);

  global.elKeyboard = document.createElement('div');
  global.elKeyboard.classList.add('keyboard');
  document.body.append(global.elKeyboard);

  const elHint = document.createElement('p');
  elHint.classList.add('hint');
  elHint.innerHTML = 'switch language <strong>ctrl+shift</strong>';
  document.body.append(elHint);

  const elDeleteHint = document.createElement('p');
  elDeleteHint.classList.add('delete-hint');
  elDeleteHint.innerHTML = '<strong>delete</strong> removes character before the text cursor<br><strong>shift + delete</strong> removes character after';
  document.body.append(elDeleteHint);

  const elMusicHint = document.createElement('p');
  elMusicHint.classList.add('music-hint');
  elMusicHint.innerHTML = 'and <strong>sound on</strong>, it\'s made with some <strong>pain</strong> :)';
  document.body.append(elMusicHint);
}
