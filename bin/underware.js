#!/usr/bin/env node

const Liftoff = require('liftoff');
const chalk = require('chalk');
const v8flags = require('v8flags');
const argv = require('minimist')(process.argv.slice(2));
const commands = argv._;

const cli = new Liftoff({
  name: 'underware',
  configName: '.underware',
  // completions: completion,
  extensions: {
    'rc': null
  },
  v8flags: v8flags,
});

// Exit with 0 or 1
let failed = false;
process.once('exit', function(code) {
  if (code === 0 && failed) {
    process.exit(1);
  }
});

cli.launch({
  cwd: argv.cwd,
  configPath: argv.gulpfile,
  require: argv.require,
  completion: argv.completion,
}, handleArguments);

function handleArguments(env) {
  if (commands.length === 0) {
    console.log(chalk.green("You're wearing underware"));
    process.exit(0);
  }
}
