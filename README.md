# Propellant

GitHub Action to parse the semantic version from a git tag and publish a package to npm.

> [!IMPORTANT]  
> I created this GitHub Action mainly to address the semantic version parsing issues with other actions
> in the marketplace, but also to try my hand at creating my own action. It is **highly** tailored
> for `@laserware` packages, so I won't be accepting contributions and strongly recommend you
> use more popular actions out there for publishing npm packages.

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

## Requirements

- Bun
