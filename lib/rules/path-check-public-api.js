/**
 * @fileoverview Check for using only public API paths for importing modules
 * @author Roman Adamchik <roman.adamchik@gmail.com>
 */
"use strict";

const { 
  layersWithPublicApi,
  ERROR_MESSAGE, 
  ERROR_TESTING_MESSAGE 
} = require('../consts/consts');
const { isPathRelative } = require('../utils/paths');
const mm = require('micromatch');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: "Check for using only public API paths for importing modules",
      recommended: false,
      url: null, 
    },
    fixable: 'code', 
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          },
          testFiles: {
            type: 'array'
          }
        }
      }
    ], 
    messages: {
      [ERROR_MESSAGE]: 'According to FSD you should use only public API (index.ts) for importing modules',
      [ERROR_TESTING_MESSAGE]: 'You should use public API (index.ts) over testing public api (testing.ts) here.'
    },
  },

  create(context) {
    const {alias = '', testFiles = []} = context.options[0] || {};

    return {
      'ImportDeclaration': (node) => {
        // example entities/Article
        const {source: {value} = {}} = node;
        const pathImport = alias ? value.replace(`${alias}/`, '') : value;

        if (isPathRelative(pathImport)) return;

        const segments = pathImport.split('/');
        const isPublicTestingApi = segments[2] === 'testing' && segments.length < 4;

        if (shouldUsePublicApi(segments) && !isPublicTestingApi) {
          context.report({
            node,
            messageId: ERROR_MESSAGE,
            fix: (fixer) => fixer.replaceText(
              node.source, 
              `'${alias ? alias + '/' : ''}${segments[0]}/${segments[1]}'`
            )
          })
        }

        if (isPublicTestingApi) {
          const currentFilePath = context.getFilename();
          const isFileMatchTestingPattern = mm.isMatch(currentFilePath, testFiles);

          if (!isFileMatchTestingPattern) {
            context.report({
              node,
              messageId: ERROR_TESTING_MESSAGE,
            })
          }
        }
      }
    };
  },
};

function shouldUsePublicApi(segments) {

  const [importLayer, importSlice, next] = segments;

  if (!importLayer || !importSlice || !layersWithPublicApi[importLayer]) return false;

  if (next) return true

  return false;
}
