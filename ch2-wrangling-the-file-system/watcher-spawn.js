'use strict'
const fs = require('fs')
const spawn = require('child_process').spawn
const filename = process.argv[2]
if (!filename) {
    throw Error('A file to watch must be specified!')
}

fs.watch(filename, () => {
    //spawn函数是child_process模块的函数
    //spawn的第一个参数是命令名称，第二个参数是命令行的参数数组，包括命令行本身的参数和目标文件名
    //spawn的返回对象是childprocess，stdin,stdout,stderr都是stream
    const ls = spawn('ls', ['-l', '-h', filename])
    //使用stdout的pipe方法把子进程的输出内容直接传送到标准输出流
    ls.stdout.pipe(process.stdout)
})
console.log('Now watching target.txt for changes...')