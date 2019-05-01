// 发送 post 请求
function post(url, data = {}) {
    return $.ajax({
        type: 'post',
        url,
        data: JSON.stringify(data),
        contentType: "application/json",
    })
}

$('#btnLogin').click(() => {
    const username = $('#textUsername').val()
    const password = $('#textPassword').val()
    const url = '/api/user/login'
    const data = {
        username,
        password
    }
    post(url, data).then(res => {
        if (res.errno === 0) {
            // 登录成功
            location.href = './admin.html'
        } else {
            // 登录失败
            alert(res.data)
        }
    })
})
// 监听一下当光标在密码框的时候按下回车进行登录
$("#textPassword").on('focus', () => {
    $("#textPassword").on('keydown', (event) => {
        if(event.which === 13) {
            $('#btnLogin').trigger('click');
        }
    })
})