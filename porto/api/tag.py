"""Handle tag requests."""

import random
import arrow
import porto
import flask
from porto.api.model import get_db, check_session


def get_tags_for_container(c_id):
    connection = get_db()
    cur = connection.execute(
        "SELECT * FROM tags_to_containers WHERE cId = ?", (c_id,)
    )
    ids = cur.fetchall()
    tags = []
    for t_id in ids:
        cur = connection.execute(
            "SELECT * FROM tags WHERE id = ?", (t_id,)
        )
        tags.append(cur.fetchone())
        pass
    return tags


@porto.app.route("/api/v1/tags/update/", methods=["POST"])
def update_tag():
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass

    body = flask.request.get_json()
    if body is None:
        flask.abort(400)
        pass

    keys = ["name", "colorHex", "id"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    name = body["name"]
    tag_id = body["id"]
    color_hex = body["colorHex"]

    connection = get_db()
    cur = connection.execute(
        "UPDATE tags SET name = ?, colorHex = ? WHERE id = ? AND owner = ?",
        (
            name,
            color_hex,
            tag_id,
            logname,
        ),
    )
    cur.fetchone()
    
    cur = connection.execute(
        "SELECT * FROM tags WHERE id = ?", (tag_id,)
    )
    
    tag = cur.fetchone()

    return flask.jsonify(tag), 201


@porto.app.route("/api/v1/tags/delete/", methods=["POST"])
def delete_tag():
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

    tag_id = body["id"]

    connection = get_db()
    # delete from mapping table if cId present, delete outright if not
    if "containerId" in body:
        c_id = body["containerId"]
        cur = connection.execute(
            "DELETE FROM tags_to_containers WHERE tId = ? AND cId = ? AND owner = ?",
            (
                tag_id,
                c_id,
                logname,
            ),
        )
        cur.fetchall()
        pass

    else:
        cur = connection.execute(
            "DELETE FROM tags WHERE id = ? AND owner = ?",
            (
                tag_id,
                logname,
            ),
        )
        cur.fetchone()

        cur = connection.execute(
            "DELETE FROM tags_to_containers WHERE tId = ? AND owner = ?",
            (
                tag_id,
                logname,
            ),
        )
        cur.fetchall()
        pass

    return flask.Response(status=204)


@porto.app.route("/api/v1/tags/new/", methods=["POST"])
def create_tag():
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass

    body = flask.request.get_json()
    if body is None:
        flask.abort(400)
        pass

    keys = ["name"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    name = body["name"]
    color_hex = body["colorHex"]
    if color_hex is None:
        rint: int = random.randint() % 0xFFFFFF
        brint: bytes = rint.to_bytes()
        color_hex = brint.hex().upper()
        pass

    connection = get_db()
    cur = connection.execute(
        "INSERT INTO tags (owner, name, colorHex) VALUES (?, ?, ?)",
        (
            logname,
            name,
            color_hex,
        ),
    )
    cur.fetchone()

    if "containerId" in body:
        c_id = body["containerId"]
        cur = connection.execute(
            "SELECT id FROM tags WHERE name = ? AND owner = ?",
            (
                name,
                logname
            )
        )
        t_id = cur.fetchone()["id"]
        cur = connection.execute(
            "INSERT INTO tags_to_containers (tId, cId, owner) VALUES (?, ?, ?)",
            (
                t_id,
                c_id,
                logname,
            )
        )
        cur.fetchall()
        return flask.jsonify(get_tags_for_container(c_id)), 201

    else:
        cur = connection.execute(
            "SELECT * FROM tags", ()
        )
        tags = cur.fetchall()

        return flask.jsonify(tags), 201


@porto.app.route("/api/v1/tags/add/", methods=["POST"])
def add_tag():
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass

    body = flask.request.get_json()
    if body is None:
        flask.abort(400)
        pass

    keys = ["tagId", "containerId"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    t_id = body["t_id"]
    c_id = body["c_id"]

    connection = get_db()
    cur = connection.execute(
        "INSERT INTO tags_to_containers (tId, cId, owner) VALUES (?, ?, ?)",
        (
            t_id,
            c_id,
            logname,
        ),
    )
    cur.fetchone()

    return flask.jsonify(get_tags_for_container(c_id)), 201
