const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy return one", () => {
  const result = listHelper.dummy([]);
  assert.strictEqual(result, 1);
});
