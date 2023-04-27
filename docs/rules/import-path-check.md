# Checking imports against FSD architecture rules (`fsd-architecture/import-path-check`)

<!-- end auto-generated rule header -->

## Rule Details

Checking imports against FSD architecture rules

### Options

| Name                     | Description                                    |
| :----------------------- | :--------------------------------------------- |
| alias                    | The alias with which the import path begins    |

### Examples options settings

```js
'fsd-architecture/import-path-check': ['error', {
  alias: '@', // Example import path with alias - @/shared/...
}],
```

### Examples

Examples of **correct** code for this rule:

```js
// File path C:/Users/project/src/features/AddComment
import Button from 'shared/Button.tsx'
import { getCommentStatus } from '../../model/selectors/getCommentStatus'

// With option: alias: '@'
// File path C:/Users/project/src/features/AddComment
import Button from '@/shared/Button.tsx'
import { getCommentStatus } from '../../model/selectors/getCommentStatus'
```

Examples of **incorrect** code for this rule:

```js
// File path C:/Users/project/src/features/AddComment
import { getCommentStatus } from 'features/model/selectors/getCommentStatus'
// Error: Within one slice, all import paths must be relative

// With option: alias: '@'
// File path C:/Users/project/src/features/AddComment
import { getCommentStatus } from '@/features/model/selectors/getCommentStatus'
// Error: Within one slice, all import paths must be relative

// File path C:/Users/project/src/features/AddComment
import { Currency } from '../shared/const/currency'
// Error: Shared layer import must be absolute path
```
