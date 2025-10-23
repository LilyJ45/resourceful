import sqlite3

def dict_factory(cursor, row):
    fields = []
    # Extract column names from cursor description
    for column in cursor.description:
        fields.append(column[0])

    # Create a dictionary where keys are column names and values are row values
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict

class DB:
    def __init__(self, dbfilename):
        self.dbfilename = dbfilename
        self.connection = sqlite3.connect(dbfilename)
        self.cursor = self.connection.cursor()

    def readAllRecords(self):
        self.cursor.execute("SELECT * FROM posts")
        rows = self.cursor.fetchall()
        all = []
        for row in rows:
            d = dict_factory(self.cursor, row)
            all.append(d)
        print ("the posts are", all)
        return all

    def saveRecord(self, record):
        data = [record["region"], record["post"]]
        self.cursor.execute("INSERT INTO posts (region, post) VALUES (?, ?);", data)
        self.connection.commit()

    def deleteRecord(self, id): 
        self.cursor.execute("DELETE FROM posts WHERE id = ?;", [id])
        self.connection.commit()

    def editRecord(self, id, record):
        data = [record["region"], record["post"], id]
        self.cursor.execute("UPDATE posts SET region =?, post=? WHERE id = ?;", data)
        self.connection.commit()

    def close(self):
        self.connection.close()

if __name__ == "__main__":
    db = DB("posts.db")
    db.readAllRecords()
    db.saveRecord(1)
    db.readAllRecords()
    db.close