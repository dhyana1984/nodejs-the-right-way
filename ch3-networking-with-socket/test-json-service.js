'use strict'
const server = require('net').createServer(connection => {
    console.log('Subscriber connected')
    //两个消息块，合并在一起是一个完整的消息
    const firstChunk = `{"type":"changed","timesta`
    const secondChunk = 'mp":1605456660}\n'

    //发送第一个消息块
    connection.write(firstChunk)

    //模拟一段时间以后发送第二个消息块
    const timer = setTimeout(() => {
        connection.write(secondChunk)
        connection.end()
    }, 100);

    //清除timer
    connection.on('end', () => {
        clearTimeout(timer)
        console.log('Subscriber disconnected')
    })
})

server.listen(60300, () => {
    console.log('Test server listen for subscribers...')
})