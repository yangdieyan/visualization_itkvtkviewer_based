import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract';

import getRootContainer from './getRootContainer';
import preventDefaults from './preventDefaults';

import style from './ItkVtkViewer.module.css';
import Mousetrap from 'mousetrap';

const MOUSETRAP = new Mousetrap();

function createFileDragAndDrop(container, onDataChange) {
  const myContainer = getRootContainer(container);

  const fileContainer = document.createElement('div');
  fileContainer.innerHTML = `<div class="${
    style.bigFileDrop
  }"/><input type="file" class="file" style="display: none;" multiple/>`;
  myContainer.appendChild(fileContainer);

  const fileInput = fileContainer.querySelector('input');

  MOUSETRAP.bind('enter', (event) => {
    fileInput.click();
  })

  function handleFile(e) {
    preventDefaults(e);
    MOUSETRAP.unbind('enter');
    const dataTransfer = e.dataTransfer;
    const files = e.target.files || dataTransfer.files;
    myContainer.removeChild(fileContainer);
    const use2D = !!vtkURLExtract.extractURLParameters().use2D;
    onDataChange(myContainer, { files, use2D })
      .catch((error) => {
        const message = 'An error occurred while loading the file:\n\n' + error.message
        alert(message);
        createFileDragAndDrop(container, onDataChange);
      })
  }

  fileInput.addEventListener('change', handleFile);
  fileContainer.addEventListener('drop', handleFile);
  fileContainer.addEventListener('click', (e) => fileInput.click());
  fileContainer.addEventListener('dragover', preventDefaults);
}

export default createFileDragAndDrop;
