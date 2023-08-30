"""Handle container requests."""

import arrow
import porto
import flask
from porto.api.model import get_db, check_session


@porto.app.route("/api/v1/containers/")
def get_all_containers():
    connection = get_db()
    cur = connection.execute("SELECT * FROM containers", ())

    containers = cur.fetchall()

    for container in containers:
        c_id = container["id"]
        cur = connection.execute(
            "SELECT * FROM tags_to_containers WHERE cId = ?", (c_id,)
        )
        tags = cur.fetchall()

        container["tags"] = []
        for tag in tags:
            t_id = tag["id"]
            cur = connection.execute("SELECT * FROM tags WHERE id = ?", (t_id,))
            container["tags"].append(cur.fetchone())
            pass
        pass

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

    keys = ["name", "content", "id"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    name = body["name"]
    container_id = body["id"]
    content = body["content"]
    ts = arrow.utcnow().format()

    connection = get_db()
    cur = connection.execute(
        "UPDATE containers"
        "SET name = ?, content = ?, created = ?"
        "WHERE id = ? AND owner = ?",
        (
            name,
            content,
            ts,
            container_id,
            logname,
        ),
    )
    cur.fetchone()

    data = body
    data["ts"] = arrow.utcnow().humanize()

    return flask.jsonify(data), 201


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

    keys = ["name", "content"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    name = body["name"]
    content = body["content"]

    connection = get_db()
    cur = connection.execute(
        "INSERT INTO containers (owner, name, content) VALUES (?, ?, ?)",
        (
            logname,
            name,
            content,
        ),
    )
    cur.fetchone()

    return flask.Response(status=204)
