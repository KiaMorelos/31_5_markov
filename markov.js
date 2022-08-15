/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/); // split string on spaces, make into an array
    this.words = words.filter(c => c !== ""); // filter out any empty strings from the array.
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = new Map() // maps are iterable, and the keys can be any data type. Maps are shaped like objects, but can be more flexible when working with dynamic keys/operating on multiple keys at once.

    for(let i = 0; i < this.words.length; i++){
      const word = this.words[i] // word is word at word index of [i] in words array
      const nextWord = this.words[i+1] || null // next word is the word after index [i] (i +1) or null if index has nothing there

      if(chains.has(word)) chains.get(word).push(nextWord) // if chains map contains word as key already, then get word array stored at that key, and push on the next word onto the array
      else chains.set(word, [nextWord])// the key does not exist in the map, set word as the key and nextWord in an array as the value 
    }

    this.chains = chains // the chains have been made, update this part of the instance

  }

  /** return random text from chains */

    //static is like @classmethod in python
    static randpick(arr){
      return arr[Math.floor(Math.random() * arr.length)] //pick index to use using the length of the array, this will be use as a key to retreive a random starting word and random next words in makeText
    }

  makeText(numWords = 100) {
    const keys = Array.from(this.chains.keys()) //.keys() iterates over all keys
    let word = MarkovMachine.randpick(keys) // pick random word to start with
    const output = []

    while(output.length < numWords && word !== null){
      //while output length is less than number of words and key is not null/non-existent

      output.push(word)//push(word) into array
      word = MarkovMachine.randpick(this.chains.get(word)) //get next rand word from word chains map's associated array at word key
    }
    return output.join(" ") //return the word array as string with spaces in between each item ["the", "cat"] would come back as "the cat"
  }
}

module.exports = {
  MarkovMachine,
}