(function caesarCipher() {
  const alphabetUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const actionEncode = 'encode';
  const actionDecode = 'decode';

  const generateLetterEncoder = function generator(shift, direction = actionEncode) {
    let getNewIndex;
    if (direction === actionEncode) {
      getNewIndex = (alph, oldIndex) => (oldIndex + shift) % (alph.length);
    } else {
      getNewIndex = (alph, oldIndex) => (alph.length + oldIndex - shift) % (alph.length);
    }

    function encodeLetterByCaesarCipher(letter) {
      let isLetter = alphabetUp.includes(letter);
      isLetter = isLetter || alphabetUp.toLowerCase().includes(letter);
      if (!isLetter) { return letter; }

      const isUpperCase = alphabetUp.includes(letter);

      let alphabet;

      if (isUpperCase) {
        alphabet = alphabetUp;
      } else {
        alphabet = alphabetUp.toLowerCase();
      }

      const index = alphabet.indexOf(letter);
      return alphabet[getNewIndex(alphabet, index)];
    }

    return encodeLetterByCaesarCipher;
  };

  const generateTextEncoder = function textEncoder(shift, action = actionEncode) {
    const encodeLetter = generateLetterEncoder(shift, action);

    function transformByLetter(text) {
      return text.split('').map((letter) => encodeLetter(letter)).join('');
    }
    return transformByLetter;
  };

  exports.generateTextEncoder = generateTextEncoder;
  exports.generateLetterEncoder = generateLetterEncoder;
  exports.actionEncode = actionEncode;
  exports.actionDecode = actionDecode;
}).call(this);
