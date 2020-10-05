const { Transform } = require('stream');

class Transformer extends Transform {
  setTransformFunction(fn) {
    if (!fn) {
      process.stderr.write('Transformer->setTransformFunction(fn) Error: fn must be initialized!');
    } else {
      this.transformChunk = fn;
    }
  }

  /**
  * метод, реализующий в себе запись данных (chunk поступают в поток Transform),
  * и чтение данных - когда другой поток читает из Transform
  * @param chunk
  * @param encoding
  * @param done - в общем случае done(err, chunk)
  * @private
  */

  // eslint-disable-next-line no-underscore-dangle
  _transform(chunk, encoding, done) {
    const resultChunk = this.transformChunk(chunk.toString('utf8'));
    done(null, resultChunk);
  }
}

exports.Transformer = Transformer;
