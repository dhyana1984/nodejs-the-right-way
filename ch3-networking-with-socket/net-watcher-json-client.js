`use strict`
const net = require('net')
//使用net.connect创建从客户端到localhost端口60300的连接，然后开始等待数据
//client是socket对象，和服务端的回调函数中的connection类似
const client = net.connect({ port: 60300 })
client.on('data', data => {
    const message = JSON.parse(data)
    if (message.type === 'watching') {
        console.log(`Now watching:${message.file}`)
    } else if (message.type === 'changed') {
        const date = new Date(message.timestamp)
        console.log(`File changed: ${date}`)
    } else {
        console.log(`Unrecognized message type:${message.type}`)
    }
})