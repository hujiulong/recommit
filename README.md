# recommit
Modify your git commit information.

## Usage
```
recommit <commit-hash|author-name|author-email> [options]

Options:
  -V, --version               output the version number
  -d, --date [date]           modify the date, eg: "2019-12-12 12:32:50"
  -a, --author [author]       modify the author, eg: "Jack <jack@email.com>"
  -c, --comitter [committer]  modify the committer, eg: "Jack <jack@email.com>"
  --author-name [name]        modify the author name, eg: "Jack"
  --author-email [email]      modify the author email, eg: "jack@email.com"
  --author-date [date]        modify the author date, eg: "2019-12-12 12:32:50"
  --committer-name [name]     modify the committer name, eg: "Jack"
  --committer-date [date]     modify the committer name, eg: "jack@email.com"
  -h, --help                  output usage information
```

**Modify Date**
```bash
recommit ef187ddc -d "2019-02-14 14:00:00"
```

**Modify Author**
```bash
recommit ef187ddc -a "Jack <jack@email.com>"
```

## LICENSE
MIT