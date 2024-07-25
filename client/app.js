document.addEventListener('DOMContentLoaded', (event) => {
    var form = document.getElementById('upload-form');
    var imageInput = document.getElementById('image-upload');
    var resultsDiv = document.getElementById('result');

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
                resultsDiv.innerHTML = `<p>Predicted Bird: ${data.label}</p>
                                        <p>Scientific Name: ${data.scientific_name}</p>`;
            })
            .catch(error => console.error('Error:', error));
        });
    } else {
        console.error('Form element not found.');
    }
});
