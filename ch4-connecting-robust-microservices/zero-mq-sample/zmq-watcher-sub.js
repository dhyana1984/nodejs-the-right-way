'use strict'
const zmq = require('zeromq')

async function run() {
    const subscriber = new zmq.Subscriber()
    //这里必须指明tcp://localhost:60400
    subscriber.connect('tcp://localhost:60400')
    //订阅所有消息
    subscriber.subscribe()
    //data就是pub传过来的消息数组
    for await (const [data] of subscriber) {
        //反序列化成对象然后解构赋值
        const message = JSON.parse(data)
        const { file, type, timestamp } = message
        console.log(`File "${file}" ${type} at ${new Date(timestamp)}`)
    }
}

run()
