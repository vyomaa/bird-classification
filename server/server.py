from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from keras.models import load_model
from PIL import Image
import json
import numpy as np
import os
from util import preprocess_image
import keras
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model_path = os.path.join('server/artifacts', 'model.h5')
model = keras.models.load_model(model_path, custom_objects={'F1_score':'F1_score'})

with open(os.path.join('server/artifacts', 'bird_names.json')) as f:
    bird_names = json.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image']
    image = Image.open(image_file.stream)
    
    preprocessed_image = preprocess_image(image)
    
    predictions = model.predict(preprocessed_image)
    predicted_class = np.argmax(predictions, axis=1)[0]
    predicted_class_str = str(predicted_class)
    label = bird_names[predicted_class_str]['label'].title()
    scientific_name = bird_names[predicted_class_str]['scientific_name'].title()
    confidence = float(np.max(predictions, axis=1)[0])

    return jsonify({
        'label': label,
        'scientific_name': scientific_name,
        'confidence': confidence
    })

if __name__ == '__main__':
    app.run()