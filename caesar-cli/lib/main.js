const program = require('commander');
const { pipeline } = require('stream');
const fs = require('fs');
const { stderr } = require('process');
const caesarCipherModule = require('./caesar-cipher');
const pkg = require('../../package.json');
const { Transformer } = require('./transform-stream/transform-stream');

const exitCodeError = 7;

function checkOptions(options) {
  let isOptionsValid = true;

  if (!options.action) {
    stderr.write('it is needed to choose an ACTION!\n');
    isOptionsValid = false;
  } else {
    const action = options.action.toLocaleLowerCase();
    let isActionValid = action === caesarCipherModule.actionEncode;
    isActionValid = isActionValid || action === caesarCipherModule.actionDecode;
    if (!isActionValid) {
      stderr.write('action must be ENCODE or DECODE!\n');
      isOptionsValid = false;
    }
  }

  if (!options.shift) {
    stderr.write('it is needed to set a SHIFT!\n');
    isOptionsValid = false;
  }

  return isOptionsValid;
}

async function caesarCipherCliAction(options) {
  let input$;
  let output$;

  if (!checkOptions(options)) {
    process.exit(exitCodeError);
  }

  if (!options.input) {
    input$ = process.stdin;
  } else {
    input$ = fs.createReadStream(options.input, 'utf8');
  }

  if (!options.output) {
    output$ = process.stdout;
  } else {
    output$ = fs.createWriteStream(options.output, 'utf8');
  }

  const encodeTextFn = caesarCipherModule.generateTextEncoder(options.shift, options.action);
  const transformOpts = {
    encoding: 'utf8',
  };
  const encode$ = new Transformer(transformOpts);
  encode$.setTransformFunction(encodeTextFn);

  pipeline(
    input$,
    encode$,
    output$,
    (err) => {
      if (err) {
        stderr.write(`Read/Write file Error! Error: ${err}\n`);
        process.exit(exitCodeError);
      }
    },
  );
}

(function main() {
  program.storeOptionsAsProperties(false);
  program
    .version(pkg.version)
    .description('Caesar-cipher-CLI-tool');

  program
    .option('-s, --shift <shift>', 'a shift')
    .option('-i, --input <input>', 'an input file')
    .option('-o, --output <output>', 'an output file')
    .option('-a, --action <action>', 'an action: encode/decode');

  program.parse(process.argv);

  const options = program.opts();

  options.shift = parseInt(options.shift, 10);

  caesarCipherCliAction(options);
}).call(this);
