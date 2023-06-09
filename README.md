# eslint-plugin-fsd-slivki

ESLint plugin for projects based on FSD architecture principles

Github for docs and contribution - https://github.com/lumpendog/eslint-plugin-fsd-slivki

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-fsd-slivki`:

```sh
npm install eslint-plugin-fsd-slivki --save-dev
```

## Usage

Add `fsd-slivki` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "fsd-slivki"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "fsd-slivki/rule-name": 2
    }
}
```

## Rules

Plugin is in development. Only 2 rules are working currently. No auto-fix available yet.

<!-- begin auto-generated rules list -->

| Name                                                         | Description                                                 |
| :----------------------------------------------------------- | :---------------------------------------------------------- |
| [path-check-layers](docs/rules/path-check-layers.md)         | Importing modules from upper layers is forbidden in FSD     |
| [path-check-public-api](docs/rules/path-check-public-api.md) | Check for using only public API paths for importing modules |
| [path-check-relative](docs/rules/path-check-relative.md)     | Check import paths to be relative inside one slice          |

<!-- end auto-generated rules list -->


