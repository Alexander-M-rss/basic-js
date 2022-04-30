const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;

  }

  encrypt(messageParam, keyParam) {
    if (!messageParam || !keyParam || typeof messageParam !=='string' || typeof keyParam !=='string')
      throw new Error("Incorrect arguments!");

    let i = 0;
    const message = messageParam.toUpperCase();
    const key = keyParam.toUpperCase();
    const result = [];

    for(let ch of message){
      const code = ch.charCodeAt(0);

      if(code > 64 && code < 91)
        ch = String.fromCharCode((code + key[i++ % key.length].charCodeAt(0) - 130) % 26 + 65);
      result.push(ch);
    }

    return (this.isDirect ? result : result.reverse()).join('');
  }

  decrypt(messageParam, keyParam) {
    if (!messageParam || !keyParam || typeof messageParam !=='string' || typeof keyParam !=='string')
      throw new Error("Incorrect arguments!");

    let i = 0;
    const message = messageParam.toUpperCase();
    const key = keyParam.toUpperCase();
    const result = [];

    for(let ch of message){
      const code = ch.charCodeAt(0);

      if(code > 64 && code < 91)
        ch = String.fromCharCode((code - key[i++ % key.length].charCodeAt(0) +26) % 26 + 65);
      result.push(ch);
    }

    return (this.isDirect ? result : result.reverse()).join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
