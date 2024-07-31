document.addEventListener('DOMContentLoaded', (event) => {
    var form = document.getElementById('upload-form');
    var imageInput = document.getElementById('image-upload');
    var uploadButton = document.getElementById('upload-button');
    var resultsDiv = document.getElementById('result');
    var uploadedImage = document.getElementById('uploaded-image');
    var label = document.getElementById('label');
    var scientificName = document.getElementById('scientific-name');
    var confidence = document.getElementById('confidence');

    uploadButton.addEventListener('click', function() {
        imageInput.click();
    });

    imageInput.addEventListener('change', function() {
        var file = imageInput.files[0];
        var formData = new FormData();
        formData.append('image', file);

        fetch('/api/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            uploadedImage.src = URL.createObjectURL(file);
            uploadedImage.style.display = 'block';

            label.innerText = data.label;
            scientificName.innerText = 'Scientific Name: ' + data.scientific_name;
            confidence.innerText = 'Confidence: ' + (data.confidence * 100).toFixed(2) + '%';
        })
        .catch(error => console.error('Error:', error));
    });
});