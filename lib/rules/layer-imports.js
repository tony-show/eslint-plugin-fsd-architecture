const path = require('path')
const micromatch = require('micromatch')
const {isPathRelative} = require('../helpers')

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    messages: [],
    docs: {
      description: "Rule for check imports from layers structure of FSD architecture",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          },
          ignoreImportPatterns: {
            type: 'array'
          }
        }
      }
    ],
  },

  create(context) {
    const layers = {
      app: ['pages', 'widgets', 'features', 'entities', 'shared'],
      pages: ['widgets', 'features', 'entities', 'shared'],
      widgets: ['features', 'entities', 'shared'],
      features: ['entities', 'shared'],
      entities: ['shared', 'entities'],
      shared: ['shared'],
    }
    const availableLayers = {
      app: 'app',
      processes: 'processes',
      pages: 'pages',
      widgets: 'widgets',
      features: 'features',
      entities: 'entities',
      shared: 'shared',
    }
    const { alias = '', ignoreImportPatterns = []} = context.options[0] ?? {}

    const getCurrentFileLayer = () => {
      const currentFilePath = context.getFilename()
      const normalizedPath = path.toNamespacedPath(currentFilePath)
      const projectPath = normalizedPath?.split('src')[1]
      const segments = projectPath?.split(/\\|\//)
      return segments?.[1]
    }

    const getImportLayer = (value) => {
      const importPath = alias ? value.replace(`${alias}/`,'') : value
      const segments = importPath?.split(/\\|\//)
      return segments?.[0]
    }

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value
        const currentFileLayer = getCurrentFileLayer()
        const importLayer = getImportLayer(importPath)

        if (isPathRelative(importPath)) {
          return
        }

        if (!availableLayers[importLayer] || !availableLayers[currentFileLayer]) {
          return
        }

        const isIgnored = ignoreImportPatterns.some(
          pattern => micromatch.isMatch(importPath, pattern)
        )
        if (isIgnored) {
          return
        }

        if (!layers[currentFileLayer]?.includes(importLayer)) {
          context.report(node, 'A layer can only import the underlying layers into itself. (app > pages > widgets > features > entities > shared)')
        }
      }
    };
  },
};
