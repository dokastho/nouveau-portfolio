import porto
import flask
from porto.api.model import check_session


@porto.app.route("/")
def show_index():
    """Render index for the site."""
    
    logname = check_session()
    context = {
        "admin": True
    }
    if not logname:
        context["admin"] = False
        pass

    return flask.render_template("page.html", **context)
