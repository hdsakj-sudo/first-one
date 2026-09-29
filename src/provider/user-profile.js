export function getUser(id) {
  if (id !== "u-1") {
    throw new RangeError(`Unknown user: ${id}`);
  }

  return { id, name: "Ada" };
}
