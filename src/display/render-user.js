/** Render the frozen user-profile v1 contract as a compact label. */
export function renderUser(profile) {
  if (profile === null || typeof profile !== "object" ||
      typeof profile.id !== "string" || profile.id.length === 0 ||
      typeof profile.name !== "string" || profile.name.length === 0) {
    throw new TypeError("profile must contain non-empty id and name strings");
  }
  return `${profile.name} (${profile.id})`;
}
