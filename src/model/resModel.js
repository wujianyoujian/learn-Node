//定义返回的数据结构
//就是让数据包裹一层对象，在加上errno作为判断
class BaseModel {
    constructor(data, message) {
        // 当传入的参数只有一个，并且为字符串类型时候

        if(typeof data === String) {
            this.message = data
            data = null
            message = null
        }
        if(data) {
            this.data = data
        }
        if(message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = 0
    }
}

class ErrorModel extends BaseModel {
    constructor (data, message) {
        super(data, message)
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}