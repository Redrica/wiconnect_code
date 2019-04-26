'use strict';

(function () {

  /* Header */

  const header = document.querySelector('.header');
  header.classList.add('header--user-logged');

  /* Upload process */

  const chooser = document.querySelector('#file');
  const preview = document.querySelector('#file_preview');

  const createElement = function (tag, className1, className2) {
    let element = document.createElement(tag);
    element.classList.add(className1, className2);
    return element;
  };

  chooser.addEventListener('change', function () {
    let files = chooser.files;

    const setPreview = function (file) {

      let fileName = file.name.toLowerCase();
      let fileSize = file.size + ' Kb';

      let fileItemElem = createElement('li', 'file-list__item');

      let filePicElem = createElement('img', 'file-list__filepic');
      fileItemElem.appendChild(filePicElem);

      let fileNameElem = createElement('span', 'file-list__filename');
      fileNameElem.textContent = fileName;
      fileItemElem.appendChild(fileNameElem);

      let fileSizeElem = createElement('span', 'file-list__filesize');
      fileSizeElem.textContent = fileSize;
      fileItemElem.appendChild(fileSizeElem);

      let fileDeleteElem = createElement('button', 'file-list__delete');
      fileDeleteElem.addEventListener('click', function () {
        preview.removeChild(fileItemElem);
      });
      fileItemElem.appendChild(fileDeleteElem);

      let fileProcess = createElement('div', 'file-list__process');
      let fileProgress = createElement('progress', 'file-list__progress');
      let filePercent = createElement('span', 'file-list__percent');
      fileProcess.appendChild(fileProgress);
      fileProcess.appendChild(filePercent);
      fileItemElem.appendChild(fileProcess);

      preview.appendChild(fileItemElem);

      let reader = new FileReader();

      reader.onload = function () {
        filePicElem.src = reader.result;
      };

      reader.readAsDataURL(file);

      let xhr = new XMLHttpRequest();
      let formData = new FormData();

      formData.append('file', chooser.files[0]);

      xhr.upload.onloadstart = function (evt) {
        fileItemElem.classList.add('file-list__item--loading');
        fileProgress.value = 0;
        fileProgress.max = evt.total;
      };

      xhr.upload.onprogress = function (evt) {
        fileProgress.value = evt.loaded;
        fileProgress.max = evt.total;
        filePercent.textContent = Math.floor(evt.loaded / evt.total * 100) + ' %';
      };

      xhr.upload.onloadend = function () {
        fileItemElem.classList.remove('file-list__item--loading');
      };

      xhr.open('POST', 'catch-file.js', true);
      xhr.send(formData);

    };

    if (files) {
      Array.prototype.forEach.call(files, setPreview);
    }

  });

})();
