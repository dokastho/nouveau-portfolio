"""Handle container requests."""

import arrow
import porto
import flask
from porto.api.model import get_db, check_session
from porto.api.tag import get_tags_for_container


def get_all_containers():
    connection = get_db()
    cur = connection.execute("SELECT * FROM containers", ())

    containers = cur.fetchall()

    for container in containers:
        container["ts"] = arrow.get(container["created"]).humanize()
        c_id = container["id"]
        container["tags"] = get_tags_for_container(c_id)

    return containers


def get_one_container(c_id):
    connection = get_db()
    cur = connection.execute("SELECT * FROM containers WHERE id = ?", (c_id,))
    container = cur.fetchone()

    container["ts"] = arrow.get(container["created"]).humanize()
    container["tags"] = get_tags_for_container(c_id)

    return container


@porto.app.route("/api/v1/containers/")
def fetch_containers():
    containers = get_all_containers()
    return flask.jsonify(containers), 201


@porto.app.route("/api/v1/containers/update/", methods=["POST"])
def update_container():
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass

    body = flask.request.get_json()
    if body is None:
        flask.abort(400)
        pass

    keys = ["name", "content", "css", "id"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    name = body["name"]
    container_id = body["id"]
    content = body["content"]
    css = body["css"]
    ts = arrow.utcnow().format()

    connection = get_db()
    cur = connection.execute(
        "UPDATE containers "
        "SET name = ?, content = ?, css = ?, created = ? "
        "WHERE id = ? AND owner = ?",
        (
            name,
            content,
            css,
            ts,
            container_id,
            logname,
        ),
    )
    cur.fetchone()

    return flask.jsonify(get_one_container(container_id)), 201


@porto.app.route("/api/v1/containers/delete/", methods=["POST"])
def delete_container():
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass

    body = flask.request.get_json()
    if body is None:
        flask.abort(400)
        pass

    keys = ["id"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    container_id = body["id"]

    connection = get_db()
    cur = connection.execute(
        "DELETE FROM containers WHERE id = ? AND owner = ?",
        (
            container_id,
            logname,
        ),
    )
    cur.fetchone()

    return flask.Response(status=204)


@porto.app.route("/api/v1/containers/new/", methods=["POST"])
def create_container():
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass

    body = flask.request.get_json()
    if body is None:
        flask.abort(400)
        pass

    keys = ["name", "content", "css", "topic"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    name = body["name"]
    content = body["content"]
    css = body["css"]
    topic = body["topic"]

    connection = get_db()
    cur = connection.execute(
        "INSERT INTO containers (owner, name, content, css, topic) VALUES (?, ?, ?, ?, ?)",
        (
            logname,
            name,
            content,
            css,
            topic,
        ),
    )
    cur.fetchone()

    return flask.jsonify(get_all_containers()), 201
