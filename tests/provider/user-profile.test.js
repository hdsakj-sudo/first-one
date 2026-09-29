import assert from "node:assert/strict";
import { test } from "node:test";
import { getUser } from "../../src/provider/user-profile.js";

test("getUser returns the frozen UserProfile shape", () => {
  const profile = getUser("u-1");

  assert.deepEqual(profile, { id: "u-1", name: "Ada" });
  assert.equal(profile instanceof Promise, false);
  assert.deepEqual(Object.keys(profile), ["id", "name"]);
});
