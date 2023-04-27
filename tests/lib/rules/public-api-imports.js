/**
 * @fileoverview FSD Architecture rule for public api imports
 * @author Anatoly Ivashov
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});

const aliasOptions = [
  {
    alias: '@'
  }
]

ruleTester.run("public-api-imports", rule, {
  valid: [
    {
      code: "import { ArticleCommentSlice } from '../../model/slices/addCommentFormSlice'",
      errors: []
    },
    {
      code: "import { ArticleCommentSlice } from '@/entities/Article'",
      errors: [],
      options: aliasOptions
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
      errors: [{ message: "Absolute import is allowed only from public API (index.js/ts)" }],
      options: aliasOptions
    },
    {
      filename: 'C:/Users/project/src/entities/Article/StoreDecorator.tsx',
      code: "import { ArticleCommentSlice } from '@/entities/Article/testing/file.tsx'",
      errors: [{ message: "Absolute import is allowed only from public API (index.js/ts)" }],
      options: [
        {
          alias: '@',
          testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx'],
        }
      ]
    },
    {
      filename: 'C:/Users/project/src/entities/Article/forbidden.ts',
      code: "import { ArticleCommentSlice } from '@/entities/Article/testing'",
      errors: [{ message: "Test data need import from public API file for tests (testing.js/ts) only in files from testFilesPatterns option" }],
      options: [
        {
          alias: '@',
          testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx'],
        }
      ]
    }
  ],
});
