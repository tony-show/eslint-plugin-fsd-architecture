# eslint-plugin-fsd-architecture

ESlint plugin to comply with FSD (Feature Sliced Design) frontend architecture rules.
[FSD Architecture documentation](https://feature-sliced.design/docs/get-started/overview)

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-fsd-architecture`:

```sh
npm install eslint-plugin-fsd-architecture --save-dev
```

## Usage

Add `fsd-architecture` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "fsd-architecture"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "fsd-architecture/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                   | Description                                                      |
| :----------------------------------------------------- | :--------------------------------------------------------------- |
| [import-path-check](docs/rules/import-path-check.md)   | Checking imports against FSD architecture rules                  |
| [layer-imports](docs/rules/layer-imports.md)           | Rule for check imports from layers structure of FSD architecture |
| [public-api-imports](docs/rules/public-api-imports.md) | FSD Architecture rule for public api imports                     |

<!-- end auto-generated rules list -->
