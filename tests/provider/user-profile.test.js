import assert from "node:assert/strict";
import { test } from "node:test";
import { getUser } from "../../src/provider/user-profile.js";

test("getUser returns the frozen profile synchronously", () => {
  assert.deepEqual(getUser("u-1"), { id: "u-1", name: "Ada" });
});

test("getUser rejects unknown ids", () => {
  assert.throws(() => getUser("u-2"), RangeError);
});
