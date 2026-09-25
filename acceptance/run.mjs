import assert from "node:assert/strict";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";

const targetRoot = resolve(process.argv[2] ?? ".");
const providerUrl = pathToFileURL(join(targetRoot, "src", "provider", "user-profile.js")).href;
const displayUrl = pathToFileURL(join(targetRoot, "src", "display", "render-user.js")).href;

const { getUser } = await import(providerUrl);
const { renderUser } = await import(displayUrl);

assert.equal(typeof getUser, "function", "provider must export getUser");
assert.equal(typeof renderUser, "function", "display must export renderUser");

const profile = getUser("u-1");
assert.deepEqual(profile, { id: "u-1", name: "Ada" });
assert.equal(renderUser(profile), "Ada (u-1)");

process.stdout.write("integration acceptance passed: Ada (u-1)\n");
