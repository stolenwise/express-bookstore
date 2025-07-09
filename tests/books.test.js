process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");
const router = require("../routes/books");

// Smoke test
describe("Books Routes", () => {
    beforeEach(async () => {
      await db.query("DELETE FROM books");
  
      await db.query(`
        INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
        VALUES (
          '1111111111',
          'http://a.co/test',
          'Test Author',
          'English',
          100,
          'Test Publisher',
          'Test Book',
          2020
        )
      `);
    });
  
    afterAll(async () => {
      await db.end();
    });
  
    // GET /books
    describe("GET /books", () => {
      test("should return all books", async () => {
        const res = await request(app).get("/books");
        expect(res.statusCode).toBe(200);
        expect(res.body.books).toHaveLength(1);
      });
    });
  
    // GET /books/:isbn
    describe("GET /books/:isbn", () => {
      test("returns book if found", async () => {
        const res = await request(app).get("/books/1111111111");
        expect(res.statusCode).toBe(200);
        expect(res.body.book).toHaveProperty("title", "Test Book");
      });
  
      test("returns 404 for invalid ISBN", async () => {
        const res = await request(app).get("/books/9999999999");
        expect(res.statusCode).toBe(404);
      });
    });
  
    // POST /books
    describe("POST /books", () => {
      test("creates a book with valid data", async () => {
        const res = await request(app).post("/books").send({
          isbn: "2222222222",
          amazon_url: "http://a.co/new",
          author: "New Author",
          language: "English",
          pages: 123,
          publisher: "New Publisher",
          title: "New Book",
          year: 2024
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.book).toHaveProperty("isbn", "2222222222");
      });
  
      test("returns 400 for invalid data", async () => {
        const res = await request(app).post("/books").send({
          title: "Invalid Book"
        });
        expect(res.statusCode).toBe(400);
      });
    });
  
    // PUT /books/:isbn
    describe("PUT /books/:isbn", () => {
      test("updates book with valid data", async () => {
        const res = await request(app).put("/books/1111111111").send({
          amazon_url: "http://a.co/updated",
          author: "Updated Author",
          language: "English",
          pages: 150,
          publisher: "Updated Publisher",
          title: "Updated Book",
          year: 2025
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.book).toHaveProperty("title", "Updated Book");
      });
  
      test("returns 400 for invalid data", async () => {
        const res = await request(app).put("/books/1111111111").send({
          pages: -100
        });
        expect(res.statusCode).toBe(400);
      });
    });
  
    // DELETE /books/:isbn
    describe("DELETE /books/:isbn", () => {
      test("deletes the book", async () => {
        const res = await request(app).delete("/books/1111111111");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Book deleted" });
      });
  
      test("returns 404 if book not found", async () => {
        const res = await request(app).delete("/books/9999999999");
        expect(res.statusCode).toBe(404);
      });
    });
  });