"""Handle Image-related requests."""

import flask
import porto
import os

@porto.app.route("/api/v1/images/get/")
def fetch_images():
    photos_dir = porto.app.config['UPLOADS_FOLDER']
    images = os.listdir(photos_dir)
    return flask.jsonify(images), 201
