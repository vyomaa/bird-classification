document.addEventListener('DOMContentLoaded', (event) => {
    var form = document.getElementById('upload-form');
    var imageInput = document.getElementById('image-upload');
    var resultsDiv = document.getElementById('result');
    var uploadedImage = document.getElementById('uploaded-image');
    var label = document.getElementById('label');
    var scientificName = document.getElementById('scientific-name');
    var confidence = document.getElementById('confidence');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var file = imageInput.files[0];
            var formData = new FormData();
            formData.append('image', file);

            fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                uploadedImage.src = URL.createObjectURL(file);
                uploadedImage.style.display = 'block';

                label.innerText = 'Predicted Bird: ' + data.label;
                scientificName.innerText = 'Scientific Name: ' + data.scientific_name;
                //confidence.innerText = 'Confidence: ' + (data.confidence * 100).toFixed(2) + '%';
            })
            .catch(error => console.error('Error:', error));
        });
    } else {
        console.error('Form element not found.');
    }
});