// 发送 post 请求
function post(url, data = {}) {
    return $.ajax({
        type: 'post',
        url,
        data: JSON.stringify(data),
        contentType: "application/json",
    })
}

// 获取 dom 元素
$textTitle = $('#text-title')
$textContent = $('#text-content')
$btnCreate = $('#btn-create')

// 提交数据
$btnCreate.click(() => {
    const title = $textTitle.val().trim()
    const content = $textContent.val().trim()
    if (title === '' || content === '') {
        alert('标题或内容不能为空')
        return
    }

    const url = '/api/blog/new'
    const data = {
        title,
        content
    }
    post(url, data).then(res => {
        if (res.errno !== 0) {
            alert('操作错误')
            return
        }
        alert('创建成功')
        location.href = '/admin.html'
    })
})