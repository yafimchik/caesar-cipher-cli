## caesar-cipher-cli

### Executable command file is:

caesar-cli/bin/cli

#### CLI tool accepts 4 options (short alias and full name):

-s, --shift: a shift

-i, --input: an input file

-o, --output: an output file

-a, --action: an action encode/decode

#### Examples:

> \$ node ./caesar-cli/bin/cli --action encode --shift 7 --input plain.txt --output encoded.txt

> \$ node ./caesar-cli/bin/cli --action decode --shift 7 --input decoded.txt --output plain.txt
