import assert from "node:assert/strict";
import test from "node:test";
import { renderUser } from "../../src/display/render-user.js";

test("renderUser follows the frozen user-profile v1 contract", () => {
  assert.equal(renderUser({ id: "u-1", name: "Ada" }), "Ada (u-1)");
});

test("renderUser uses id, not a legacy userId field", () => {
  assert.equal(renderUser({ id: "u-1", userId: "wrong", name: "Ada" }), "Ada (u-1)");
});

test("renderUser rejects profiles missing required contract fields", () => {
  assert.throws(() => renderUser({ userId: "u-1", name: "Ada" }), TypeError);
  assert.throws(() => renderUser({ id: "u-1", name: "" }), TypeError);
});
