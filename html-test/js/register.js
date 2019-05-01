// 发送 post 请求
function post(url, data = {}) {
    return $.ajax({
        type: 'post',
        url,
        data: JSON.stringify(data),
        contentType: "application/json",
    })
}

$('#submit').click(() => {
    const username = $('#username').val()
    const password = $('#password').val()
    const url = '/api/user/register'
    const data = {
        username,
        password
    }
    post(url, data).then(res => {
        if (res.errno === 0) {
            // 注册成功
            location.href = './admin.html'
        } else {
            // 注册失败
            alert(res.data)
        }
    })
})