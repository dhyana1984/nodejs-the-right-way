'use strict'
const fs = require('fs')
const spawn = require('child_process').spawn
const filename = process.argv[2]
if (!filename) {
    throw Error('A file to watch must be specified!')
}

fs.watch(filename, () => {
    const ls = spawn('ls', ['-l', '-h', filename])
    let output = ''
    //lsls.stdout是Stream，继承了EventEmitter，能够监听stdout的事件
    //ls.stdout.on('data' 就是监听了data事件，获取了输出流的数据，js自动将chunk二进制的buffer直接转成了字符串
    ls.stdout.on('data', chunk => output += chunk)
    //此时监听了ls这个子进程的close事件，当退出子进程时，会打印出分割后的output结果
    ls.on('close', () => {
        const parts = output.split(/\s+/)
        console.log([parts[0], parts[4], parts[8]])
    })
})