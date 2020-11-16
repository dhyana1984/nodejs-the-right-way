'use strict'
const fs = require('fs')
const zmq = require('zeromq')
const filename = process.argv[2]

//即便是结束了pub，sub端也不会断开，如果重新连接pub端，sub端仍然可以接受消息
async function run() {
    //创建发布端
    const publisher = new zmq.Publisher()

    fs.watch(filename, () => {
        //发送消息给所有订阅端
        //send传字符串或者字符串数组
        publisher.send([JSON.stringify({
            type: 'changed',
            file: filename,
            timestamp: Date.now()
        })])
    })
    try {
        await publisher.bind('tcp://*:60400')
        console.log('Listening for zmq subscribers...')
    } catch (err) {
        throw err
    }
}

run()