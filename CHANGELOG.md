# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

*Unfortunately, changes before 0.5.0 were **not** documented.*

## [0.5.3] - 2022-01-15

### Changed
- Fixed `lang`.
- Improved errors. Messages are now fixed, whereas JSON data changes.

## [0.5.2] - 2022-01-15

### Added
- Default exports for several modules, for convenience.

[TODO: There's some more stuff to put here.]

## [0.5.1] - 2022-01-15

### Added
- Module `experimental`, with sub-modules `endpoint`, `parse`/`type`, among others.
- Minimalistic localization support (WIP).
- Development log.

## [0.5.0] - 2022-01-14

### Added
- Changelog.

### Changed
- Generalize the type of `api.json` to include requests/responses from other frameworks, as long as they provide a few basic methods. The goal is to drop the `next` requirement entirely, at least for now.
- Change the status of `ClientError` responses to `fail` (from `failure`) to be consistent with popular APIs.
