import { info, setFailed, setOutput } from "@actions/core";

import { parse } from "./parse.ts";
import { getCommitTag } from "./tag.ts";

try {
  void run();
} catch (err) {
  if (err instanceof Error) {
    setFailed(err);
  } else {
    setFailed("Unknown error");
  }
}

function run() {
  info("Getting latest tag");

  const version = getCommitTag();

  info(`Got tag version: ${version}`);

  const versionParts = parse(version);

  setOutput("full", version);
  setOutput("major", versionParts.major);
  setOutput("minor", versionParts.minor);
  setOutput("patch", versionParts.patch);
  setOutput("prerelease", versionParts.tag);
  setOutput("build", versionParts.build);
}
