from flask import Flask
from flask import request
from db import DB

app = Flask(__name__)

@app.route("/posts/<int:id>", methods=["OPTIONS"])
def do_preflight(id):
    return '', 204, {"Access-Control-Allow-Origin":"*", 
                     "Access-Control-Allow-Methods":"PUT, DELETE", 
                     "Access-Control-Allow-Headers":"Content-Type"}

@app.route("/home", methods=["GET"])
def get_feed():
    db = DB("posts.db")
    feed = db.readAllRecords()
    return feed, {"Access-Control-Allow-Origin":"*"}

@app.route("/home", methods=["POST"])
def create_post():
    db = DB("posts.db")
    print(request.form)
    d = {"region": request.form['region'],
        "post": request.form['post']
        }
    db.saveRecord(d)
    return "Created", 201, {"Access-Control-Allow-Origin":"*"}

@app.route("/home/<int:id>", methods=["PUT"])
def edit_post(id):
    db = DB("posts.db")
    print(request.form)
    d = {"region": request.form['region'],
        "post": request.form['post']
        }
    db.editRecord(id, d)
    return "Edited", 200, {"Access-Control-Allow-Origin":"*"}

@app.route("/home/<int:id>", methods=["DELETE"])
def delete_post(id):
    print("I am deleteing the post: ", id)
    db = DB("posts.db")
    db.deleteRecord(id)
    return "Deleted", 200, {"Access-Control-Allow-Origin":"*"}

@app.route("/home/region/<region_name>", methods=["GET"])
def get_feed_by_region(region_name):
    db = DB("posts.db")
    all_posts = db.readAllRecords()
    filtered_posts = [post for post in all_posts if post['region'].lower() == region_name.lower()]
    return filtered_posts, {"Access-Control-Allow-Origin":"*"}

@app.errorhandler(404)
def not_found(error):
    return "<h1>Not Found</h1>" \
    "<p>The requested URL was not found on the server.</p>", 404

def main():
    app.run()

main()
