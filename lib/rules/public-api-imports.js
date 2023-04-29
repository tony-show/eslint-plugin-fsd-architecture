const {isPathRelative, isOneLayer, cutRelative} = require('../helpers')
const micromatch = require('micromatch')
const {
  PUBLIC_ERROR,
  TESTING_PUBLIC_ERROR,
  NEED_FROM_PUBLIC_ERROR,
} = require('../consts/public-api-imports.js')

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    messages: {
      [PUBLIC_ERROR]: 'Absolute import is allowed only from public API (index.js/ts)',
      [TESTING_PUBLIC_ERROR]: 'Test data need import from public API file for tests (testing.js/ts) only in files from testFilesPatterns option',
      [NEED_FROM_PUBLIC_ERROR]: 'Must be imported from a public API file (index.js/ts)'
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
        // example C:/Users/project/src/entities/Article
        const fromFilename = context.getFilename()
        // example entities/Article
        const value = node.source.value
        const importTo = alias ? value.replace(`${alias}/`, '') : value

        // [entities/article/model/types]
        const isRelative = isPathRelative(importTo)
        const segments = cutRelative(importTo).split('/')
        const layer = segments[0]
        const slice = segments[1]

        if (!checkingLayers[layer]) {
          return
        }

        const isImportNotFromPublicApi = segments.length > 2
        const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4
        const isNotInOneLayer = !isOneLayer(fromFilename, importTo)
        const fixedPath = alias ? `'${alias}/${layer}/${slice}'` : `'${layer}/${slice}'`

        if (isNotInOneLayer && !isTestingPublicApi && isRelative) {
          context.report({
            node,
            messageId: NEED_FROM_PUBLIC_ERROR,
            fix: (fixer) => {
              return fixer.replaceText(node.source, fixedPath)
            }
          })
        }

        if (isRelative) {
          return
        }

        if (isImportNotFromPublicApi && !isTestingPublicApi) {
          context.report({
            node,
            messageId: PUBLIC_ERROR,
            fix: (fixer) => {
              return fixer.replaceText(node.source, fixedPath)
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
