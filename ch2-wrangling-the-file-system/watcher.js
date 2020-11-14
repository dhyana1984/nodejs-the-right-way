'use strict'
const fs = require('fs')
//监听./filesystem/target.txt的变化
fs.watch('./filesystem/target.txt', () => console.log('file changed!'))
console.log('Now watching target.txt for changes...')