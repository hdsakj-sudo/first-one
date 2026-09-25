import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("冻结契约只要求字符串 id 和 name", () => {
  const contract = JSON.parse(
    readFileSync(new URL("../contracts/user-profile.v1.json", import.meta.url), "utf8"),
  );
  assert.deepEqual(contract.required, ["id", "name"]);
  assert.equal(contract.properties.id.type, "string");
  assert.equal(contract.properties.name.type, "string");
  assert.equal(Object.hasOwn(contract.properties, "userId"), false);
  assert.equal(contract.additionalProperties, false);
});
