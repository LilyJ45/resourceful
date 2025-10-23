# Project: Resourceful (ABSParents)

This project is a web app that implements a CRUD API for managing a resource. The frontend client allows users to post messages, view all posts, edit their posts, delete them, and filter the feed by region.

## Resource Definition

The resource for this application is a **Post**.

### Attributes
A `Post` resource has the following attributes:

* **id**: The unique identifier (Primary Key).
* **date**: The date the post was created (e.g., "2025-10-23").
* **author**: The name of the user who created the post.
* **region**: The geographic region associated with the post (e.g., "Utah", "California").
* **title**: The title of the post.
* **post**: The main text content of the post.

---

## Database Schema

The application uses an SQLite database (`posts.db`) with a single table, `posts`, to store the resource data.

**`CREATE TABLE` Query:**
```sql
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    author TEXT,
    region TEXT,
    title TEXT,
    post TEXT
);
```

---

## REST API Endpoints

The server API provides five full CRUD operations and one custom filter route.

* **List Posts**
    * **Method:** `GET`
    * **Path:** `/home`
    * **Description:** Returns a JSON array of all posts in the database.

* **Retrieve Single Post**
    * **Method:** `GET`
    * **Path:** `/home/<id>`
    * **Description:** Returns a JSON object for a single post specified by its `id`.

* **Create Post**
    * **Method:** `POST`
    * **Path:** `/home`
    * **Description:** Creates a new post. Expects `date`, `author`, `region`, `title`, and `post` in the form-encoded request body.

* **Update Post**
    * **Method:** `PUT`
    * **Path:** `/home/<id>`
    * **Description:** Updates an existing post specified by its `id`. Expects all five attributes in the form-encoded request body.

* **Delete Post**
    * **Method:** `DELETE`
    * **Path:** `/home/<id>`
    * **Description:** Deletes an existing post specified by its `id`.

* **Filter Posts by Region**
    * **Method:** `GET`
    * **Path:** `/home/region/<region_name>`
    * **Description:** Returns a JSON array of all posts that match the specified `region_name`.