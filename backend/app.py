from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "Kalpanik backend running",
        "message": "Immersive mythological guidance engine"
    })

@app.route("/narrate", methods=["POST"])
def narrate():
    data = request.json

    scripture = data.get("scripture", "unknown")
    user_input = data.get("user_input", "")

    story = (
        "In the stillness before action, a seeker once paused.\n\n"
        "Like you, the seeker faced uncertainty and doubt.\n\n"
        "Clarity does not come from escape, but from steady action aligned with truth."
    )

    return jsonify({
        "scripture": scripture,
        "story": story
    })

if __name__ == "__main__":
    app.run(debug=True)
