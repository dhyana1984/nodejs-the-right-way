'use strict'
const fs = require('fs')
fs.writeFile('./filesystem/target.txt', 'Hello world', (err) => {
    if (err) {
        throw err
    }
    console.log('File saved!')
})