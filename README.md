# broccoli-doc-tester

This broccoli plugin will create test file for mardown files listed in a path or files funnled at inputNode. It will store the output to directory passed into to the plugin as option and merge it with Tree.
Given an input node, the Broccoli doc tester plugin returns a new node with test files of the markdown files from the input node. The test files can be moved to different paths using destDir option.

## Usage

```js
var BroccoliDocTester = require('broccoli-doc-tester');

module.exports = new BroccoliDocTester(inputNode, options);
```
## Params
* inputNode: A Broccoli node. A node in Broccoli can be either a string that references a directory in your project or a node object returned from running another Broccoli plugin.
* options:
  - destDir: A string representing the destination path that test files will be copied to. Default: `markdown-tests`
