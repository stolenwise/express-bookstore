# express-bookstore


# Express Bookstore API

This is a RESTful API built with Node.js, Express, and PostgreSQL to manage a collection of books. It supports full CRUD operations and uses JSON Schema for validating book data. Integration tests are written using Jest and Supertest.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/express-bookstore.git
cd express-bookstore
```
### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up the Environment
Create a .env file in the root directory and add the following:


DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore

### 4. Create the Database and Load Data
Make sure PostgreSQL is running, then run:

```bash
createdb bookstore
psql bookstore < data.sql
```

### Running the App

To start the server on localhost:3000:
node server.js


### Running Tests
This project includes integration tests for all routes. To run them:

npm test

Make sure the test database is set up and accessible. Jest will run all files ending in .test.js inside the tests directory.

### API Endpoints
GET /books
Returns a list of all books.

GET /books/:isbn
Returns details for a specific book by ISBN.

POST /books
Creates a new book. Requires the following JSON payload:

```json

{
  "isbn": "1234567890",
  "amazon_url": "http://a.co/book",
  "author": "Author Name",
  "language": "English",
  "pages": 300,
  "publisher": "Publisher Name",
  "title": "Book Title",
  "year": 2024
}
```
PUT /books/:isbn
Updates an existing book. Requires a full valid book object.

DELETE /books/:isbn
Deletes the book with the specified ISBN.

### Validation
JSON Schema is used to validate data for POST and PUT requests. If validation fails, a 400 error is returned along with detailed error messages.

### Project Structure

├── app.js
├── server.js
├── config.js
├── db.js
├── expressError.js
├── models/
│   └── book.js
├── routes/
│   └── books.js
├── schemas/
│   ├── bookSchema.json
│   └── bookUpdateSchema.json
├── tests/
│   └── books.test.js
└── data.sql

### Notes
NODE_ENV is set to "test" in test files to ensure test database logic is handled separately.

Use curl or a tool like Postman to interact with the API manually.