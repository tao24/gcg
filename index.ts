#!/usr/bin/env node

import commander from 'commander';
import { Initializer } from './src/initializer';
import { Validator } from './src/validate';

commander.version('2.1.0', '-v, --version')
    // .option('--overwrite', 'overwrite existing files')


commander
    .command('init <task>')
    .alias('i')
    .description('initialize task')
    .option('-o, --overwrite', 'overwrite existing files')
    .option('-i, --input-only', 'only create .in tests, skip .out')
    .option('-s, --slient', 'run silenty (no logging)')
    .action((task, cmd) => {
        const interactive = new Initializer(cmd, task);
        interactive.start();
    });
    
commander
    .command('run <task>')
    .alias('r')
    .description('run task on it\'s tests. if no custom folder or test are specified, it runs on all tests in \'tests\' directory that start with <task> and on all tests in \'tests\\<task>\' directory.')
    .option('--no-compile', 'disable compiling before running on tests')
    .option('-f, --folder <folder>', 'set test folder path. defaults to \'tests\\<task>\'')
    .option('-t, --test <testname>', 'run on chosen test only')
    .action((task, cmd) => {
        const validator = new Validator(cmd, task);
        validator.start();
    });

commander
    .on('command:*', function () {
        console.error('Invalid command: %s\nSee --help for a list of available commands.', commander.args.join(' '));
        process.exit(1);
    });

commander
    .parse(process.argv);


