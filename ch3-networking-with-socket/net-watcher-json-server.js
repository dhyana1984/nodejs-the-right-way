'use strict'
const fs = require('fs')
const net = require('net')
const filename = process.argv[2]

if (!filename) {
    throw Error('Error: No filename specified.')
}

//创建tcp socket Server
const server = net.createServer(connection => {
    console.log('Subscriber connected')
    //将发送给客户端的信息序列化
    //{ type: 'watching', file: filename }\n这个就是LDJ协议
    connection.write(JSON.stringify({ type: 'watching', file: filename }) + '\n')


    const watcher = fs.watch(filename, () => {
        connection.write(JSON.stringify({ type: 'changed', timestamp: Date.now() }) + '\n')
    })

    //监听断开连接事件
    connection.on('close', () => {
        console.log(`Subscriber disconnected.`)
        watcher.close()
    })
})

//使用Unix socket的方式，仅限于机器内部，没有网络设备因素，性能很高
//客户端需要用nc -U /tmp/watcher.sock 的方式来连接服务端
server.listen('60300', () => console.log('Listening for subscribers...'))