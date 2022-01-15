# Amemori

<span style="font-size: 1.2rem">雨森</span>

Back-end utilities by [Rocket Vision](https://rocketvision.com.br).

Requires [Next.js 12.0.7](https://nextjs.org/) or later.

## Modules

- `api`: API handler wrappers to ensure response consistency.
- `form`: "multipart/form-data" parsing and configuration.
- `args`: argument collapsing/merging.
- `experimental`: experimental, even less stable APIs.
  - `endpoint`: JSON API wrapper with CORS support.
  - `parse`/`type`: parameter parsing and validation.

## Consistency

Please follow the rules below to ensure a consistent ecosystem.

Error messages are static. They don't depend on request context and they don't depend on the failing entities. Error data should be used to return dynamic data, such as parameter name when a parameter is invalid.
