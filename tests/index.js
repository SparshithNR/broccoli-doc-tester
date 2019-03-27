import 'regenerator-runtime/runtime'; // only for tests, because async/await needs it
import { sync } from 'glob';

import chai from 'chai';
import { buildOutput, createTempDir } from 'broccoli-test-helper';

import BroccoliDocTester from '../';

const { expect } = chai;

chai.config.truncateThreshold = 1000;

describe('BroccoliDocTester', function() {
  let input;

  beforeEach(function() {
    return createTempDir().then(tempDir => (input = tempDir));
  });

  afterEach(function() {
    return input.dispose();
  });

  it('should build', async function() {
    input.write({
      'README.md': '```js\nMath.sqrt(4) // equals: 2\n```'
    });

    let node = new BroccoliDocTester(input.path(), {
      destDir: 'docs-test'
    });

    let output = await buildOutput(node);
    let files = sync('**/*.js', {
      cwd: output.dir
    });
    expect(files).to.deep.equal(['docs-test/README.md-test.js']);

    output = await output.rebuild();
    expect(output.changes()).to.deep.equal({ 'docs-test/README.md-test.js': 'change' });
  });
});
