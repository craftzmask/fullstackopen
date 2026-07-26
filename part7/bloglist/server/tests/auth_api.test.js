const assert = require("node:assert");
const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../models/user");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const user = new User({
    username: "testuser",
    name: "Test User",
    password: "password",
  });

  await user.save();
});

describe("Auth API", () => {
  test("create a new user", async () => {
    const response = await api
      .post("/api/users")
      .send({
        username: "testuser123",
        password: "password123",
        name: "Test User 123",
      })
      .expect(201);

    assert.strictEqual(response.body.message, "User created successfully");
  });

  test("cannot create user with existing username", async () => {
    const response = await api
      .post("/api/users")
      .send({
        username: "testuser",
        password: "password",
        name: "Test User 123",
      })
      .expect(400);

    assert.strictEqual(response.body.error, "User already exists");
  });

  test("password must be at least 3 characters long", async () => {
    const response = await api
      .post("/api/users")
      .send({
        username: "testuser123",
        password: "pw",
        name: "Test User 123",
      })
      .expect(400);

    assert.strictEqual(
      response.body.error,
      "Password must be at least 3 characters long",
    );
  });

  test("username must be at least 3 characters long", async () => {
    const response = await api
      .post("/api/users")
      .send({
        username: "tu",
        password: "password",
        name: "Test User 123",
      })
      .expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
