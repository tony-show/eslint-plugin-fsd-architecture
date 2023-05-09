/**
 * @fileoverview Checking imports against FSD architecture rules
 * @author Anatoly Ivashov (TonyShow)
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/import-path-check'),
  RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
})
ruleTester.run('import-path-check', rule, {
  valid: [
    {
      filename: 'C:/Users/project/src/entities/Article',
      code: "import { ArticleCommentSlice } from '../../model/slices/addCommentFormSlice'",
    },
  ],

  invalid: [
    {
      filename: 'C:/Users/project/src/entities/Article',
      code: "import { ArticleCommentSlice } from '@/entities/Article/model/slices/addCommentFormSlice'",
      errors: [
        { message: 'Within one slice, all import paths must be relative' },
      ],
      options: [
        {
          alias: '@',
        },
      ],
      output:
        "import { ArticleCommentSlice } from './Article/model/slices/addCommentFormSlice'",
    },
    {
      filename: 'C:/src/entities/Country/ui/CountrySelect/CountrySelect.tsx',
      code: "import { Country } from '../../../../shared/const/country'",
      errors: [{ message: 'Shared layer import must be absolute path' }],
      output: null,
    },
    {
      filename: 'C:/Users/project/src/entities/Article',
      code: "import { ArticleCommentSlice } from 'entities/Article/model/slices/addCommentFormSlice'",
      errors: [
        { message: 'Within one slice, all import paths must be relative' },
      ],
      output:
        "import { ArticleCommentSlice } from './Article/model/slices/addCommentFormSlice'",
    },
  ],
})
