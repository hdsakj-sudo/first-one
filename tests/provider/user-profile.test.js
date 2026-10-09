import assert from "node:assert/strict";
import { test } from "node:test";
import { getUser } from "../../src/provider/user-profile.js";

test("getUser synchronously returns only the frozen v1 profile fields", () => {
  const profile = getUser("u-1");

  assert.deepEqual(profile, { id: "u-1", name: "Ada" });
  assert.deepEqual(Object.keys(profile).sort(), ["id", "name"]);
  assert.equal(profile instanceof Promise, false);
});

test("getUser returns a fresh object without exposing its stored profile", () => {
  const first = getUser("u-1");
  first.name = "Changed";

  assert.deepEqual(getUser("u-1"), { id: "u-1", name: "Ada" });
});

test("getUser rejects unknown and non-string identifiers", () => {
  assert.throws(() => getUser("u-2"), RangeError);
  assert.throws(() => getUser(""), RangeError);
  assert.throws(() => getUser(null), RangeError);
});
