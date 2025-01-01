import * as assert from "node:assert";
import { describe, it } from "node:test";

import { parse } from "./parse.js";

describe("the parse function", () => {
  const testCases = [
    // prettier-ignore
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

  for (const testCase of testCases) {
    it(`parses a version with value ${testCase.version}`, () => {
      const result = parse(testCase.version);

      assert.deepEqual(result, testCase.expected);
    });
  }

  it("throws an error if the version is completely invalid", () => {
    assert.throws(() => {
      parse("sldkfjdf");
    });
  });
});
