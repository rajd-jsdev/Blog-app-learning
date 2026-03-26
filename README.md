# Blog-app-learning

This is learning Project

## Base URL

```
http://localhost:3000
```

---

## Authentication (User)

### Register

**POST** `/user/register`

**Request Body**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**Response**

```json
{
  "_id": "USER_ID",
  "email": "test@example.com"
}
```

---

### Login

**POST** `/user/login`

**Request Body**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**Response**

```json
{
  "message": "Login successful"
}
```

**Notes**

- JWT token is stored in an HTTP-only cookie.

---

### Logout

**POST** `/user/logout`

**Response**

```json
{
  "message": "Logged out"
}
```

---

### Get Current User (Protected)

**GET** `/user/me`

**Response**

```json
{
  "_id": "USER_ID",
  "email": "test@example.com"
}
```

---

## Posts

### Create Post (Protected)

**POST** `/post`

**Request Body**

```json
{
  "title": "My First Post",
  "desc": "Hello world"
}
```

**Response**

```json
{
  "_id": "POST_ID",
  "title": "My First Post",
  "desc": "Hello world",
  "author": "USER_ID"
}
```

---

### Get All Posts

**GET** `/post`

**Response**

```json
[
  {
    "_id": "POST_ID",
    "title": "My First Post",
    "desc": "Hello world"
  }
]
```

---

### Get Single Post

**GET** `/post/:id`

---

### Like Post (Protected)

**POST** `/post/:id/like`

---

## Comments (Nested Supported)

### Create Comment or Reply (Protected)

**POST** `/comment`

**Top-Level Comment**

```json
{
  "post": "POST_ID",
  "description": "This is a comment"
}
```

**Reply to Comment**

```json
{
  "post": "POST_ID",
  "description": "This is a reply",
  "parent": "COMMENT_ID"
}
```

---

### Get Nested Comments by Post

**GET** `/comment/post/:postId`

**Response**

```json
[
  {
    "_id": "1",
    "description": "Top comment",
    "replies": [
      {
        "_id": "2",
        "description": "Reply",
        "replies": []
      }
    ]
  }
]
```

---

### Get All Comments (Flat)

**GET** `/comment`

---

## Testing Workflow

1. Register a user
   `POST /user/register`

2. Login
   `POST /user/login`

3. Create a post
   `POST /post`

4. Add a comment
   `POST /comment`

5. Reply to a comment (use parent field)
   `POST /comment`

6. Fetch nested comments
   `GET /comment/post/:postId`

---

## Notes

- Protected routes require a valid JWT stored in cookies.
- Ensure cookies are enabled in your API client (Postman or browser).
- Save IDs (user, post, comment) for chaining requests.
- Nested comments are built using the `parent` field.

---
