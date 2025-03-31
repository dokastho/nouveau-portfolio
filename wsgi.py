#!/home/dokastho/code/nouveau-portfolio/env/bin/python3

import flask
import porto

app = porto.app

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8002)
