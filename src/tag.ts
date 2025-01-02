import { execFileSync } from "node:child_process";

/**
 * Gets the tag from the current commit.
 *
 * @throws Error If the tag was not found.
 */
export function getCommitTag(): string {
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

function git(...args: string[]): string {
  const result = execFileSync("git", args, { shell: true });

  return result.toString().trim();
}
