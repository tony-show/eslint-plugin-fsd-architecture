# FSD Architecture rule for public api imports (`fsd-architecture/public-api-imports`)

<!-- end auto-generated rule header -->

## Rule Details

FSD Architecture rule for public api imports

### Options

| Name                     | Description                                                                                  |
| :----------------------- | :---------------------------------------------                                               |
| alias                    | The alias with which the import path begins                                                  |
| testFilesPatterns        | Array of glob path templates to need import files from testing public API from testing.js/ts |

### Examples options settings

```js
'fsd-architecture/public-api-imports': ['error', {
  alias: '@', // Example import path with alias - @/shared/...
  ignoreImportPatterns: ['**/StoreProvider', '**/*.test.*'],
}],
```

### Examples

Examples of **correct** code for this rule:

```js
import { getData } from '../../model/selectors/getData'
import { Component } from 'entities/Component'

// With option: alias: '@'
import { Component } from '@/entities/Component'

// With option: testFilesPatterns: ['**/*.test.*']
// File path C:/Users/project/src/entities/Component/file.test.ts
import { Component } from 'entities/Component/testing'
```

Examples of **incorrect** code for this rule:

```js
import { Some } from 'entities/Component/model/some.ts'
// Error: Absolute import is allowed only from public API (index.js/ts)

// With option: alias: '@'
import { Some } from '@/entities/Component/model/some.ts'
// Error: Absolute import is allowed only from public API (index.js/ts)

// With option: testFilesPatterns: ['**/*.test.*']
// File path C:/Users/project/src/entities/Component/file.test.ts
import { Some } from 'entities/Component/testing/some.ts'
// Error: Absolute import is allowed only from public API (index.js/ts)

// With option: testFilesPatterns: ['**/*.test.*']
// File path C:/Users/project/src/entities/Component/forbidden.ts
import { Some } from 'entities/Component/testing'
// Error: Test data need import from public API file for tests (testing.js/ts) only in files from testFilesPatterns option
```
