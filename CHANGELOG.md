# Changelog

All notable changes to `js-combinatorics` are recorded here.  Versions follow [Semantic Versioning](https://semver.org/).

For the changes from version 0.x to 1.x, see [Major Changes](README.md#major-changes) in the README.  Version 0.x lives on in the `version0` branch.

## [2.1.4] - 2026-08-03

### Changed

- `Combination` iterates in O(size) per element instead of O(size³) BigInt operations.  It now uses the lexicographic successor algorithm rather than calling `.at()` for each index.  The sequence is unchanged.  Iterating all C(200,3) combinations drops from about 58 seconds to about 40 milliseconds.  ([#75])

### Removed

- The `runkitExample` field in `package.json`.

## [2.1.3] - 2026-07-27

### Changed

- The ESM, CommonJS and UMD builds are now all generated from `combinatorics.ts` by rollup.  The version string is injected from `package.json` at build time.
- `package.json` declares `"sideEffects": false` so bundlers can tree-shake unused classes.
- Browser tests run from `file://` URLs.
- CI tests on Bun as well as Node.js.

## [2.1.2] - 2023-11-12

### Changed

- Development dependencies updated to TypeScript 5, Mocha 10 and `@types/node` 20.  No changes to the library itself.

## [2.1.1] - 2022-07-03

### Fixed

- `BaseN#length` was computed as `size ** base` instead of `base ** size` since 2.0.1.  For example, `new BaseN('01', 3).length` returned `9n` instead of `8n`.

## [2.1.0] - 2022-06-23

### Added

- `.at()` on every class, matching `Array.prototype.at()`.  Negative indexes count from the end.

### Changed

- `.nth()` is now an alias of `.at()`.  Existing code keeps working.

## [2.0.1] - 2022-06-22

### Changed

- `new BaseN(seed, size)` throws `RangeError` when `size < 1`.  It used to return an empty instance.
- Stricter TypeScript types.

## [2.0.0] - 2022-06-18

### Changed

- **Breaking:** the module is fully BigInt.  Integer arguments may still be `number` or `bigint`, but every integer result that can be `bigint` now always is.  This includes `permutation()`, `combination()`, `factorial()` and every `.length`.  Version 1.x returned `number` when the value fit within `Number.MAX_SAFE_INTEGER`.  See [Version 2 and BigInt](README.md#version-2-and-bigint) in the README.

[#75]: https://github.com/dankogai/js-combinatorics/issues/75
[2.1.4]: https://github.com/dankogai/js-combinatorics/compare/2.1.3...2.1.4
[2.1.3]: https://github.com/dankogai/js-combinatorics/compare/2.1.2...2.1.3
[2.1.2]: https://github.com/dankogai/js-combinatorics/compare/2.1.1...2.1.2
[2.1.1]: https://github.com/dankogai/js-combinatorics/compare/2.1.0...2.1.1
[2.1.0]: https://github.com/dankogai/js-combinatorics/compare/2.0.1...2.1.0
[2.0.1]: https://github.com/dankogai/js-combinatorics/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/dankogai/js-combinatorics/compare/1.5.7...2.0.0
