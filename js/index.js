'use strict';

(function () {
  var SERVER = 'http://172.17.183.8:8000/apis/';
  var file, modelName, i;

  var mf = document.getElementById('mf');
  var models = document.querySelectorAll('div.model');
  var modelSelection = document.getElementById('model-selection');

  var inputFileName = document.getElementById('filename');
  var inputFile = document.getElementById('file');

  var btnModelSend = document.getElementById('btn-model-send');
  var btnModelCancel = document.getElementById('btn-model-cancel');

  var btnResult = document.getElementById('btn-result');
  var modelId = document.getElementById('modelId');
  var modelResult = document.getElementById('model-result');

  var modelSelectionSend = function () {
    var data, modelType;

    if (!file) {
      alert('You haven\'t upload a file');
      return;
    }

    console.log(file);

    data = new FormData();
    data.append('file', file);

    if (this.childNodes[3]) {
      switch (this.childNodes[3].innerHTML) {
        case 'Popularity':
          modelType = 'popularity';
          break;
        case 'Item-Similarity':
          modelType = 'item_similarity';
          break;
        case 'Factorization Model':
          modelType = 'default';
          break;
        default:
      }
    } else {
      modelType = 'mf';
    }

    modelName = file.name + '_' + modelType + '.model';
    modelId.innerHTML = modelName;
    file = null;
    inputFile.value = null;
    inputFileName.value = null;

    $.ajax({
      url: SERVER + 'upload?model=' + modelType,
      type: 'POST',
      data: data,
      dataType: 'json',
      processData: false, // Don't process the files
      contentType: false, // Set content type to false as jQuery will tell the server its a query string request
      success: function (responseData, status, jqXHR) {
        console.log(jqXHR);
        console.log(responseData, status);
      },
      error: function (jqXHR, status, errorThrown) {
        console.log(jqXHR);
        console.log('ERRORS: ' + status);
      }
    })
  };

  inputFile.addEventListener('change', function (event) {
    file = event.target.files[0];
    inputFileName.value = file.name;
  });

  for (i = 0; i < models.length; i += 1) {
    models[i].addEventListener('click', modelSelectionSend);
  }
  // models.map(function (model, index) {
    // console.log(model);
  // });

  mf.addEventListener('click', function () {
    if (!file) {
      alert('You haven\'t upload a file');
      return;
    }
    modelSelection.classList.add('showModel');
  });

  btnModelSend.addEventListener('click', modelSelectionSend)
  btnModelSend.addEventListener('click', function () {
    modelSelection.classList.remove('showModel');
  });

  btnModelCancel.addEventListener('click', function () {
    modelSelection.classList.remove('showModel');
  });

  btnResult.addEventListener('click', function () {
    if (modelName) {
      modelResult.classList.toggle('showResult');
    }
  });
})();
