const fs = require('fs')
//process.argv是命令行参数数组
//process.argv[0]是node命令
//process.argv[1]是watcher-argv.js文件名
//process.argv[2]是文件地址参数
const filename = process.argv[2]
if (!filename) {
    throw Error('A file to watch must be specified!')
}
try {
    fs.watch(filename, (event, filename) => {
        console.log(`File ${filename} changed!`)
        //监听文件删除
        if (event === 'rename') {
            console.log(`File ${filename} deleted!`)
        }
    })
    console.log('Now watching target.txt for changes...')
} catch (e) {
    console.log(`ERROR: ${e.message}`)
}
