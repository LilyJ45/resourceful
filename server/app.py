from flask import Flask
from flask import request
from dummydb import DummyDB

app = Flask(__name__)

@app.route("/home", methods=["GET"])
def get_feed():
    db = DummyDB("sampledb.txt")
    feed = db.readAllRecords()
    return feed, {"Access-Control-Allow-Origin":"*"}

@app.route("/home", methods=["POST"])
def create_post():
    db = DummyDB("sampledb.txt")
    print(request.form)
    d = {"region": request.form['region'],
        "post": request.form['post']
        }
    db.saveRecord(d)
    return "Created", 201, {"Access-Control-Allow-Origin":"*"}

@app.route("/home/region/<region_name>", methods=["GET"])
def get_feed_by_region(region_name):
    db = DummyDB("sampledb.txt")
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
