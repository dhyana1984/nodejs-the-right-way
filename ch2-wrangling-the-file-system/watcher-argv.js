const fs = require('fs')
//process.argv是命令行参数数组
//process.argv[0]是node命令
//process.argv[1]是watcher-argv.js文件名
//process.argv[2]是文件地址参数
const filename = process.argv[2]
if (!filename) {
    throw Error('A file to watch must be specified!')
}

fs.watch(filename, () => console.log(`File ${filename} changed!`))
console.log('Now watching target.txt for changes...')