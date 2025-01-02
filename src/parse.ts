/**
 * Parts of a version string.
 */
export type VersionParts = {
  /** Major release number for version. */
  major: number;

  /** Minor release number for version. */
  minor: number | undefined;

  /** Patch release number for version. */
  patch: number | undefined;

  /** Tag for version (if included). */
  tag: string | undefined;

  /** Build number for tag (if included). */
  build: number | undefined;
};

/**
 * Parses the specified version string and returns the version parts. It's
 * pretty loosey-goosey and expects the version string to be valid.
 *
 * @param versionString String value of the version to parse.
 */
export function parseVersion(versionString: string): VersionParts {
  const [maybeMajor, ...rest] = versionString.split(/\W/).filter(Boolean);

  const major = coerce(maybeMajor);

  if (!/\d/.test(maybeMajor) || major === undefined) {
    throw new Error(`Unable to parse version ${versionString}`);
  }

  const [minor, patch, tag, build] = rest;

  const parts: VersionParts = {
    major,
    minor: coerce(minor),
    patch: coerce(patch),
    tag,
    build: coerce(build),
  };

  if (Object.values(parts).every((part) => part === undefined)) {
    throw new Error(`Unable to parse version ${versionString}`);
  } else {
    return parts;
  }
}

/**
 * Coerces the specified value to a number. If it can't be coerced, returns
 * undefined.
 */
function coerce(value: string | undefined): number | undefined {
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
