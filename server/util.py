import numpy as np
from PIL import Image
import tensorflow as tf
from keras.preprocessing.image import img_to_array


def preprocess_image(image):
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image = image.resize((224, 224))
    img_array = np.array(image)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array