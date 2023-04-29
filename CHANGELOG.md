#### 0.0.13 (2023-04-29)
* Fix public-api-imports rule for relative path for import from another layer.
* Add auto fix for error of this rule (Must be imported from a public API file (index.js/ts))
See [rule documentation](docs/rules/public-api-imports.md) of last incorrect import path example
#### 0.0.12 (2023-04-29)
* Add auto fix option for public-api-imports rule
If the --fix option on the command line automatically fixes problems of "Absolute import is allowed only from public API (index.js/ts)" reported by the rule.
#### 0.0.11 (2023-04-27)
* Add git repo url
#### 0.0.10 (2023-04-27)
* Added changelog
### Added documentation
#### 0.0.9 (2023-04-27)
* Added documentation
* Change in import-path-check rule. For shared layer imports. See examples in the documentation of rule.
