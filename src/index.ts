import { info, setFailed } from "@actions/core";
import { npmPublish } from "@jsdevtools/npm-publish";

import { parseVersion } from "./parse.ts";
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

async function run() {
  const token = process.env.NPM_TOKEN;
  if (token === undefined) {
    throw new Error("Missing `NPM_TOKEN` environment variable");
  }

  info("Getting latest tag");
  const version = getCommitTag();

  info(`Got tag version: ${version}`);
  const versionParts = parseVersion(version);

  const tag = versionParts.tag ?? "latest";

  info(`Publishing to npm with tag ${tag}`);
  await npmPublish({ token, tag, dryRun: true });
}
