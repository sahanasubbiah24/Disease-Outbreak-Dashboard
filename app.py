from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/map-data")
def map_data():
    df = pd.read_csv("data/diesease_data.csv", encoding="latin1")

    data = []

    for index, row in df.iterrows():
        state = str(row["State"]).replace("\x86", "").strip()

        if state == "U.S. Total":
            continue

        data.append({
            "state": state,
            "cases_2023": int(str(row["2023"]).replace(",", ""))
        })

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)