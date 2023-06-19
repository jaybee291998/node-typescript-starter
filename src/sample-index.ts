import * as fs from 'fs'

function blocking(): void {
    console.log('~~ before readsync')
    const data = fs.readFileSync(
        'C:/Users/ascja/Documents/cwallet-db-config.txt'
    )
    console.log('~~ after readsync', data.toString())
    console.log('~~ end')
}

function nonBlocking(): void {
    console.log('~~ before readsync')
    fs.readFile(
        'C:/Users/ascja/Documents/cwallet-db-config.txt',
        (err, data) => {
            if (err) {
                console.error(`error: error reading file ${err}`)
                return
            } else {
                console.log('~~ data', data.toString())
            }
        }
    )
    console.log('~~ after readsync')

    console.log('~~ end')
}

nonBlocking()
blocking()
