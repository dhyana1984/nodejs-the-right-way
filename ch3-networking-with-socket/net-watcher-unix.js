'use strict'
const fs = require('fs')
const net = require('net')
const filename = process.argv[2]

if (!filename) {
    throw Error('Error: No filename specified.')
}

//创建tcp socket Server
const server = net.createServer(connection => {
    //建立连接时打印通知，console.log打印到控制台，connection.write发送给客户端
    console.log('Subscriber connected')
    connection.write(`Now watching "${filename}" for changes...`)


    const watcher = fs.watch(filename, () => {
        connection.write(`File changed: ${new Date()}\n`)
    })

    //监听断开连接事件
    connection.on('close', () => {
        console.log(`Subscriber disconnected.`)
        watcher.close()
    })
})

//使用Unix socket的方式，仅限于机器内部，没有网络设备因素，性能很高
//客户端需要用nc -U /tmp/watcher.sock 的方式来连接服务端
server.listen('/tmp/watcher.sock', () => console.log('Listening for subscribers...'))