import { execFileSync } from "node:child_process";

import { info, setFailed, setOutput } from "@actions/core";

import { parse } from "./parse.js";

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

  const version = getLatestTag();

  info(`Got tag version: ${version}`);

  const versionParts = parse(version);

  setOutput("full", version);
  setOutput("major", versionParts.major);
  setOutput("minor", versionParts.minor);
  setOutput("patch", versionParts.patch);
  setOutput("prerelease", versionParts.tag);
  setOutput("build", versionParts.build);
}

function getLatestTag() {
  const hash = git("rev-list", "--tags", "--max-count=1");

  if (hash === "") {
    throw new Error("Unable to get hash");
  }

  const tag = git("describe", "--tags", hash);

  if (tag === "") {
    throw new Error("Unable to get tag");
  }

  return tag;
}

function git(...args) {
  const result = execFileSync("git", args, { shell: true });

  return result.toString().trim();
}
