function handleFileListClick(evt) {
  evt.preventDefault();

  if (evt.target.classList.contains('uploader__btn-delete')) {
    evt.target.closest('.uploader__item').remove();
  }
}

export function setFilesRemover() {
  const filesLists = document.querySelectorAll('.uploader__files-list');

  if (filesLists) {
    filesLists.forEach(filesList => {
      filesList.addEventListener('mousedown', handleFileListClick);
    })
  }
}