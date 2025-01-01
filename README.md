# Tag Parser

GitHub Action to parse a semver tag according to a specific format.

I wasn't able to find a GitHub Action that could read the git tag from a commit in this format:

`1.0.0-beta.5`

And provide the following information:

| Part  | Value |
|-------|-------|
| Major | 1     |
| Minor | 0     |
| Patch | 0     |
| Tag   | beta  |
| Build | 1     |

I found one that expects the build to use a `+x` (e.g `1.0.0-beta+1`) format, but that doesn't adhere to semver.
