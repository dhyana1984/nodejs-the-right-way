'use strict'
const fs = require('fs')
const zmq = require('zeromq')

const responder = new zmq.Reply()


async function run() {

    try {
        await responder.bind("tcp://127.0.0.1:60401")
        console.log('Listen for zmq requests')
        //接受到了Requester的消息
        while (true) {
            for await (const [req] of responder) {
                const request = JSON.parse(req)
                console.log(`Received request to get: ${request.path}`)

                //读文件返回内容
                fs.readFile(request.path, (err, content) => {
                    console.log('Sending response content.')
                    //响应请求
                    responder.send(JSON.stringify({
                        content: content.toString(),
                        timestamp: Date.now(),
                        pid: process.pid
                    }))
                })
            }
        }
    } catch (err) {
        throw err
    }

}

run()

//node 进程结束时关闭响应端Service
//SIGINT是一个unix系统信号，表示系统受到了用户的关闭指令
process.on('SIGINT', () => {
    console.log('Shutting down...')
    responder.close()
})