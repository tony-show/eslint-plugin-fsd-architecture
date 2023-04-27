const path = require('path')
const {isPathRelative} = require('../helpers')

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`,
    messages: [],
    docs: {
      description: "Checking imports against FSD architecture rules",
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
          }
        }
      }
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias ?? ''

    return {
      ImportDeclaration(node) {
        // example C:/Users/project/src/entities/Article
        const fromFilename = context.getFilename()
        // example entities/Article
        const value = node.source.value
        const importTo = alias ? value.replace(`${alias}/`, '') : value

        if (shouldBeRelative(fromFilename, importTo)) {
          context.report(node, 'Within one slice, all import paths must be relative')
        } else if (!/src.shared/.test(fromFilename) && /\.\..shared/.test(value)) {
          context.report(node, 'Shared layer import must be absolute path')
        }
      }
    };
  },
};


const layers = {
  app: 'app',
  processes: 'processes',
  pages: 'pages',
  widgets: 'widgets',
  features: 'features',
  entities: 'entities',
  shared: 'shared',
}

function shouldBeRelative(from, to) {
  if (isPathRelative(to)) {
    return false
  }

  // example entities/Article
  const toArray = to.split(/\\|\//)
  const toLayer = toArray[0] // entities
  const toSlice = toArray[1] // Article

  if (!toLayer || !toSlice || !layers[toLayer]) {
    return false
  }

  const normalizedPath = path.toNamespacedPath(from)
  const projectFrom = normalizedPath.split('src')[1]
  const fromArray = projectFrom.split(/\\|\//)
  const fromLayer = fromArray[1]
  const fromSlice = fromArray[2]

  if (!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false
  }

  return fromLayer === toLayer  && fromSlice === toSlice
}
