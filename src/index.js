import Plugin from 'broccoli-plugin';
import { default as _logger } from 'heimdalljs-logger';
import { getCode, parseFile } from 'doc-tester/lib/util';
import { outputFileSync } from 'fs-extra';
import { sync } from 'glob';


const logger = _logger('broccoli-doc-tester');

/**
 * @param node: Node contain outputPath for funneled  Markdown files or Path to folder where mardown files are present.
 * @param options: contains path to destDir where generated test files will be copied. Default: markdown-tests
 */

export default class BroccoliDocTester extends Plugin {
  constructor(node, options = {}) {
    super([node], {
      name: options.name,
      annotation: options.annotation,
      persistentOutput: true
    });
    this.inputNode = node;
    this.options = options;
  }

  build() {
    let funnledDir = this.inputNode.outputPath ? this.inputNode.outputPath : this.inputNode;
    const destDir = this.options.destDir || 'markdown-tests';
    let files = sync('*.md', {
      cwd: funnledDir
    });
    logger.info(`Input path ${funnledDir}`);
    logger.info(`Output path ${destDir}`);

    files.forEach(fileName => {
      let filePath = `${funnledDir}/${fileName}`;
      logger.info(`Processing test for ${fileName}`);
      let { codeArray, importsArray } = parseFile(filePath);
      let fileContent = getCode(codeArray, importsArray, fileName);
      if (fileContent) {
        logger.info(`Creating test for ${fileName}`);
        outputFileSync(`${this.outputPath}/${destDir}/${fileName}-test.js`, fileContent);
      }
    });
    logger.info(`Result stored at ${this.outputPath}/${destDir}`);
  }
}
