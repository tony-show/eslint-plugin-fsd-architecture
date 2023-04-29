const {isPathRelative} = require('../helpers')
const micromatch = require('micromatch')
const { PUBLIC_ERROR, TESTING_PUBLIC_ERROR } = require('../consts/public-api-imports.js')

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    messages: {
      [PUBLIC_ERROR]: 'Absolute import is allowed only from public API (index.js/ts)',
      [TESTING_PUBLIC_ERROR]: 'Test data need import from public API file for tests (testing.js/ts) only in files from testFilesPatterns option'
    },
    docs: {
      description: "FSD Architecture rule for public api imports",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          },
          testFilesPatterns: {
            type: 'array'
          }
        }
      }
    ],
  },

  create(context) {
    const { alias = '', testFilesPatterns = []} = context.options[0] ?? {}
    const checkingLayers = {
      processes: 'processes',
      pages: 'pages',
      widgets: 'widgets',
      features: 'features',
      entities: 'entities',
    }

    return {
      ImportDeclaration(node) {
        const value = node.source.value
        const importTo = alias ? value.replace(`${alias}/`, '') : value

        if (isPathRelative(importTo)) {
          return
        }

        // [entities/article/model/types]
        const segments = importTo.split('/')
        const layer = segments[0]
        const slice = segments[1]

        if (!checkingLayers[layer]) {
          return
        }

        const isImportNotFromPublicApi = segments.length > 2
        const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4

        if (isImportNotFromPublicApi && !isTestingPublicApi) {
          context.report({
            node,
            messageId: PUBLIC_ERROR,
            fix: (fixer) => {
              return fixer.replaceText(node.source, `'${alias}/${layer}/${slice}'`)
            }
          })
        }

        if (isTestingPublicApi) {
          const currentFilePath = context.getFilename()
          const isCurrentFileTesting = testFilesPatterns.some(
            pattern => micromatch.isMatch(currentFilePath, pattern)
          )

          if (!isCurrentFileTesting) {
            context.report({
              node,
              messageId: TESTING_PUBLIC_ERROR
            })
          }
        }
      }
    };
  },
};
