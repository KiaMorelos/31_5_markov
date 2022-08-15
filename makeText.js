/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require('./markov')
const axios = require('axios')

function generateText(text){
    const generated = new markov.MarkovMachine(text)
    console.log(generated.makeText())
}

function makeTextFromFile(path){
    fs.readFile(path, 'utf-8', (err, contents) => {
        if(err){
            console.error(`Cannont read file at: ${path}: ${err}`)
            process.exit(1)
        } else generateText(contents)
    })
}

async function makeTextFromUrl(url){
    try {
        const res = await axios.get(url)
        const {data} = res

        generateText(data)

    } catch(err) {
        console.error(`Cannot read URL: ${url}: ${err}`)
        process.exit(1)
    }
}

const method = process.argv[2]

const path = process.argv[3]



if(path.includes('http') && method === 'url'){
    makeTextFromUrl(path)
} else if(method === 'file') {
    makeTextFromFile(path)
} else {
    console.error(`Unknown method: ${method} and/or incorrect use of ${method} method`)
    process.exit(1)
}
