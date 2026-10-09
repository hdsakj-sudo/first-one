const profiles = new Map([
  ["u-1", Object.freeze({ id: "u-1", name: "Ada" })],
]);

export function getUser(id) {
  if (typeof id !== "string") {
    throw new RangeError(`Unknown user: ${String(id)}`);
  }

  const profile = profiles.get(id);
  if (!profile) {
    throw new RangeError(`Unknown user: ${id}`);
  }

  return { id: profile.id, name: profile.name };
}
