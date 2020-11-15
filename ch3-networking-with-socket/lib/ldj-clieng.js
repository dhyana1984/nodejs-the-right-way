const EventEmitter = require('events').EventEmitter
class LDJClient extends EventEmitter {
    //stream就是可以接受的data事件的对象
    //使用stream来缓存收到的数据
    constructor(stream) {
        super()
        let buffer = ''
        stream.on('data', data => {
            buffer += data
            let boundary = buffer.indexOf('\n')
            //当接收到分块的消息时，保存到buffer
            //直到以'\n'结尾的消息块被接受到，表示一条完整的消息都接受到了
            while (boundary !== -1) {
                //拿到除去结尾符号'\n'以外的内容，就是完整的消息
                const input = buffer.substring(0, boundary)
                //清空buffer
                buffer = buffer.substring(boundary + 1)
                //发送message事件，并且把消息反序列化成object一起发送
                //这里用this.emit('message', JSON.parse(input)) 是为了和net-watcher-ldj-client.js通信
                //在net-watcher-ldj-client.js里面监听message事件打印出完整的服务端发送的消息
                this.emit('message', JSON.parse(input))
                //设置boundary停止while循环
                boundary = buffer.indexOf('\n')
            }
        })
    }

    //把socket客户端对象传进来
    static connect = (stream) => {
        return new LDJClient(stream)
    }
}

module.exports = LDJClient