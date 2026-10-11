import assert from "node:assert/strict";
import { test } from "node:test";
import { renderUser } from "../../src/display/render-user.js";

test("renderUser formats the frozen id and name fields", () => {
  assert.equal(renderUser({ id: "u-1", name: "Ada" }), "Ada (u-1)");
});
