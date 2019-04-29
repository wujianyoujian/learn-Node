// 发送 get 请求
function get(url) {
    return $.get(url)
}

// 发送 post 请求
function post(url, data = {}) {
    return $.ajax({
        type: 'post',
        url,
        data: JSON.stringify(data),
        contentType: "application/json",
    })
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

// 获取 dom 元素
const $textTitle = $('#text-title')
const $textContent = $('#text-content')
const $btnUpdate = $('#btn-update')

// 获取博客内容
const urlParams = getUrlParams()
const url = '/api/blog/detail?id=' + urlParams.id
get(url).then(res => {
    if (res.errno !== 0) {
        alert('操作错误')
        return
    }

    // 显示数据
    const data = res.data || {}
    $textTitle.val(data.title)
    $textContent.val(data.content)
    $btnUpdate.attr('data-id', data.id)
})

// 提交修改内容
$btnUpdate.click(function () {
    const $this = $(this)
    const id = $this.attr('data-id')
    const title = $textTitle.val()
    const content = $textContent.val()

    const url = '/api/blog/update?id=' + id
    const data = {
        title,
        content
    }
    post(url, data).then(res => {
        if (res.errno !== 0) {
            alert('操作错误')
            return
        }
        alert('更新成功')
        location.href = '/admin.html'
    })
})