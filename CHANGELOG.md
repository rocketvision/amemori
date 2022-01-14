# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

*Unfortunately, changes before 0.5.0 were **not** documented.*

## [0.5.0] - 2022-01-14

### Added
- Changelog.

### Changed
- Generalize the type of `api.json` to include requests/responses from other frameworks, as long as they provide a few basic methods. The goal is to drop the `next` requirement entirely, at least for now.
- Change the status of `ClientError` responses to `fail` (from `failure`) to be consistent with popular APIs.
