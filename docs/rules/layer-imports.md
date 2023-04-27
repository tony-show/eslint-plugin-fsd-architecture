# Rule for check imports from layers structure of FSD architecture (`fsd-architecture/layer-imports`)

<!-- end auto-generated rule header -->

## Rule Details

Rule for check imports from layers structure of FSD architecture

### Options

| Name                     | Description                                    |
| :----------------------- | :--------------------------------------------- |
| alias                    | The alias with which the import path begins    |
| ignoreImportPatterns     | Array of glob path templates to ignore of rule |

### Examples options settings

```js
'fsd-architecture/layer-imports': ['error', {
  alias: '@', // Example import path with alias - @/shared/...
  ignoreImportPatterns: ['**/StoreProvider', '**/*.test.*'],
}],
```

### Examples

Examples of **correct** code for this rule:

```js
// File path C:/Users/project/src/features/Component
import Button from 'shared/Button.tsx'
import Post from 'entities/Post.tsx'

// With option: alias: '@'
// File path C:/Users/project/src/features/Component
import Button from '@/shared/Button.tsx'
import Post from '@/entities/Post.tsx'

// With option: ignoreImportPatterns: ['**/StoreProvider']
// File path C:/Users/project/src/features/Component
import { StateSchema } from 'app/providers/StoreProvider'
```

Examples of **incorrect** code for this rule:

```js
// File path C:/Users/project/src/entities/Component
import AddComment from '@/features/AddComment' // Error: A layer can only import the underlying layers into itself. (app > pages > widgets > features > entities > shared)
```
