const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
    if (!Array.isArray(arr))
      throw new Error('\'arr\' parameter must be an instance of the Array!');

    const operations = ['--discard-next', '--discard-prev', '--double-next', '--double-prev'];

    return arr.filter((x, i) => arr[i - 1] !== '--discard-next' && arr[i + 1] !== '--discard-prev').map((x, i) => {
      if(x === "--double-prev" && i > 0)
        return arr[i-1];
      else if(x === "--double-next" && i < arr.length - 1)
        return arr[i+1];
      else
        return x;
      }).filter( x => !operations.includes(x));
}

module.exports = {
  transform
};
