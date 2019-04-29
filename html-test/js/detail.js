// 发送 get 请求
function get(url) {
    return $.get(url)
}

// 显示格式化的时间
function getFormatDate(dt) {
    return moment(dt).format('LL')
}

// 获取 url 参数
function getUrlParams() {
    let paramStr = location.href.split('?')[1] || ''
    paramStr = paramStr.split('#')[0]
    const result = {}
    paramStr.split('&').forEach(itemStr => {
        const arr = itemStr.split('=')
        const key = arr[0]
        const val = arr[1]
        result[key] = val
    })
    return result
}
// 获取数据
const urlParams = getUrlParams()
const url = '/api/blog/detail?id=' + urlParams.id
get(url).then(res => {
    if (res.errno !== 0) {
        alert('数据错误')
        return
    }

    // 显示数据
    const data = res.data || {}
    $('.content').append($(`
        <div class="blog_detail">
            <div class="title">${data.title}</div>
            <div class="detail">
                ${data.content}
            </div>
            <div class="info">
                    <a href='/index.html?author=${data.author}' class="author">author©${data.author}</a>
                    <span class="time">写于${getFormatDate(data.createTime)}</span>
            </div>
        </div>
    `))
        
})