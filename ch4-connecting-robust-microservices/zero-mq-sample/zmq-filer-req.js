'use strict'
const zmq = require('zeromq')
const filename = process.argv[2]

async function run() {
    const requester = new zmq.Request()
    requester.connect("tcp://127.0.0.1:60401")
    console.log("Producer bound to port 60401")

    //发送请求到responser
    console.log(`Sending a request for ${filename}`)
    await requester.send(JSON.stringify({ path: filename }))

    //接受到responser的响应消息
    const [result] = await requester.receive()
    const response = JSON.parse(result)
    console.log('Received response', response)
}

run()