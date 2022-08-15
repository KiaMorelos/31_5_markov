const {MarkovMachine} = require('./markov')

describe('markov machine tests', function(){
    test('chain creation', function () { 
        const markMachine = new MarkovMachine("a b b c d e")

        expect(markMachine.chains).toEqual(new Map([
            ['a', ['b']],
            ['b', ['b', 'c' ]],
            ['c', ['d']],
            ['d', ['e']],
            ['e', [null]]
        ]))
    })

    test('picks rand item from array', function(){
        expect(MarkovMachine.randpick(['a', 'a', 'a'])).toEqual('a')
        expect(['a', 'b', 'c']).toContain(MarkovMachine.randpick(['a', 'b', 'c']))
    })

    test('should have portions of text given', function(){
        const markMachine = new MarkovMachine("The dog by the stove")

        const text = markMachine.makeText()
        expect(text).toContain('the')
    })
})