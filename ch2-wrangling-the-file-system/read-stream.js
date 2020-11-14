'use strict'
require('fs').createReadStream(process.argv[2])
    //使用 process.stdout.write(chunk)代替console.log
    .on('data', chunk => process.stdout.write(chunk))
    //监听了error事件，所以报错时只会有输出，不会产生系统错误信息
    .on('error', err => process.stdout.write(`ERROR: ${err.message}`))