/**
 * @fileoverview FSD Architecture rule for public api imports
 * @author Anatoly Ivashov
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports"),
RuleTester = require("eslint").RuleTester;
const { PUBLIC_ERROR, TESTING_PUBLIC_ERROR } = require('../../../lib/consts/public-api-imports.js')


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});

ruleTester.run("public-api-imports", rule, {
  valid: [
    {
      code: "import { ArticleCommentSlice } from '../../model/slices/addCommentFormSlice'",
    },
    {
      code: "import { ArticleCommentSlice } from '@/entities/Article'",
      options: [
        {
          alias: '@'
        }
      ]
    },
    {
      filename: 'C:/Users/project/src/entities/Article/file.test.ts',
      code: "import { ArticleCommentSlice } from '@/entities/Article/testing'",
      options: [
        {
          alias: '@',
          testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx'],
        }
      ]
    },
    {
      filename: 'C:/Users/project/src/entities/Article/StoreDecorator.tsx',
      code: "import { ArticleCommentSlice } from '@/entities/Article/testing'",
      options: [
        {
          alias: '@',
          testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx'],
        }
      ]
    }
  ],

  invalid: [
    {
      code: "import { ArticleCommentSlice } from '@/entities/Article/model/file.ts'",
      errors: [{ messageId: PUBLIC_ERROR }],
      options: [
        {
          alias: '@'
        }
      ],
      output: `import { ArticleCommentSlice } from '@/entities/Article'`
    },
    {
      filename: 'C:/Users/project/src/entities/Article/StoreDecorator.tsx',
      code: "import { ArticleCommentSlice } from '@/entities/Article/testing/file.tsx'",
      errors: [{ messageId: PUBLIC_ERROR }],
      options: [
        {
          alias: '@',
          testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx'],
        }
      ],
      output: `import { ArticleCommentSlice } from '@/entities/Article'`
    },
    {
      filename: 'C:/Users/project/src/entities/Article/forbidden.ts',
      code: "import { ArticleCommentSlice } from '@/entities/Article/testing'",
      errors: [{
        messageId: TESTING_PUBLIC_ERROR
      }],
      options: [
        {
          alias: '@',
          testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx'],
        }
      ],
      output: null
    }
  ],
});
