const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const User = require("../models/user");
const listHelper = require("../utils/list_helper");

const api = supertest(app);

const userURI = "/api/users";

const adminUser = {
  username: "admin",
  password: "admin",
  name: "Gabi Seed",
};

beforeEach(async () => {
  await User.deleteMany({});
});

test("valid user can be created", async () => {
  const usersAtStart = await listHelper.usersInDb();

  const res = await api
    .post(userURI)
    .send(adminUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await listHelper.usersInDb();
  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

  const usernames = usersAtEnd.map((u) => u.username);
  assert(usernames.includes(adminUser.username));
});

test("invalid user cannot be created", async () => {
  const usersAtStart = await listHelper.usersInDb();

  await api
    .post(userURI)
    .send({
      ...adminUser,
      username: "AA",
    })
    .expect(400)
    .expect("Content-Type", /application\/json/);

  await api
    .post(userURI)
    .send({
      ...adminUser,
      password: "AA",
    })
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await listHelper.usersInDb();
  assert.strictEqual(usersAtEnd.length, usersAtStart.length);
});

after(() => {
  mongoose.connection.close();
});
