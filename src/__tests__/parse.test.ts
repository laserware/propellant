import { describe, expect, it } from "bun:test";

import { parse } from "../parse.ts";

describe("the parse function", () => {
  const testCases = [
    {
      version: "1",
      expected: { major: 1, minor: undefined, patch: undefined, tag: undefined, build: undefined },
    },
    {
      version: "1.2",
      expected: { major: 1, minor: 2, patch: undefined, tag: undefined, build: undefined },
    },
    {
      version: "1.2.3",
      expected: { major: 1, minor: 2, patch: 3, tag: undefined, build: undefined },
    },
    {
      version: "1+1,1",
      expected: { major: 1, minor: 1, patch: 1, tag: undefined, build: undefined },
    },
    {
      version: "1.2.43-beta",
      expected: { major: 1, minor: 2, patch: 43, tag: "beta", build: undefined },
    },
    {
      version: "1.2.43-beta.6",
      expected: { major: 1, minor: 2, patch: 43, tag: "beta", build: 6 },
    },
    {
      version: "1.2.43-beta+8",
      expected: { major: 1, minor: 2, patch: 43, tag: "beta", build: 8 },
    },
  ];

  for (const { version, expected } of testCases) {
    it(`parses a version with value ${version}`, () => {
      const result = parse(version);

      expect(result).toEqual(expected);
    });
  }

  it("throws an error if the version is completely invalid", () => {
    expect(() => {
      parse("sldkfjdf");
    }).toThrow();
  });
});
