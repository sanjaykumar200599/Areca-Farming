from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from PIL import Image
from disease_info import disease_recommendations

app = Flask(__name__)
model = tf.keras.models.load_model("arecanut_model.h5")

# ✅ Make sure this matches EXACTLY with train_generator.class_indices
class_labels = [
    'BlackSpot_Fruit', 'Blackspot_Leaf', 'Blackspot_Stem',
    'Healthy_Hingara_1', 'Healthy_Hingara_2', 'Stem_bleeding',
    'anabe', 'black_pingara', 'healthy_fruit', 'healthy_leaf',
    'healthy_trunk', 'mite', 'mundu_siri', 'redpalm_weevil', 'scale_insect'
]


@app.route('/')
def home():
    return "🌴 Arecanut Disease Detection API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    img_file = request.files['image']
    img_path = os.path.join("temp", img_file.filename)
    os.makedirs("temp", exist_ok=True)
    img_file.save(img_path)

    # ✅ PREPROCESS EXACTLY LIKE COLAB
    img = Image.open(img_path).convert("RGB")  # Ensure RGB
    img = img.resize((224, 224))  # Same as IMAGE_SIZE in training
    img_array = np.array(img) / 255.0  # Normalize like ImageDataGenerator
    img_array = np.expand_dims(img_array, axis=0)

    # ✅ PREDICT
    preds = model.predict(img_array)
    predicted_index = np.argmax(preds)
    predicted_label = class_labels[predicted_index]
    confidence = float(np.max(preds)) * 100

    info = disease_recommendations.get(predicted_label, {"solution": "N/A", "prevention": "N/A"})

    return jsonify({
        "prediction": predicted_label,
        "confidence": f"{confidence:.2f}%",
        "solution": info["solution"],
        "prevention": info["prevention"]
    })



if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Render will set PORT automatically
    app.run(host='0.0.0.0', port=port, debug=False)
