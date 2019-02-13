#!/usr/bin/env node

const program = require('commander');
const { version } = require('../package.json');
const { recommit } = require('../lib/recommit');

function exec(argv) {
  program
    .version(version)
    .usage('<commit-hash|author-name|author-email> [options]')
    // .option('-m, --message [msg]', '')
    .option('-d, --date [date]', 'modify the date, eg: "2019-12-12 12:32:50"')
    .option('-a, --author [author]', 'modify the author, eg: "Jack <jack@email.com>"')
    .option('-c, --comitter [committer]', 'modify the committer, eg: "Jack <jack@email.com>"')
    .option('--author-name [name]', 'modify the author name, eg: "Jack"')
    .option('--author-email [email]', 'modify the author email, eg: "jack@email.com"')
    .option('--author-date [date]', 'modify the author date, eg: "2019-12-12 12:32:50"')
    .option('--committer-name [name]', 'modify the committer name, eg: "Jack"')
    .option('--committer-email [email]', 'modify the committer email, eg: "jack@email.com"')
    .option('--committer-date [date]', 'modify the committer date, eg: "2019-12-12 12:32:50"')
    .parse(argv);

  const args = program.args;

  recommit(args[0], program);
}

exec(process.argv);
