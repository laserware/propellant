/**
 * @typedef {Object} VersionParts
 * @decription Parts of a version string.
 * @property {number} major Major release number for version.
 * @property {number} minor Minor release number for version.
 * @property {number} patch Patch release number for version.
 * @property {string} [tag] Tag for version (if included).
 * @property {number} [build] Build number for tag (if included).
 */

class InvalidVersionError extends Error {
  constructor(versionString) {
    super(`Unable to parse version ${versionString}`);

    this.name = "InvalidVersionError";
  }
}

/**
 * Parses the specified version string and returns the version parts. It's
 * pretty loosey-goosey and expects the version string to be valid.
 *
 * @param {string} versionString String value of the version to parse.
 *
 * @returns {VersionParts} Version parts for the version.
 */
export function parse(versionString) {
  const [major, ...rest] = versionString.split(/\W/).filter(Boolean);

  if (!/\d/.test(major)) {
    throw new InvalidVersionError(versionString);
  }

  const [minor, patch, tag, build] = rest;

  const parts = /** @type {VersionParts} */ {
    major: coerce(major),
    minor: coerce(minor),
    patch: coerce(patch),
    tag,
    build: coerce(build),
  };

  if (Object.values(parts).every((part) => part === undefined)) {
    throw new InvalidVersionError(versionString);
  } else {
    return parts;
  }
}

/**
 * Coerces the specified value to a number. If it can't be coerced, returns
 * undefined.
 *
 * @returns {undefined|number}
 */
function coerce(value) {
  if (value === undefined) {
    return undefined;
  }

  // Ensure the value only has numeric characters:
  value = value.replaceAll(/\D/g, "");

  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return undefined;
  }

  return numeric;
}
