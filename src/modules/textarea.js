export default function insertText(text) {
  const val = global.textarea.value;
  const pos = global.textarea.selectionStart;
  global.textarea.value = val.slice(0, pos) + text + val.slice(pos);
  global.textarea.selectionStart = pos + text.length;
  global.textarea.selectionEnd = global.textarea.selectionStart;
}
