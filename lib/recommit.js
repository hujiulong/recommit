const shell = require('shelljs');
const moment = require('moment');
const outdent = require('outdent');

/* eslint-disable no-console */

const exec = cmd => shell.exec(cmd, { silent: false });

const USER_RE = /([^<]+)\s*<([^<]+)>/;
function parseUser(str) {
  const r = USER_RE.exec(str);
  if (!r) return null;
  return {
    name: r[1].trim(),
    email: r[2].trim(),
  };
}

function formatDate(str) {
  return str ? moment(str).toString() : null;
}

function recommit(search, patch) {
  const {
    // message,
    date,
    author,
    committer,
  } = patch;

  let {
    authorName,
    authorEamil,
    authorDate,
    committerName,
    committerEmail,
    committerDate,
  } = patch;

  authorDate = authorDate || date;
  committerDate = committerDate || date;

  if (author && (!authorName || !authorEamil)) {
    const info = parseUser(author);
    if (!info) {
      console.log(`"${author}" is not a legal committer string. The correct format is "Name <example@mail.com>"`);
      return;
    }
    authorName = authorName || info.name;
    authorEamil = authorEamil || info.email;
  }

  if (committer && (!committerName || !committerEmail)) {
    const info = parseUser(committer);
    if (!info) {
      console.log(`"${committer}" is not a legal committer string. The correct format is "Name <example@mail.com>"`);
      return;
    }
    committerName = committerName || info.name;
    committerEmail = committerEmail || info.email;
  }

  if (authorDate && !moment(authorDate).isValid()) {
    console.log(`"${authorDate}" is not a legal date string.`);
    return;
  }

  if (committerDate && !moment(committerDate).isValid()) {
    console.log(`"${committerDate}" is not a legal date string.`);
    return;
  }

  const vars = {
    GIT_AUTHOR_NAME: authorName,
    GIT_AUTHOR_EMAIL: authorEamil,
    GIT_AUTHOR_DATE: formatDate(authorDate),
    GIT_COMMITTER_NAME: committerName,
    GIT_COMMITTER_EMAIL: committerEmail,
    GIT_COMMITTER_DATE: formatDate(committerDate),
  };

  const keys = Object.keys(vars).filter(key => !!vars[key]);
  if (keys.length === 0) return;

  const cmd = outdent`git filter-branch -f --env-filter \
    'search="${search}";
    if [[ $GIT_COMMIT =~ $search || $GIT_AUTHOR_NAME =~ $search || $GIT_AUTHOR_EMAIL =~ $search ]]
    then
      ${keys.map(key => `export ${key}="${vars[key]}"`).join('\n  ')}
    fi
  '`;

  exec(cmd);
}

exports.recommit = recommit;
