function setHeight(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 2 + 'px';
}

export function handleTextareaAutosize(selector) {
  const textarea = document.querySelectorAll('.textarea__field_autosize');

  textarea.forEach((t) => {
    t.addEventListener('input', () => setHeight(t));

    // "Разворачиваем поле" при загрузке страницы (если в поле есть текст)
    setHeight(t);
  })
}